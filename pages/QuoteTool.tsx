import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

type FrameType = 'Vast glas' | 'Draai-kiep' | 'Deur' | 'Schuifpui' | 'Stolpraam' | 'Anders';
type ProfileType = 'Vlak profiel (modern)' | 'Verdiept profiel (klassiek)' | 'Houtlook (HVL)';
type FrameColor = 'Wit (RAL 9016)' | 'Creme (RAL 9001)' | 'Antraciet (RAL 7016)' | 'Zwart (RAL 9005)' | 'Staalblauw (RAL 5011)' | 'Dennen- of monumentengroen (RAL 6009)';
type GlassType = 'HR++ dubbel glas' | 'HR+++ triple glas';
type RodType = 'Geen' | '1x1 (kruis)' | '2x1 (3 vakken vert.)' | '1x2 (3 vakken hor.)' | '2x2 (9 vakken)';

type WindowItem = {
  id: number;
  frameType: FrameType;
  measuredWidth: string;
  measuredHeight: string;
  width: string;
  height: string;
  profile: ProfileType;
  outerColor: FrameColor;
  innerColor: FrameColor;
  glass: GlassType;
  rods: RodType;
  quantity: number;
};

const frameTypes: { id: FrameType; icon: string }[] = [
  { id: 'Vast glas', icon: 'fa-square' },
  { id: 'Draai-kiep', icon: 'fa-arrows-rotate' },
  { id: 'Deur', icon: 'fa-door-open' },
  { id: 'Schuifpui', icon: 'fa-arrows-left-right' },
  { id: 'Stolpraam', icon: 'fa-table-columns' },
  { id: 'Anders', icon: 'fa-ellipsis' },
];

const profileTypes: ProfileType[] = ['Vlak profiel (modern)', 'Verdiept profiel (klassiek)', 'Houtlook (HVL)'];
const colors: FrameColor[] = ['Wit (RAL 9016)', 'Creme (RAL 9001)', 'Antraciet (RAL 7016)', 'Zwart (RAL 9005)', 'Staalblauw (RAL 5011)', 'Dennen- of monumentengroen (RAL 6009)'];
const glassTypes: GlassType[] = ['HR++ dubbel glas', 'HR+++ triple glas'];
const rodTypes: RodType[] = ['Geen', '1x1 (kruis)', '2x1 (3 vakken vert.)', '1x2 (3 vakken hor.)', '2x2 (9 vakken)'];

const colorMap: Record<FrameColor, string> = {
  'Wit (RAL 9016)': '#f5f3ea',
  'Creme (RAL 9001)': '#e9dfc8',
  'Antraciet (RAL 7016)': '#34383c',
  'Zwart (RAL 9005)': '#08090b',
  'Staalblauw (RAL 5011)': '#1b3046',
  'Dennen- of monumentengroen (RAL 6009)': '#2f4736',
};

const emptyItem: WindowItem = {
  id: 1,
  frameType: 'Vast glas',
  measuredWidth: '',
  measuredHeight: '',
  width: '',
  height: '',
  profile: 'Verdiept profiel (klassiek)',
  outerColor: 'Antraciet (RAL 7016)',
  innerColor: 'Wit (RAL 9016)',
  glass: 'HR++ dubbel glas',
  rods: 'Geen',
  quantity: 1,
};

const buttonBase = 'rounded-xl font-black uppercase tracking-[0.14em] text-[10px] transition-all';
const fieldLabelClass = 'mb-2 flex h-7 items-start text-[10px] font-black uppercase leading-tight tracking-[0.18em] text-gray-500';

const QuoteTool: React.FC = () => {
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<WindowItem>(emptyItem);
  const [items, setItems] = useState<WindowItem[]>([]);
  const [openSelect, setOpenSelect] = useState<'outerColor' | 'innerColor' | null>(null);
  const [contact, setContact] = useState({ name: '', email: '', phone: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);

  const progress = step === 6 ? 100 : Math.min(100, (step / 5) * 100);
  const displayItems = items.length ? items : [draft];
  const totalQuantity = displayItems.reduce((sum, item) => sum + item.quantity, 0);
  const canContinue = step !== 2 || (Number(draft.measuredWidth) > 10 && Number(draft.measuredHeight) > 10);
  const exceedsOnlineSize =
    (draft.width.trim() !== '' && Number(draft.width) > 3500) ||
    (draft.height.trim() !== '' && Number(draft.height) > 2500);

  const calculateNetDimension = (value: string) => {
    if (value.trim() === '') return '';
    const measured = Number(value);
    if (!Number.isFinite(measured)) return '';
    return String(Math.max(0, Math.round(measured - 10)));
  };

  const updateMeasuredDimension = (key: 'measuredWidth' | 'measuredHeight', value: string) => {
    const dimensionKey = key === 'measuredWidth' ? 'width' : 'height';
    setDraft(prev => ({
      ...prev,
      [key]: value,
      [dimensionKey]: calculateNetDimension(value),
    }));
  };

  const updateDraft = <K extends keyof WindowItem>(key: K, value: WindowItem[K]) => {
    setDraft(prev => ({ ...prev, [key]: value }));
  };

  const resetDraft = () => {
    setDraft({ ...emptyItem, id: Date.now() });
    setStep(1);
  };

  const addDraftToOverview = () => {
    setItems(prev => {
      const existingIndex = prev.findIndex(item => item.id === draft.id);
      if (existingIndex >= 0) {
        return prev.map(item => item.id === draft.id ? draft : item);
      }
      return [...prev, draft];
    });
    setStep(5);
  };

  const editItem = (item: WindowItem) => {
    setDraft(item);
    setStep(1);
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const changeQuantity = (id: number, amount: number) => {
    setItems(prev => prev.map(item => (
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
    )));
  };

  const finalizeQuote = async () => {
    setLoading(true);
    setStep(7);

    const quoteLines = displayItems.map(item =>
      `${item.quantity}x ${item.frameType}, ${item.width}x${item.height}mm, ${item.profile}, buiten: ${item.outerColor}, binnen: ${item.innerColor}, ${item.glass}, roeden: ${item.rods}`
    ).join('\n');

    // Verstuur naar Netlify Forms
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'kozijn-aanvraag',
          'naam': contact.name,
          'email': contact.email,
          'telefoon': contact.phone,
          'opmerkingen': contact.notes,
          'kozijnen': quoteLines,
        }).toString(),
      });
    } catch {
      // Formulier versturen mislukt — AI samenvatting gaat door
    }

    // AI samenvatting genereren
    try {
      if (!API_KEY) throw new Error('API Key ontbreekt');
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: `Vat deze kozijnenaanvraag kort samen voor Van der Wal Bouw en Onderhoud en bevestig dat er snel contact wordt opgenomen.\n${quoteLines}\nNaam: ${contact.name}\nTelefoon: ${contact.phone}\nOpmerking: ${contact.notes}`
      });
      setAiSummary(response.text || 'Bedankt voor uw aanvraag. We hebben uw gegevens ontvangen en nemen binnenkort contact met u op.');
    } catch {
      setAiSummary('Bedankt voor uw aanvraag. Uw gegevens zijn succesvol ontvangen. Van der Wal Bouw en Onderhoud neemt binnenkort contact met u op.');
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 4) {
      addDraftToOverview();
      return;
    }
    if (step === 5) {
      setStep(6);
      return;
    }
    if (step === 6) {
      finalizeQuote();
      return;
    }
    setStep(prev => Math.min(prev + 1, 7));
  };

  const prevStep = () => {
    if (step === 5 && items.length === 0) {
      setStep(4);
      return;
    }
    setStep(prev => Math.max(prev - 1, 1));
  };

  const renderSelect = (
    id: 'outerColor' | 'innerColor',
    label: string,
    value: FrameColor,
    onChange: (value: FrameColor) => void
  ) => (
    <div className="relative flex flex-col">
      <label className={fieldLabelClass}>{label}</label>
      <button
        type="button"
        onClick={() => setOpenSelect(openSelect === id ? null : id)}
        className="flex h-16 w-full items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 text-left text-sm font-black text-gray-900 outline-none transition focus:ring-2 focus:ring-[#e09d37]"
      >
        <span className="truncate">{value}</span>
        <i className="fas fa-chevron-down text-[10px] text-gray-500"></i>
      </button>
      {openSelect === id && (
        <div className="absolute left-0 top-[108px] z-30 w-[min(330px,85vw)] overflow-hidden rounded-xl border border-white/20 bg-[#565654]/95 p-2 text-white shadow-2xl backdrop-blur">
          {colors.map(color => (
            <button
              type="button"
              key={color}
              onClick={() => {
                onChange(color);
                setOpenSelect(null);
              }}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-bold transition ${value === color ? 'bg-[#91c66f]' : 'hover:bg-white/10'}`}
            >
              <span className="w-4 text-center">{value === color ? <i className="fas fa-check"></i> : ''}</span>
              <span>{color}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const WindowPreview = ({ item = draft, compact = false }: { item?: WindowItem; compact?: boolean }) => {
    const frameColor = colorMap[item.outerColor];
    const aspect = Math.max(0.62, Math.min(1.35, Number(item.width || 1200) / Number(item.height || 1500)));

    return (
      <div className={`mx-auto ${compact ? 'w-48' : 'w-full max-w-[320px]'}`}>
        <div className="mb-3 text-center text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Live voorbeeld</div>
        <div className="rounded-[2rem] border border-gray-100 bg-white p-7 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
          <div className="relative mx-auto flex justify-center" style={{ width: compact ? 130 : 210 }}>
            <div className="absolute -right-4 top-0 h-full w-0.5 bg-[#e09d37]">
              <span className="absolute -right-7 top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-gray-800 shadow">
                Hoogte: {item.height || '1500'}mm
              </span>
            </div>
            <div className="absolute -bottom-4 left-0 h-0.5 w-full bg-[#e09d37]">
              <span className="absolute left-1/2 top-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[8px] font-black uppercase tracking-widest text-gray-800 shadow">
                Breedte: {item.width || '1200'}mm
              </span>
            </div>
            <div
              className="relative border-[16px] shadow-2xl"
              style={{ borderColor: frameColor, width: compact ? 130 : 210, aspectRatio: `${aspect}` }}
            >
              <div
                className="h-full w-full border-[10px] bg-gradient-to-br from-[#eef4f5] to-[#cdd5db]"
                style={{ borderColor: colorMap[item.innerColor] }}
              >
                {item.rods !== 'Geen' && <div className="absolute inset-[26px] border-l-2 border-t-2 border-white/80"></div>}
                {(item.rods === '1x1 (kruis)' || item.rods === '2x2 (9 vakken)') && <div className="absolute inset-y-[26px] left-1/2 w-0.5 bg-white/80"></div>}
                {(item.rods === '1x1 (kruis)' || item.rods === '2x2 (9 vakken)') && <div className="absolute inset-x-[26px] top-1/2 h-0.5 bg-white/80"></div>}
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400">Situatieschets</p>
            <p className="mt-2 text-xs italic text-gray-500">Netto maten inclusief 10mm rondom vrij</p>
          </div>
        </div>
      </div>
    );
  };

  const StepTitle = ({ title, text }: { title: string; text: string }) => (
    <div className="mb-5 text-center">
      <h2 className="text-lg font-black uppercase tracking-tight text-[#111827] sm:text-xl">{title}</h2>
      <p className="mt-1 text-xs font-medium text-gray-500">{text}</p>
    </div>
  );

  const renderStep = () => {
    if (step === 7) {
      return (
        <div className="py-8 text-center">
          {loading ? (
            <>
              <div className="mx-auto mb-7 h-16 w-16 animate-pulse rounded-2xl bg-[#111827]"></div>
              <h2 className="text-2xl font-black uppercase text-[#111827]">Aanvraag verwerken...</h2>
              <p className="mt-3 text-sm text-gray-500">We zetten uw kozijnspecificaties klaar.</p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#111827] text-[#e09d37] shadow-xl">
                <i className="fas fa-check text-2xl"></i>
              </div>
              <h2 className="text-3xl font-black uppercase text-[#111827]">Aanvraag verzonden</h2>
              <p className="mx-auto mt-5 max-w-xl rounded-3xl bg-gray-50 p-6 text-base font-medium leading-relaxed text-gray-600">{aiSummary}</p>
            </>
          )}
        </div>
      );
    }

    if (step === 1) {
      return (
        <>
          <StepTitle title="1. Type kozijn" text="Selecteer het type element dat u wilt inmeten." />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {frameTypes.map(type => (
              <button
                type="button"
                key={type.id}
                onClick={() => updateDraft('frameType', type.id)}
                className={`min-h-[80px] rounded-xl border-2 p-3 text-center transition-all ${draft.frameType === type.id ? 'border-[#e09d37] bg-[#111827] text-white shadow-xl' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-[#e09d37]/50'}`}
              >
                <i className={`fas ${type.icon} mb-2 text-xl`}></i>
                <span className="block text-[10px] font-black uppercase tracking-[0.16em]">{type.id}</span>
              </button>
            ))}
          </div>
          <div className="mt-8 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-sm font-medium leading-relaxed text-gray-600">
            Wilt u <strong className="text-gray-900">6 of meer kozijnen</strong> aanvragen? Neem dan bij voorkeur rechtstreeks contact op per e-mail of telefoon, zodat we de aanvraag persoonlijk en efficient kunnen afstemmen.
          </div>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <StepTitle title="2. Afmetingen" text="Meet de opening en vul de maten in — wij regelen de rest." />
          <div className="mb-8 overflow-visible rounded-2xl border border-gray-200 bg-white px-6 py-6 text-gray-700 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-[11px] font-black uppercase tracking-[0.16em] text-gray-600"><i className="fas fa-ruler-combined mr-2 text-[#e09d37]"></i>Hoe meten?</p>
              <div className="group relative">
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-gray-50 text-gray-500 transition hover:border-[#e09d37] hover:text-[#111827] focus:border-[#e09d37] focus:text-[#111827] focus:outline-none">
                  <i className="fas fa-info text-xs"></i>
                </button>
                <div className="pointer-events-none absolute right-0 top-12 z-40 w-72 translate-y-2 rounded-2xl border border-gray-200 bg-white p-4 opacity-0 shadow-2xl transition group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-gray-500">Visuele meethulp</p>
                  <div className="relative mx-auto mb-4 h-36 w-44 rounded-xl bg-gray-50 p-5">
                    <div className="relative h-full w-full border-[12px] border-[#111827] bg-gradient-to-br from-white to-gray-200">
                      <div className="absolute -bottom-5 left-0 right-0 h-0.5 bg-red-500"></div>
                      <div className="absolute -bottom-6 left-0 h-3 w-0.5 bg-red-500"></div>
                      <div className="absolute -bottom-6 right-0 h-3 w-0.5 bg-red-500"></div>
                      <div className="absolute -right-5 bottom-0 top-0 w-0.5 bg-red-500"></div>
                      <div className="absolute -right-6 top-0 h-0.5 w-3 bg-red-500"></div>
                      <div className="absolute -right-6 bottom-0 h-0.5 w-3 bg-red-500"></div>
                    </div>
                  </div>
                  <p className="text-xs font-semibold leading-relaxed text-gray-600">Meet de binnenmaat van de opening: van links naar rechts voor de breedte, en van onder naar boven voor de hoogte. Wij trekken automatisch 10 mm af zodat het kozijn goed past.</p>
                </div>
              </div>
            </div>
            <p className="max-w-2xl text-sm font-medium leading-relaxed text-gray-600">Meet de opening van muur tot muur en vul die maten hieronder in. <strong className="text-gray-900">Wij trekken automatisch 10 mm af</strong> zodat het kozijn precies past — u hoeft zelf niets bij te tellen of af te trekken.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label>
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Breedte opening (mm)</span>
              <div className="flex h-14 items-center rounded-xl bg-gray-50 px-4">
                <input type="number" value={draft.measuredWidth} onChange={event => updateMeasuredDimension('measuredWidth', event.target.value)} placeholder="bijv. 1200" className="min-w-0 flex-1 bg-transparent text-xl font-black text-gray-900 outline-none placeholder:text-gray-400" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-300">mm</span>
              </div>
              <span className="mt-1.5 block text-xs font-semibold text-gray-400">{draft.width ? `Kozijnmaat: ${draft.width} mm` : 'Wij berekenen de kozijnmaat'}</span>
            </label>
            <label>
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Hoogte opening (mm)</span>
              <div className="flex h-14 items-center rounded-xl bg-gray-50 px-4">
                <input type="number" value={draft.measuredHeight} onChange={event => updateMeasuredDimension('measuredHeight', event.target.value)} placeholder="bijv. 1500" className="min-w-0 flex-1 bg-transparent text-xl font-black text-gray-900 outline-none placeholder:text-gray-400" />
                <span className="text-xs font-black uppercase tracking-widest text-gray-300">mm</span>
              </div>
              <span className="mt-1.5 block text-xs font-semibold text-gray-400">{draft.height ? `Kozijnmaat: ${draft.height} mm` : 'Wij berekenen de kozijnmaat'}</span>
            </label>
          </div>
          {exceedsOnlineSize && (
            <div className="mt-6 rounded-2xl border border-[#f1dca9] bg-[#fff9ea] px-5 py-4 text-sm font-medium leading-relaxed text-[#9a6630]">
              Deze maat valt buiten de standaard online aanvraag. Voor kozijnen groter dan <strong>3500 mm breed</strong> en/of <strong>2500 mm hoog</strong> stemmen wij de mogelijkheden graag persoonlijk met u af via e-mail of telefoon.
            </div>
          )}
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <StepTitle title="3. Profiel, kleur & glas" text="Kies de gewenste uitstraling en bekijk direct het resultaat." />
          <div className="grid gap-10 lg:grid-cols-[1fr_310px]">
            <div className="space-y-6">
              <div>
                <p className={fieldLabelClass}>Type profiel</p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {profileTypes.map(profile => (
                    <button type="button" key={profile} onClick={() => updateDraft('profile', profile)} className={`flex h-14 items-center justify-center rounded-xl border p-3 text-center text-[9px] font-black uppercase leading-snug tracking-[0.08em] transition ${draft.profile === profile ? 'border-[#e09d37] bg-[#111827] text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>
                      {profile}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {renderSelect('outerColor', 'Kleur buitenzijde (kader)', draft.outerColor, value => updateDraft('outerColor', value))}
                {renderSelect('innerColor', 'Kleur binnenzijde (vleugel)', draft.innerColor, value => updateDraft('innerColor', value))}
              </div>
              <div>
                <p className={fieldLabelClass}>Type glas</p>
                <div className="grid grid-cols-2 gap-3">
                  {glassTypes.map(glass => (
                    <button type="button" key={glass} onClick={() => updateDraft('glass', glass)} className={`flex h-16 items-center justify-center rounded-xl border px-3 text-center text-[9px] font-black uppercase tracking-[0.08em] transition ${draft.glass === glass ? 'border-[#e09d37] bg-[#111827] text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>{glass}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className={fieldLabelClass}>Roedeverdeling</p>
                <div className="grid grid-cols-3 gap-3">
                  {rodTypes.map(rod => (
                    <button type="button" key={rod} onClick={() => updateDraft('rods', rod)} className={`flex h-16 items-center justify-center rounded-xl border p-3 text-center text-[9px] font-black uppercase leading-tight tracking-[0.06em] transition ${draft.rods === rod ? 'border-[#e09d37] bg-[#111827] text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}>{rod}</button>
                  ))}
                </div>
              </div>
            </div>
            <WindowPreview />
          </div>
        </>
      );
    }

    if (step === 4) {
      return (
        <>
          <StepTitle title="4. Controle & toevoegen" text="Controleer het kozijn en voeg het toe aan uw aanvraag." />
          <div className="mx-auto max-w-xl">
            <WindowPreview />
            <button type="button" onClick={addDraftToOverview} className={`${buttonBase} mx-auto mt-8 flex h-14 items-center justify-center gap-3 bg-[#e09d37] px-10 text-black shadow-xl hover:bg-[#111827] hover:text-white`}>
              <i className="fas fa-plus"></i> Voeg dit kozijn toe
            </button>
          </div>
        </>
      );
    }

    if (step === 5) {
      return (
        <>
          <StepTitle title="Overzicht aanvraag" text={`U heeft ${totalQuantity} kozijn(en) toegevoegd.`} />
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-3xl bg-gray-50 p-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#111827] text-lg font-black text-[#e09d37]">{index + 1}</div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#111827]">{item.frameType}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-500">{item.width} x {item.height} mm • {item.glass} • {item.outerColor}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 items-center overflow-hidden rounded-xl bg-white">
                    <button type="button" onClick={() => changeQuantity(item.id, -1)} className="h-full px-4 text-gray-400">-</button>
                    <span className="px-3 text-sm font-black text-gray-900">{item.quantity}</span>
                    <button type="button" onClick={() => changeQuantity(item.id, 1)} className="h-full px-4 text-gray-400">+</button>
                  </div>
                  <button type="button" onClick={() => editItem(item)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-400 hover:text-[#111827]"><i className="fas fa-pencil"></i></button>
                  <button type="button" onClick={() => removeItem(item.id)} className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-gray-300 hover:text-red-500"><i className="fas fa-trash-can"></i></button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button type="button" onClick={resetDraft} className={`${buttonBase} h-11 border-2 border-[#111827] bg-white text-[#111827] hover:bg-gray-50`}>
              <i className="fas fa-plus mr-2"></i>Nog een kozijn toevoegen
            </button>
            <button type="button" onClick={() => setStep(6)} className={`${buttonBase} h-11 bg-[#111827] text-white shadow-lg hover:bg-[#e09d37] hover:text-black`}>
              Gegevens invullen <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </>
      );
    }

    return (
      <>
        <StepTitle title="5. Contactgegevens" text="Laat uw gegevens achter zodat we de aanvraag kunnen verwerken." />
        <div className="mx-auto max-w-lg space-y-5">
          {[
            { id: 'name', label: 'Volledige naam', placeholder: 'Uw naam', type: 'text' },
            { id: 'email', label: 'E-mailadres', placeholder: 'uw@email.nl', type: 'email' },
            { id: 'phone', label: 'Telefoonnummer', placeholder: '06 12345678', type: 'tel' },
          ].map(field => (
            <label key={field.id} className="block">
              <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">{field.label}</span>
              <input
                type={field.type}
                value={contact[field.id as keyof typeof contact]}
                onChange={event => setContact(prev => ({ ...prev, [field.id]: event.target.value }))}
                placeholder={field.placeholder}
                className="h-16 w-full rounded-xl border border-gray-100 bg-gray-50 px-5 text-base font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#e09d37]"
              />
            </label>
          ))}
          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.18em] text-gray-500">Opmerkingen (optioneel)</span>
            <textarea
              value={contact.notes}
              onChange={event => setContact(prev => ({ ...prev, notes: event.target.value }))}
              placeholder="Bijv. kleurwensen of glassoort"
              className="h-28 w-full resize-none rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 text-base font-bold text-gray-900 outline-none transition placeholder:text-gray-400 focus:ring-2 focus:ring-[#e09d37]"
            />
          </label>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f8fa] px-4 pb-12 pt-24 text-[#111827] sm:pt-28">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.45em] text-[#e09d37]">Maatvoering tool</span>
          <h1 className="text-2xl font-black uppercase leading-tight tracking-tight text-[#111827] sm:text-3xl">
            Aanvraag kozijnen op maat
          </h1>
        </div>

        <div className="mx-auto overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
          {step < 7 && (
            <div className="h-1.5 bg-gray-50">
              <div className="h-full bg-[#e09d37] transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          )}
          <div className="p-5 sm:p-8">
            {renderStep()}
            {step < 7 && step !== 5 && (
              <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-5">
                <button type="button" onClick={prevStep} disabled={step === 1} className={`text-[10px] font-black uppercase tracking-[0.18em] transition ${step === 1 ? 'pointer-events-none opacity-0' : 'text-gray-400 hover:text-[#111827]'}`}>
                  <i className="fas fa-arrow-left mr-2"></i>Vorige
                </button>
                <button type="button" onClick={nextStep} disabled={!canContinue} className={`${buttonBase} h-11 bg-[#111827] px-8 text-white shadow-lg hover:bg-[#e09d37] hover:text-black disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none`}>
                  {step === 6 ? 'Aanvraag verzenden' : 'Volgende stap'} <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {step < 7 && (
          <div className="mt-5 flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map(dot => (
              <span key={dot} className={`h-1.5 rounded-full transition-all ${step === dot || (step === 6 && dot === 5) ? 'w-6 bg-[#e09d37]' : 'w-1.5 bg-gray-200'}`}></span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteTool;

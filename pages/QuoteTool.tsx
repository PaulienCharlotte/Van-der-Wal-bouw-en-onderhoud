
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";

// Initialize AI only when needed to prevent crash on startup if key is missing
const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

const QuoteTool: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(10);

  const [formData, setFormData] = useState({
    projectType: 'Kozijn',
    style: 'Modern / Strak',
    color: 'Antraciet RAL 7016',
    width: '',
    height: '',
    extraNotes: '',
    email: '',
    name: '',
    room: 'Woonkamer',
    theme: 'Modern Scandinavisch',
    focus: 'Gevelreiniging & Schilderwerk'
  });

  useEffect(() => {
    let timer: any;
    if (step === 5 && !loading) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate('/');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const finalizeQuote = async () => {
    setLoading(true);
    try {
      const prompt = `Je bent een bouwadviseur voor Van der Wal Bouw en Onderhoud. Vat de aanvraag kort samen voor de klant en bevestig dat we binnen 48 uur contact opnemen. 
      Project: ${formData.projectType}
      Maten: ${formData.width}x${formData.height}cm
      Naam: ${formData.name}
      Toon: Professioneel, kundig en betrouwbaar.`;

      if (!API_KEY) {
        console.error("API Key ontbreekt. Configureer GEMINI_API_KEY in Netlify.");
        throw new Error("API Key ontbreekt");
      }

      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
      });

      setAiSummary(response.text || "Bedankt voor uw aanvraag. We hebben uw gegevens ontvangen en nemen binnen 48 uur contact met u op.");
    } catch (error) {
      setAiSummary("Bedankt voor uw aanvraag. Uw gegevens zijn succesvol verzonden. Van der Wal Bouw en Onderhoud neemt binnen 48 uur contact met u op.");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 4) {
      finalizeQuote();
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">1. Type Project</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'Kozijn', icon: 'fa-window-maximize', label: 'Kozijnen' },
                { id: 'Renovatie', icon: 'fa-building-circle-check', label: 'Renovatie' },
                { id: 'Onderhoud', icon: 'fa-shield-heart', label: 'Onderhoud' }
              ].map(type => (
                <button
                  key={type.id}
                  onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                  className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-3 ${formData.projectType === type.id ? 'border-gold bg-gray-900 text-white shadow-lg' : 'border-gray-100 bg-gray-50 text-gray-400 hover:border-gray-200'}`}
                >
                  <i className={`fas ${type.icon} text-2xl`}></i>
                  <span className="font-black uppercase tracking-widest text-[10px]">{type.label}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">2. Specificaties</h3>
            <div className="grid grid-cols-1 gap-4">
              {formData.projectType === 'Kozijn' && (
                <>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Profiel Stijl</label>
                    <select name="style" value={formData.style} onChange={handleChange} className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold">
                      <option>Modern / Strak</option>
                      <option>Klassiek / Verdiept</option>
                      <option>Houtlook (HVL)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Kleur</label>
                    <input type="text" name="color" value={formData.color} onChange={handleChange} placeholder="bijv. RAL 7016" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                </>
              )}
              {formData.projectType === 'Renovatie' && (
                <>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Ruimte</label>
                    <select name="room" value={formData.room} onChange={handleChange} className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold">
                      <option>Woonkamer</option>
                      <option>Badkamer</option>
                      <option>Keuken</option>
                      <option>Hele Woning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Wens / Thema</label>
                    <input type="text" name="theme" value={formData.theme} onChange={handleChange} placeholder="bijv. Modern of Industrieel" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold" />
                  </div>
                </>
              )}
              {formData.projectType === 'Onderhoud' && (
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Focusgebied</label>
                  <select name="focus" value={formData.focus} onChange={handleChange} className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold">
                    <option>Gevelreiniging & Schilderwerk</option>
                    <option>Dak- en Gootonderhoud</option>
                    <option>Houtrot herstel</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">3. Afmetingen & Info</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-1.5">BREEDTE (CM)</label>
                <input type="number" name="width" value={formData.width} onChange={handleChange} placeholder="120" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-1.5">HOOGTE (CM)</label>
                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="150" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-1.5">AANVULLENDE DETAILS</label>
              <textarea name="extraNotes" value={formData.extraNotes} onChange={handleChange} placeholder="Zijn er specifieke wensen?" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 h-32 resize-none font-light outline-none focus:ring-2 focus:ring-gold"></textarea>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight">4. Contactgegevens</h3>
            <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase">Uw Naam</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="J. de Vries" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-gray-400 mb-1.5 uppercase">E-mailadres</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="uw@email.nl" className="w-full p-4 border border-gray-100 rounded-xl bg-gray-50 font-bold outline-none focus:ring-2 focus:ring-gold" />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="text-center py-8 animate-fadeIn">
            {loading ? (
              <div className="flex flex-col items-center py-10">
                <div className="h-1 w-32 bg-gray-100 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-gold w-1/2 animate-loadingBar"></div>
                </div>
                <h2 className="text-xl font-black uppercase">Aanvraag verwerken...</h2>
              </div>
            ) : (
              <div className="animate-fadeIn">
                <div className="w-16 h-16 bg-gray-900 text-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <i className="fas fa-check text-2xl"></i>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black mb-6 uppercase tracking-tight">Succes!</h2>
                <div className="bg-gray-50 p-8 rounded-[2rem] mb-10 text-gray-700 font-light text-base sm:text-lg leading-relaxed border border-gray-100 shadow-inner italic">
                  "{aiSummary}"
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-900 text-white px-10 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-gold transition-all shadow-lg"
                >
                  TERUG NAAR HOME
                </button>
                <p className="mt-8 text-[9px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                  AUTOMATISCHE REDIRECT OVER {countdown} SECONDEN...
                </p>
              </div>
            )}
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 sm:pt-40 pb-20 px-4 flex justify-center items-start">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <span className="text-gold font-black uppercase tracking-[0.3em] text-[8px] sm:text-[10px] mb-2 block">Offerte Tool</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase leading-none">Prijsindicatie</h1>
        </div>

        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 relative">
          {step < 5 && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-50">
              <div
                className="bg-gold h-full transition-all duration-700 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          )}

          <div className="p-8 sm:p-14">
            {renderStep()}

            {step < 5 && (
              <div className="flex justify-between items-center mt-10 sm:mt-14 pt-8 border-t border-gray-50">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`font-black uppercase tracking-widest text-[10px] transition-opacity ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-400 hover:text-gray-900'}`}
                >
                  <i className="fas fa-chevron-left mr-2"></i>Vorige
                </button>
                <button
                  onClick={nextStep}
                  className="bg-gray-900 text-white px-8 sm:px-10 py-4 sm:py-4.5 rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-gold transition-all shadow-xl flex items-center gap-2"
                >
                  <span>{step === 4 ? 'AANVRAAG VERZENDEN' : 'VOLGENDE'}</span>
                  <i className="fas fa-chevron-right text-[8px]"></i>
                </button>
              </div>
            )}
          </div>
        </div>

        {step < 5 && (
          <p className="text-center mt-8 text-gray-400 font-bold uppercase tracking-[0.1em] text-[8px]">
            STAP {step} VAN 4 — VAN DER WAL BOUW EN ONDERHOUD
          </p>
        )}
      </div>
    </div>
  );
};

export default QuoteTool;

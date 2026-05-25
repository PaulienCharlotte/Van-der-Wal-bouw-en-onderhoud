import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { supabase, isSupabaseConfigured, type ProjectRow } from '../lib/supabase';

// ─── Config ────────────────────────────────────────────────────────────────

const API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY;

async function geminiRewrite(text: string): Promise<string> {
  const prompt = REWRITE_PROMPT.replace('{{TEXT}}', text);
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(JSON.stringify(err));
  }
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
}

const CATEGORIES = [
  'Dakrenovatie', 'Aanbouw', 'Gevel & Schilderwerk', 'Renovatie',
  'Verbouw', 'Kunststofkozijnen', 'Aardbevingsherstel', 'Onderhoud', 'Anders',
];

const REWRITE_PROMPT = `Je bent een professionele copywriter voor een bouw- en onderhoudsbedrijf. Herschrijf de social media post hieronder naar een informatieve, neutrale projectbeschrijving voor een portfolio website.

Stijlregels:
- Geen emoji, hashtags of uitroeptekens
- Informatief en zakelijk, schrijf in de derde persoon
- Maximaal 3-4 zinnen: 1. Wat en waar is uitgevoerd, 2. Aanpak en gebruikte materialen, 3. Resultaat
- In het Nederlands

Social media tekst:
{{TEXT}}

Geef alleen de herschreven beschrijving terug, zonder opmaak of uitleg.`;

// ─── Shared input style ────────────────────────────────────────────────────

const inputCls =
  'w-full bg-[#0a0a0a] border border-white/10 text-gray-300 text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-[#e09d37] transition-colors placeholder:text-gray-600';

const Field: React.FC<{
  label: string;
  children: React.ReactNode;
  className?: string;
}> = ({ label, children, className = '' }) => (
  <div className={`flex flex-col gap-1.5 ${className}`}>
    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
      {label}
    </label>
    {children}
  </div>
);

// ─── Login view ────────────────────────────────────────────────────────────

const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <i className="fas fa-triangle-exclamation text-[#e09d37] text-4xl mb-6 block" />
          <h2 className="text-white text-xl font-bold mb-4">Supabase niet geconfigureerd</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Voeg <code className="text-[#e09d37]">SUPABASE_URL</code> en{' '}
            <code className="text-[#e09d37]">SUPABASE_ANON_KEY</code> toe aan{' '}
            <code className="text-[#e09d37]">.env.local</code> om de admin te gebruiken.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError('Verkeerde inloggegevens. Probeer opnieuw.');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[11px] block mb-4">
            Admin
          </span>
          <h1 className="text-4xl font-extrabold text-white uppercase tracking-tight">
            Inloggen
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111111] rounded-2xl p-10 border border-white/5 flex flex-col gap-6"
        >
          <Field label="E-mailadres">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className={inputCls}
            />
          </Field>

          <Field label="Wachtwoord">
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={inputCls}
            />
          </Field>

          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-700/30 rounded-lg px-4 py-3">
              <i className="fas fa-circle-exclamation mr-2" />
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-[#e09d37] text-black py-4 rounded-lg font-black uppercase tracking-widest text-[11px] hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? (
              <><i className="fas fa-circle-notch fa-spin mr-2" />Bezig...</>
            ) : (
              'Inloggen'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Project form ──────────────────────────────────────────────────────────

type FormState = {
  linkedinText: string;
  description: string;
  title: string;
  category: string;
  location: string;
  date: string;
  tags: string;
  files: File[];
};

const emptyForm: FormState = {
  linkedinText: '',
  description: '',
  title: '',
  category: CATEGORIES[0],
  location: '',
  date: '',
  tags: '',
  files: [],
};

const ProjectForm: React.FC<{ onPublished: () => void }> = ({ onPublished }) => {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isRewriting, setIsRewriting] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [rewriteError, setRewriteError] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  useEffect(() => {
    const urls = form.files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(u => URL.revokeObjectURL(u));
  }, [form.files]);

  const handleRewrite = async () => {
    if (!form.linkedinText.trim()) return;
    setIsRewriting(true);
    setRewriteError('');
    try {
      const text = await geminiRewrite(form.linkedinText);
      if (text.trim()) {
        set('description', text.trim());
      } else {
        setRewriteError('De AI gaf een lege reactie. Probeer opnieuw.');
      }
    } catch (e: any) {
      console.error('Gemini fout:', e);
      setRewriteError(`Herschrijving mislukt: ${e?.message ?? 'onbekende fout'}`);
    } finally {
      setIsRewriting(false);
    }
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const images = Array.from(list).filter(f => f.type.startsWith('image/'));
    set('files', [...form.files, ...images].slice(0, 4));
  };

  const removeFile = (i: number) =>
    set('files', form.files.filter((_, idx) => idx !== i));

  const handlePublish = async () => {
    if (!form.title.trim() || !form.description.trim() || !form.location.trim() || !form.date.trim()) {
      setStatus({ type: 'error', message: 'Vul alle verplichte velden in (*).' });
      return;
    }
    setIsPublishing(true);
    setStatus(null);

    try {
      const imageUrls: string[] = [];

      for (const file of form.files) {
        const ext = file.name.split('.').pop();
        const name = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadErr } = await supabase.storage
          .from('project-images')
          .upload(name, file, { contentType: file.type });
        if (uploadErr) throw uploadErr;
        const { data } = supabase.storage.from('project-images').getPublicUrl(name);
        imageUrls.push(data.publicUrl);
      }

      const tags = form.tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);

      const { error: dbErr } = await supabase.from('projects').insert({
        title: form.title.trim(),
        category: form.category,
        location: form.location.trim(),
        date: form.date.trim(),
        description: form.description.trim(),
        images: imageUrls,
        tags,
        published: true,
      });
      if (dbErr) throw dbErr;

      setStatus({ type: 'success', message: 'Project gepubliceerd en direct zichtbaar op de website.' });
      setForm(emptyForm);
      onPublished();
    } catch (e: any) {
      setStatus({ type: 'error', message: e?.message ?? 'Publiceren mislukt. Probeer opnieuw.' });
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-[10px] font-black text-[#e09d37] uppercase tracking-[0.3em] mb-1">
        Nieuw project toevoegen
      </h2>

      {/* Stap 1 — AI herschrijving */}
      <section className="bg-[#0d0d0d] rounded-xl p-6 border border-white/5 flex flex-col gap-4">
        <p className="text-xs font-bold text-white uppercase tracking-widest">
          1 — Plak de social media tekst
        </p>
        <textarea
          value={form.linkedinText}
          onChange={e => set('linkedinText', e.target.value)}
          rows={5}
          placeholder="Plak hier de LinkedIn of Facebook post van Jasper..."
          className={`${inputCls} resize-y`}
        />
        <button
          onClick={handleRewrite}
          disabled={isRewriting || !form.linkedinText.trim()}
          className="self-start bg-[#e09d37] text-black px-6 py-3 rounded-lg font-black uppercase tracking-widest text-[10px] hover:bg-white transition-colors disabled:opacity-40 flex items-center gap-2"
        >
          {isRewriting ? (
            <><i className="fas fa-circle-notch fa-spin" /> Herschrijven...</>
          ) : (
            <><i className="fas fa-wand-magic-sparkles" /> Herschrijf met AI</>
          )}
        </button>
        {rewriteError && (
          <p className="text-red-400 text-sm bg-red-900/20 border border-red-700/30 rounded-lg px-4 py-3">
            <i className="fas fa-circle-exclamation mr-2" />{rewriteError}
          </p>
        )}
      </section>

      {/* Stap 2 — Beschrijving */}
      <section className="bg-[#0d0d0d] rounded-xl p-6 border border-white/5 flex flex-col gap-4">
        <p className="text-xs font-bold text-white uppercase tracking-widest">
          2 — Controleer de beschrijving
          <span className="text-gray-500 font-normal ml-2 normal-case">
            (aanpassen mag)
          </span>
        </p>
        <textarea
          value={form.description}
          onChange={e => set('description', e.target.value)}
          rows={4}
          placeholder="De herschreven tekst verschijnt hier na stap 1..."
          className={`${inputCls} resize-y`}
        />
      </section>

      {/* Stap 3 — Projectdetails */}
      <section className="bg-[#0d0d0d] rounded-xl p-6 border border-white/5 flex flex-col gap-5">
        <p className="text-xs font-bold text-white uppercase tracking-widest">
          3 — Projectdetails
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Titel *">
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="bijv. Dakrenovatie vrijstaande woning"
              className={inputCls}
            />
          </Field>

          <Field label="Categorie">
            <select
              value={form.category}
              onChange={e => set('category', e.target.value)}
              className={inputCls}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>

          <Field label="Locatie *">
            <input
              type="text"
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="bijv. Groningen"
              className={inputCls}
            />
          </Field>

          <Field label="Datum *">
            <input
              type="text"
              value={form.date}
              onChange={e => set('date', e.target.value)}
              placeholder="bijv. April 2025"
              className={inputCls}
            />
          </Field>

          <Field label="Tags (komma-gescheiden)" className="sm:col-span-2">
            <input
              type="text"
              value={form.tags}
              onChange={e => set('tags', e.target.value)}
              placeholder="bijv. EPDM, Isolatie, Dakgoten"
              className={inputCls}
            />
          </Field>
        </div>
      </section>

      {/* Stap 4 — Foto's */}
      <section className="bg-[#0d0d0d] rounded-xl p-6 border border-white/5 flex flex-col gap-4">
        <p className="text-xs font-bold text-white uppercase tracking-widest">
          4 — Foto's uploaden
          <span className="text-gray-500 font-normal ml-2 normal-case">
            (max. 4, eerste foto is de hoofdfoto)
          </span>
        </p>

        <input
          ref={fileRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={e => addFiles(e.target.files)}
        />

        <button
          onClick={() => fileRef.current?.click()}
          disabled={form.files.length >= 4}
          className="border-2 border-dashed border-white/10 rounded-xl py-8 flex flex-col items-center gap-2 text-gray-600 hover:border-[#e09d37]/40 hover:text-gray-400 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <i className="fas fa-cloud-arrow-up text-2xl" />
          <span className="text-[11px] font-bold uppercase tracking-widest">
            Klik om foto's te selecteren
          </span>
          <span className="text-[10px]">{form.files.length} / 4 geselecteerd</span>
        </button>

        {previews.length > 0 && (
          <div className="grid grid-cols-4 gap-3">
            {previews.map((url, i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 bg-black/70 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <i className="fas fa-times text-[10px]" />
                </button>
                {i === 0 && (
                  <span className="absolute bottom-1 left-1 bg-[#e09d37] text-black text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded">
                    Hoofd
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Status */}
      {status && (
        <div
          className={`rounded-xl px-5 py-4 text-sm font-semibold ${
            status.type === 'success'
              ? 'bg-green-900/30 border border-green-700/40 text-green-400'
              : 'bg-red-900/30 border border-red-700/40 text-red-400'
          }`}
        >
          <i
            className={`fas mr-2 ${
              status.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'
            }`}
          />
          {status.message}
        </div>
      )}

      {/* Publiceren */}
      <button
        onClick={handlePublish}
        disabled={isPublishing}
        className="bg-[#e09d37] text-black py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isPublishing ? (
          <><i className="fas fa-circle-notch fa-spin" /> Publiceren...</>
        ) : (
          <><i className="fas fa-upload" /> Publiceren</>
        )}
      </button>
    </div>
  );
};

// ─── Dashboard (na inloggen) ───────────────────────────────────────────────

const Dashboard: React.FC = () => {
  const [projects, setProjects] = useState<Pick<ProjectRow, 'id' | 'title' | 'category' | 'date'>[]>([]);
  const [tick, setTick] = useState(0);

  const reload = () => setTick(t => t + 1);

  useEffect(() => {
    supabase
      .from('projects')
      .select('id, title, category, date')
      .order('created_at', { ascending: false })
      .then(({ data }) => setProjects((data as any) ?? []));
  }, [tick]);

  const handleLogout = () => supabase.auth.signOut();

  const handleDelete = async (id: string) => {
    if (!confirm('Project verwijderen? Dit kan niet ongedaan worden gemaakt.')) return;
    await supabase.from('projects').delete().eq('id', id);
    reload();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Admin topbar */}
      <header className="bg-[#111111] border-b border-white/5 px-6 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[#e09d37] font-black uppercase tracking-[0.3em] text-[11px]">Admin</span>
          <span className="text-white/20">·</span>
          <span className="text-gray-500 text-sm">Van der Wal Bouw & Onderhoud</span>
        </div>
        <div className="flex items-center gap-5">
          <Link
            to="/realisaties"
            target="_blank"
            className="text-gray-500 hover:text-white text-[11px] font-bold uppercase tracking-widest transition-colors hidden sm:block"
          >
            Bekijk website <i className="fas fa-arrow-up-right-from-square ml-1 text-[9px]" />
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-400 text-[11px] font-bold uppercase tracking-widest transition-colors"
          >
            Uitloggen
          </button>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar — projectenlijst */}
        <aside className="lg:w-72 border-r border-white/5 overflow-y-auto p-6 flex flex-col gap-4 shrink-0">
          <h3 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">
            Gepubliceerd ({projects.length})
          </h3>

          {projects.length === 0 ? (
            <p className="text-gray-700 text-xs">Nog geen projecten.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {projects.map(p => (
                <li
                  key={p.id}
                  className="bg-[#111111] rounded-lg p-3 border border-white/5 flex items-start justify-between gap-2"
                >
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold leading-tight truncate">{p.title}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">
                      {p.category} · {p.date}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(p.id)}
                    title="Verwijderen"
                    className="text-gray-700 hover:text-red-400 transition-colors shrink-0 mt-0.5"
                  >
                    <i className="fas fa-trash text-[10px]" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Main — formulier */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10">
          <ProjectForm onPublished={reload} />
        </main>
      </div>
    </div>
  );
};

// ─── Root export ───────────────────────────────────────────────────────────

const Admin: React.FC = () => {
  const [session, setSession] = useState<any>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (session === undefined) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <i className="fas fa-circle-notch fa-spin text-[#e09d37] text-3xl" />
      </div>
    );
  }

  return session ? <Dashboard /> : <LoginView />;
};

export default Admin;

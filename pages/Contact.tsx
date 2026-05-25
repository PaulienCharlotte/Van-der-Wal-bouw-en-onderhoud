
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'contact-aanvraag',
          'naam': formState.name,
          'email': formState.email,
          'bericht': formState.message,
        }).toString(),
      });
      setSubmitted(true);
    } catch {
      setError('Er ging iets mis. Probeer het opnieuw of mail direct naar info@vdwalbouw.nl.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-gray-50 py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#b88e4b] font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Klaar voor de start</span>
          <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter uppercase leading-none text-gray-900">Contact</h1>
          <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto font-light leading-relaxed">
            Heeft u vragen over onze diensten of wilt u direct een project bespreken? Wij staan voor u klaar.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1 space-y-8">
              {[
                { icon: 'fa-phone-alt', label: 'Telefoon', value: '06 48 32 47 29' },
                { icon: 'fa-envelope', label: 'Email', value: 'info@vdwalbouw.nl' },
                { icon: 'fa-map-marker-alt', label: 'Locatie', value: 'Jonkersvaart 97\n9354 TN, Zevenhuizen' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-5">
                  <div className="w-12 h-12 shrink-0 bg-[#e09d37]/10 rounded-xl flex items-center justify-center text-[#e09d37]">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900 leading-snug whitespace-pre-line">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-50">
              <h3 className="text-2xl font-black mb-10 uppercase tracking-tight italic text-gray-900">Stuur een Bericht</h3>
              {submitted ? (
                <div className="bg-green-50 text-green-700 p-8 rounded-2xl border border-green-100">
                  <div className="flex items-center gap-3 mb-2"><i className="fas fa-check-circle text-xl"></i><span className="font-bold">Bericht Verzonden!</span></div>
                  <p className="text-sm">Bedankt. Wij nemen zo spoedig mogelijk contact met u op.</p>
                </div>
              ) : (
                <form name="contact-aanvraag" onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="form-name" value="contact-aanvraag" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" name="naam" required placeholder="Uw Naam" value={formState.name} onChange={handleChange} className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#e09d37] text-gray-900 placeholder-gray-400 font-medium" />
                    <input type="email" name="email" required placeholder="E-mail" value={formState.email} onChange={handleChange} className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#e09d37] text-gray-900 placeholder-gray-400 font-medium" />
                  </div>
                  <textarea name="bericht" required rows={6} placeholder="Uw bericht..." value={formState.message} onChange={handleChange} className="w-full p-5 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#e09d37] text-gray-900 placeholder-gray-400 resize-none font-normal"></textarea>
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  <button type="submit" disabled={sending} className="w-full md:w-auto bg-[#e09d37] text-black px-12 py-5 rounded-sm font-black uppercase tracking-widest text-[11px] hover:bg-black hover:text-[#e09d37] transition-all shadow-lg disabled:opacity-60">
                    {sending ? 'Verzenden...' : 'Verzenden'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;

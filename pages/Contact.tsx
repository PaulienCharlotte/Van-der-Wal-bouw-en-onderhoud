
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
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
            <div className="lg:col-span-1 space-y-12">
              <div>
                <h3 className="text-xs font-black mb-6 text-[#b88e4b] uppercase tracking-[0.2em]">Contactgegevens</h3>
                <div className="space-y-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Telefoon</p>
                      <p className="text-lg font-bold text-gray-900">06 48 32 47 29</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email</p>
                      <p className="text-lg font-bold text-gray-900">info@jvanderwalbouwenonderhoud.nl</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-black mb-6 text-[#b88e4b] uppercase tracking-[0.2em]">Locatie</h3>
                <div className="space-y-6 mt-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-900 shadow-sm border border-gray-100">
                      <i className="fas fa-map-marker-alt"></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Werkplaats</p>
                      <p className="text-lg font-bold text-gray-900 leading-relaxed">Jonkersvaart 97<br />9354 TN, Zevenhuizen</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-gray-50">
              <h3 className="text-2xl font-black mb-10 uppercase tracking-tight italic">Stuur een Bericht</h3>
              {submitted ? (
                <div className="bg-green-50 text-green-700 p-8 rounded-2xl animate-fadeIn border border-green-100">
                  <div className="flex items-center gap-3 mb-2"><i className="fas fa-check-circle text-xl"></i><span className="font-bold">Bericht Verzonden!</span></div>
                  <p className="text-sm">Bedankt. Wij nemen zo spoedig mogelijk contact met u op.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input type="text" required placeholder="Uw Naam" className="w-full p-5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#b88e4b] font-bold" />
                    <input type="email" required placeholder="E-mail" className="w-full p-5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#b88e4b] font-bold" />
                  </div>
                  <textarea required rows={5} placeholder="Uw bericht..." className="w-full p-5 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#b88e4b] resize-none font-light"></textarea>
                  <button type="submit" className="w-full md:w-auto bg-gray-900 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#b88e4b] transition-all shadow-xl">Verzenden</button>
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

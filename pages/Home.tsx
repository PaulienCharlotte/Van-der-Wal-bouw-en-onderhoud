
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000"
            alt="Moderne Architectuur"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 pt-20">
          <div className="max-w-4xl animate-slideUp">
            <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[140px] font-extrabold text-white mb-10 leading-[0.9] tracking-tighter text-shadow-lg uppercase">
              BOUWEN AAN <br />
              <span className="text-[#e09d37]">PERFECTIE</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-12 max-w-2xl font-medium leading-relaxed text-shadow-sm bg-black/60 p-6 sm:p-8 border-l-4 border-[#e09d37] backdrop-blur-[4px] rounded-r-lg">
              Van vloeibare zandcementvloeren en schuimbeton tot volledige dakrenovaties en aanbouw. Jasper van der Wal combineert moderne visie met ouderwets vakmanschap.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/offerte" className="bg-[#e09d37] text-black px-12 py-5 rounded-md text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white transition-all shadow-2xl">
                Start Uw Project
              </Link>
              <Link to="/diensten" className="bg-black/40 border border-white/20 text-white px-12 py-5 rounded-md text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                Onze Expertise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kerngebieden Section */}
      <section className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-32">
            <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">ONZE FOCUS</span>
            <h2 className="text-4xl md:text-7xl font-extrabold text-black tracking-tighter uppercase leading-tight">VAKMANSCHAP <br />IN DE PRAKTIJK</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-16 grid-container-hamer">
            {[
              { title: 'DAKRENOVATIE', text: 'Herstel van lekkages, vervangen van folies en pannen, en isolatie voor een waterdicht resultaat.' },
              { title: 'RUWBOUW & AANBOUW', text: 'Constructies van metal-stud tot houtskeletbouw, inclusief schuimbeton en funderingen.' },
              { title: 'VLOEREN & CV', text: 'Invrezen van vloerverwarming, gieten van anhydriet en vloeibare zandcementvloeren.' },
              { title: 'BADKAMERS', text: 'Complete badkamerrenovaties, inclusief herindeling van ruimtes en hoogwaardige afwerking.' }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className="absolute -top-14 -right-6 opacity-0 group-hover:opacity-100 group-hover:hammer-strike transition-opacity pointer-events-none z-[30]">
                  <i className="fas fa-hammer text-[#e09d37] text-5xl transform -scale-x-100 drop-shadow-2xl"></i>
                </div>

                <Link to="/diensten" className="block bg-[#111111] p-12 flex flex-col min-h-[480px] justify-between shadow-xl rounded-xl border border-white/5 transition-all duration-400 hover:translate-y-[-10px] hover:bg-[#161616] hover:border-[#e09d37]/40 card-impact relative z-10 overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-[#e09d37] text-2xl font-black mb-8 uppercase tracking-tight leading-tight group-hover:text-white transition-colors">{item.title}</h3>
                    <p className="text-gray-300 text-lg leading-[1.6] font-normal group-hover:text-white transition-colors">{item.text}</p>
                  </div>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-10 h-1 bg-[#e09d37] rounded-full"></div>
                    <span className="text-[10px] font-black text-[#e09d37] uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity">Bekijk Dienst</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Sectie - 50/50 Split zoals in screenshot */}
      <section className="py-24 md:py-40 bg-[#0a0a0a] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col lg:flex-row items-stretch gap-0 bg-[#0d0d0d] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)]">
            {/* Linkerkant: De Afbeelding (Silhouette stijl) */}
            <div className="w-full lg:w-1/2 relative min-h-[500px] lg:min-h-[700px]">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=90&w=1200"
                alt="Vakman in silhouet aan het werk"
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.3] brightness-[0.7] contrast-[1.2]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0d0d0d]/10 to-[#0d0d0d] hidden lg:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent lg:hidden"></div>
            </div>

            {/* Rechterkant: De Tekst */}
            <div className="w-full lg:w-1/2 p-12 md:p-24 flex flex-col justify-center">
              <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[12px] mb-10 block">PROJECT IN FOCUS</span>
              <h2 className="text-4xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter uppercase leading-[0.9] mb-10">
                VAN RUWBOUW <br />
                <span className="text-[#e09d37]">TOT AFWERKING</span>
              </h2>
              <p className="text-gray-400 text-lg md:text-xl font-normal leading-relaxed mb-14 max-w-lg">
                Geen klus is te groot. Of het nu gaat om het strippen van een dak tot het dakbeschot of het voorbereiden van elektra in een nieuwe aanbouw; wij regelen dat alles klopt tot in de kleinste details. Vakmanschap met oog voor de mens achter het huis.
              </p>
              <div>
                <Link to="/diensten" className="inline-flex items-center gap-4 text-[13px] font-black text-white uppercase tracking-[0.25em] border-b-2 border-[#e09d37] pb-4 hover:text-[#e09d37] transition-all group">
                  ONTDEK ONZE DIENSTEN <i className="fas fa-arrow-right transform group-hover:translate-x-3 transition-transform"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sectie */}
      <section className="py-48 bg-gradient-to-b from-[#0a0a0a] to-[#050505] text-center border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-4xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter uppercase mb-16 leading-none text-shadow-lg">UW PROJECT, <br /><span className="text-[#e09d37]">ONZE</span> ZORG.</h2>
          <Link to="/offerte" className="inline-block bg-[#e09d37] text-black px-16 py-8 rounded-md text-[13px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl">
            Start uw aanvraag
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

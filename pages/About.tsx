
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header Section */}
      <section className="bg-[#0a0a0a] py-32 sm:py-48 pt-40 md:pt-56 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#111] opacity-50 skew-x-[-20deg] translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <span className="text-[#b88e4b] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 block animate-fadeIn">Van der Wal Bouw</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none animate-slideUp">
            Over Ons
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed animate-slideUp" style={{ animationDelay: '0.1s' }}>
            Vakmanschap, heldere communicatie en passie voor het echte bouwwerk.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">

            {/* Linkerkant: Tekst & Quote */}
            <div className="space-y-20 animate-slideUp">
              <div className="space-y-12">
                <div className="max-w-xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter uppercase text-gray-900">
                    PASSIE VOOR RUWBOUW
                  </h2>
                  <p className="text-gray-500 leading-relaxed text-lg font-normal">
                    Wat begon als een passie voor timmerwerk is uitgegroeid tot een all-round bouwbedrijf. Bij Jasper van der Wal kunt u terecht voor de "grote klussen". Of het nu gaat om het plaatsen van een compleet nieuw dak, het optrekken van een kapschuur of een uitdagende badkamerrenovatie; wij pakken het aan met volle overtuiging.
                  </p>
                </div>

                <div className="max-w-xl">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 tracking-tighter uppercase text-gray-900">
                    PERSOONLIJK CONTACT
                  </h2>
                  <p className="text-gray-500 leading-relaxed text-lg font-normal">
                    Als eenmanszaak heb ik direct contact met de klant. Geen tussenpersonen, maar korte lijnen. Ik denk mee over de constructie, materialen en de slimste aanpak om binnen budget een topresultaat neer te zetten dat uw verwachtingen overtreft.
                  </p>
                </div>
              </div>

              {/* Quote Block - Krachtig contrast (Matching screenshot) */}
              <div className="relative">
                <div className="absolute top-0 left-0 w-full h-full bg-[#e09d37] rounded-[2rem] translate-x-3 translate-y-3 opacity-20"></div>
                <div className="bg-[#0a0a0a] p-12 md:p-16 rounded-[2rem] border-l-8 border-[#e09d37] shadow-2xl relative overflow-hidden group">
                  <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight italic relative z-10">
                    "Bouwen is voor mij meer dan alleen een huis neerzetten. Het gaat om het creëren van een plek waar mensen zich thuis voelen, met constructies die de tijd trotseren."
                  </p>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#e09d37]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                </div>
              </div>
            </div>

            {/* Rechterkant: De Grid (Matching layout in screenshot) */}
            <div className="relative animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="grid grid-cols-2 gap-8 lg:gap-10">
                {/* De lange afbeelding (Silhouette stijl) */}
                <div className="row-span-2">
                  <img
                    src="/silhouette-man-wearing-white-hard-hat-is-just-slightly-visible-due-dark-shadows.jpg"
                    alt="Vakman silhouette"
                    className="rounded-[2.5rem] shadow-2xl object-cover w-full h-full min-h-[600px] border border-gray-100 grayscale-[0.2] brightness-90 transition-transform duration-700 hover:scale-[1.02]"
                  />
                </div>

                {/* De Stats & Status blocks */}
                <div className="space-y-8 lg:space-y-10">
                  <div className="bg-[#e09d37] p-10 md:p-12 rounded-[2.5rem] shadow-xl text-black flex flex-col justify-center min-h-[220px] transition-transform duration-500 hover:-translate-y-2">
                    <i className="fas fa-shield-alt text-3xl mb-6"></i>
                    <p className="font-black text-sm md:text-base uppercase leading-tight tracking-wider">
                      GEGARANDEERDE <br />KWALITEIT
                    </p>
                  </div>

                  <div className="relative aspect-square">
                    <img
                      src="/worker-is-cutting-wires-with-lineman-s-pliers.jpg"
                      alt="Bouw detail"
                      className="rounded-[2.5rem] shadow-2xl object-cover w-full h-full border border-gray-100"
                    />
                  </div>

                  {/* Jaar ervaring block */}
                  <div className="bg-gray-50 p-10 md:p-12 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center transition-transform duration-500 hover:-translate-y-2">
                    <span className="text-[#e09d37] font-black text-4xl sm:text-5xl md:text-6xl block mb-2 tracking-tighter">10+</span>
                    <span className="text-gray-400 uppercase font-black text-[11px] tracking-[0.3em]">JAAR ERVARING</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Extra Waarden Sectie */}
      <section className="py-32 bg-[#fafafa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 text-[#e09d37] shadow-sm">
                <i className="fas fa-check-double text-2xl"></i>
              </div>
              <h4 className="font-black text-gray-900 uppercase tracking-widest">Transparantie</h4>
              <p className="text-gray-500 text-base leading-relaxed">Geen verrassingen achteraf. Duidelijke offertes en eerlijke communicatie over planning en budget.</p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 text-[#e09d37] shadow-sm">
                <i className="fas fa-tools text-2xl"></i>
              </div>
              <h4 className="font-black text-gray-900 uppercase tracking-widest">Vakmanschap</h4>
              <p className="text-gray-500 text-base leading-relaxed">Gebruik van hoogwaardige materialen en bewezen bouwtechnieken voor een resultaat dat staat als een huis.</p>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-gray-100 text-[#e09d37] shadow-sm">
                <i className="fas fa-handshake text-2xl"></i>
              </div>
              <h4 className="font-black text-gray-900 uppercase tracking-widest">Betrouwbaarheid</h4>
              <p className="text-gray-500 text-base leading-relaxed">Afspraak is afspraak. Wij werken volgens de planning en met respect voor uw woning en privacy.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

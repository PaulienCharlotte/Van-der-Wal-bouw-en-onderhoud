
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative min-h-[min(860px,92svh)] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000"
            alt="Moderne Architectuur"
            className="w-full h-full object-cover brightness-[0.4]"
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pt-40 pb-16">
          <div className="max-w-4xl animate-slideUp">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white mb-8 leading-[1.05] tracking-normal text-shadow-lg uppercase">
              Bouwen met <br />
              <span className="text-[#e09d37]">oog voor detail</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-12 max-w-2xl font-medium leading-relaxed text-shadow-sm bg-black/60 p-6 sm:p-8 border-l-4 border-[#e09d37] backdrop-blur-[4px] rounded-r-lg">
              Van vloeibare zandcementvloeren en schuimbeton tot volledige dakrenovaties en aanbouw. Jasper van der Wal combineert moderne visie met ouderwets vakmanschap.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link to="/contact" className="bg-[#e09d37] text-black px-8 py-5 rounded-md text-[11px] font-black uppercase tracking-normal hover:bg-white transition-all shadow-2xl">
                Bespreek uw project
              </Link>
              <Link to="/diensten" className="bg-black/40 border border-white/20 text-white px-12 py-5 rounded-md text-[11px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
                Onze Expertise
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Kerngebieden Section */}
      <section className="bg-white py-24 md:py-40">
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center mb-32">
            <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[12px] mb-6 block">ONZE FOCUS</span>
            <h2 className="text-4xl md:text-7xl font-extrabold text-black tracking-tighter uppercase leading-tight">VAKMANSCHAP <br />IN DE PRAKTIJK</h2>
          </div>

          <div className="grid-container-hamer grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-2 lg:grid-cols-4 xl:gap-x-10">
            {[
              { title: 'ONDERHOUD & RENOVATIE', text: 'Vakkundig onderhoud en complete renovaties van uw woning of bedrijfspand. Wij zorgen voor een duurzaam en hoogwaardig resultaat, van dak tot fundering.' },
              { title: 'VERBOUW', text: 'Van kleine aanpassingen tot grote verbouwingen en aanbouwen. Wij realiseren uw woonwensen met oog voor detail, kwaliteit en een strakke afwerking.' },
              { title: 'KUNSTSTOFKOZIJNEN', text: 'Plaatsen van nieuwe, hoogwaardig isolerende kunststof kozijnen en deuren. Voor een vernieuwde uitstraling, optimaal wooncomfort en lagere energiekosten.' },
              { title: 'AARDBEVINGSHERSTEL', text: 'Vakkundig herstel van bevingsschade en preventieve versterking van uw pand. Wij zorgen voor een veilig en duurzaam resultaat.' }
            ].map((item, i) => (
              <div key={i} className="group relative min-w-0 h-full">
                <div className="absolute -top-14 -right-6 opacity-0 group-hover:opacity-100 group-hover:hammer-strike transition-opacity pointer-events-none z-[30]">
                  <i className="fas fa-hammer text-[#e09d37] text-5xl transform -scale-x-100 drop-shadow-2xl"></i>
                </div>

                <Link to="/diensten" className="card-impact relative z-10 flex h-full min-h-[460px] min-w-0 flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-[#111111] p-6 shadow-xl transition-all duration-400 hover:translate-y-[-10px] hover:border-[#e09d37]/40 hover:bg-[#161616] xl:p-8">
                  <div className="relative z-10 min-w-0">
                    <h3 lang="nl" className="mb-6 max-w-full hyphens-auto text-base font-black uppercase leading-tight text-[#e09d37] [overflow-wrap:anywhere] transition-colors group-hover:text-white 2xl:text-lg">{item.title}</h3>
                    <p className="text-gray-300 text-base leading-[1.7] font-normal group-hover:text-white transition-colors">{item.text}</p>
                  </div>

                  <div className="flex items-center gap-4 relative z-10 mt-8">
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
                src="/homepage-dienstverlening.png"
                alt="Van der Wal aan het werk"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0d0d0d]/10 to-[#0d0d0d] hidden lg:block"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent lg:hidden"></div>
            </div>

            {/* Rechterkant: De Tekst */}
            <div className="flex w-full flex-col justify-center p-8 sm:p-12 md:p-16 lg:w-1/2 xl:p-24">
              <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[12px] mb-10 block">PROJECT IN FOCUS</span>
              <h2 className="text-4xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tighter uppercase leading-[0.9] mb-10">
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
          <Link to="/contact" className="inline-block w-full max-w-sm rounded-md bg-[#e09d37] px-6 py-6 text-[12px] font-black uppercase tracking-normal text-black shadow-2xl transition-all hover:bg-white sm:w-auto sm:max-w-none sm:px-16 sm:py-8 sm:text-[13px]">
            Bespreek uw project
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

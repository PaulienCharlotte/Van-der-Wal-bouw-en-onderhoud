
import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Header Section */}
      <section className="bg-[#0a0a0a] py-32 sm:py-48 pt-40 md:pt-56 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#111] opacity-50 skew-x-[-20deg] translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <span className="brand-name text-[#b88e4b] font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs mb-6 block animate-fadeIn">Van der Wal Bouw en Onderhoud</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none animate-slideUp">
            Over ons
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

            {/* Introductie en aanvragen */}
            <div className="space-y-20 animate-slideUp">
              <div className="max-w-xl">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 tracking-normal uppercase text-gray-900">
                  Renovatie, onderhoud en verbouw
                </h2>
                <div className="space-y-6 text-gray-500 leading-relaxed text-lg font-normal">
                  <p>
                    Als zelfstandig timmerman richt ik mij op renovatie, onderhoud en verbouw. Met respect voor het karakter van bestaande gebouwen en oog voor detail zorg ik voor een zorgvuldige uitvoering en een nette afwerking.
                  </p>
                  <p>
                    Voor aanvullende werkzaamheden, zoals stucwerk, elektra en installatiewerk, beschik ik over een netwerk van betrouwbare vakmensen. Zo kan ik u helpen de juiste specialist voor uw project te vinden.
                  </p>
                  <p>
                    Ook voor kunststof kozijnen kunt u bij mij terecht: ik kan deze leveren en monteren. En als u tijdens een verbouwing tijdelijk extra opslagruimte nodig heeft, zijn er garageboxen te huur. De garageboxen zijn daarnaast ook beschikbaar voor reguliere verhuur.
                  </p>
                  <p>
                    Zoekt u een betrouwbare vakman voor uw renovatie-, onderhouds- of verbouwproject? Dan sta ik graag voor u klaar.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link to="/offerte" className="cta inline-flex min-h-12 items-center justify-center gap-3 bg-[#e09d37] px-5 py-4 text-center text-xs font-bold text-black transition-colors hover:bg-[#111111] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a16a1b]">
                    Kozijnofferte
                    <i className="fas fa-arrow-right shrink-0" aria-hidden="true"></i>
                  </Link>
                  <a href="/garageboxen-verhuur.html" className="cta inline-flex min-h-12 items-center justify-center gap-3 border border-[#111111] px-5 py-4 text-center text-xs font-bold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]">
                    Bekijk garageboxen
                    <i className="fas fa-arrow-right shrink-0" aria-hidden="true"></i>
                  </a>
                </div>
              </div>

              <div className="max-w-xl border-l-4 border-[#e09d37] pl-6">
                <h2 className="mb-4 text-xl font-extrabold uppercase tracking-normal text-gray-900">
                  Veilig en betrouwbaar
                </h2>
                <p className="text-gray-500 leading-relaxed text-lg font-normal">
                  Van der Wal Bouw en Onderhoud beschikt over een VCA-certificaat en is aangesloten bij de geschillencommissie.
                </p>
              </div>

            </div>

            {/* Rechterkant: De Grid (Matching layout in screenshot) */}
            <div className="relative min-w-0 animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:gap-6">
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
                  <div className="bg-[#e09d37] p-4 sm:p-8 lg:p-6 rounded-[2.5rem] shadow-xl text-black flex flex-col justify-center min-h-[220px] transition-transform duration-500 hover:-translate-y-2">
                    <i className="fas fa-shield-alt text-3xl mb-6"></i>
                    <p lang="nl" className="font-black text-xs sm:text-sm uppercase leading-tight tracking-normal [overflow-wrap:anywhere]">
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
                  <div className="bg-gray-50 p-4 sm:p-8 lg:p-6 rounded-[2.5rem] border border-gray-100 flex flex-col justify-center transition-transform duration-500 hover:-translate-y-2">
                    <span className="text-[#e09d37] font-black text-4xl sm:text-5xl md:text-6xl block mb-2 tracking-tighter">10+</span>
                    <span className="text-gray-400 uppercase font-black text-[11px] tracking-normal">JAAR ERVARING</span>
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


import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Service = {
  title: string;
  description: string;
  icon: string;
  image: string;
  ctaLabel: string;
  ctaLink: string;
  ctaGold: boolean;
  heroTagline: string;
  heroSubline: string;
};

const services: Service[] = [
  {
    title: "Kunststofkozijnen",
    description: "Plaatsen van nieuwe, hoogwaardig isolerende kunststof kozijnen en deuren. Voor een vernieuwde uitstraling, optimaal wooncomfort en lagere energiekosten.",
    icon: "fa-door-open",
    image: "/kunsttofkozijn-diensten.png",
    ctaLabel: "Vraag offerte aan",
    ctaLink: "/offerte",
    ctaGold: true,
    heroTagline: "Kunststof",
    heroSubline: "Energiezuinig & duurzaam",
  },
  {
    title: "Onderhoud & Renovatie",
    description: "Vakkundig onderhoud en complete renovaties van uw woning of bedrijfspand. Wij zorgen voor een duurzaam en hoogwaardig resultaat, van dak tot fundering.",
    icon: "fa-hammer",
    image: "/bouw-renovatie-diensten.png",
    ctaLabel: "Neem contact op",
    ctaLink: "/contact",
    ctaGold: false,
    heroTagline: "Renovatie",
    heroSubline: "Vakmanschap van A tot Z",
  },
  {
    title: "Verbouw",
    description: "Van kleine aanpassingen tot grote verbouwingen en aanbouwen. Wij realiseren uw woonwensen met oog voor detail, kwaliteit en een strakke afwerking.",
    icon: "fa-trowel-bricks",
    image: "/man-working-factory.jpg",
    ctaLabel: "Neem contact op",
    ctaLink: "/contact",
    ctaGold: false,
    heroTagline: "Verbouw",
    heroSubline: "Strak op maat",
  },
  {
    title: "Aardbevingsherstel",
    description: "Vakkundig herstel van bevingsschade en preventieve versterking van uw woning of bedrijfspand. Wij zorgen voor een veilig, duurzaam en toekomstbestendig resultaat.",
    icon: "fa-helmet-safety",
    image: "/bevingschade-vlag.png",
    ctaLabel: "Neem contact op",
    ctaLink: "/contact",
    ctaGold: false,
    heroTagline: "Bevingsschade",
    heroSubline: "Vakkundig hersteld",
  }
];

// Hero header met 3D animatie en carousel
const ServicesHero: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(3); // start bij Aardbevingsherstel
  const [direction, setDirection] = useState<'next' | 'prev'>('next');

  const current = services[index];
  const isEarthquake = current.title === 'Aardbevingsherstel';

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -10, y: (px - 0.5) * 14 });
    setSpot({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
    setSpot({ x: 50, y: 50 });
  };

  const next = () => {
    setDirection('next');
    setIndex((i) => (i + 1) % services.length);
  };
  const prev = () => {
    setDirection('prev');
    setIndex((i) => (i - 1 + services.length) % services.length);
  };

  return (
    <section
      className="relative bg-gradient-to-br from-[#0a0a0a] via-[#100805] to-[#0a0a0a] border-b border-white/5 mb-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
    >
      {/* Achtergrond-grid */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(224,157,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(224,157,55,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Beweegbare goud-gloed achter de scene */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${spot.x}% ${spot.y}%, rgba(224,157,55,0.25) 0%, transparent 50%)`,
          opacity: active ? 1 : 0.55,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-32 md:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Tekst-kolom */}
        <div className="relative z-10">
          <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[11px] mb-6 block">
            Vakmanschap op maat
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold mb-8 tracking-tighter uppercase text-white leading-[0.9]">
            ONZE <br />
            <span className="text-[#e09d37]">DIENSTEN</span>
          </h1>

          {/* Dynamisch huidige dienst */}
          <div key={index} className="animate-[fade-in_0.5s_ease-out]">
            <p className="text-gray-400 text-lg md:text-xl max-w-lg font-normal leading-relaxed mb-6">
              {current.description}
            </p>
            <div className="flex items-center gap-3">
              <span className="w-12 h-[2px] bg-[#e09d37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e09d37]">
                {current.title}
              </span>
            </div>
          </div>
        </div>

        {/* 3D Carousel scene */}
        <div className="relative">
          <div
            ref={sceneRef}
            className="relative h-[420px] sm:h-[500px] w-full"
            style={{ perspective: '1800px' }}
          >
            <div
              className="relative w-full h-full transition-transform duration-200 ease-out will-change-transform"
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Schaduw onder de scene */}
              <div
                className="absolute left-1/2 bottom-4 w-3/4 h-12 -translate-x-1/2 rounded-full bg-black blur-2xl opacity-70 pointer-events-none"
                style={{ transform: 'translateZ(-100px) translateX(-50%)' }}
              />

              {/* Donker frame */}
              <div
                className="absolute inset-4 rounded-2xl border border-[#e09d37]/15 bg-gradient-to-br from-[#1a0f05] via-[#0a0a0a] to-[#0d0d0d] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)]"
                style={{ transform: 'translateZ(0px)' }}
              />

              {/* Afbeelding (cycle keyed op index voor in/out animatie) */}
              <div
                key={index}
                className={`absolute inset-8 flex items-center justify-center ${
                  direction === 'next'
                    ? 'animate-[slide-in-right_0.5s_ease-out]'
                    : 'animate-[slide-in-left_0.5s_ease-out]'
                }`}
                style={{ transform: `translateZ(${active ? 100 : 70}px)`, transition: 'transform 0.5s ease-out' }}
              >
                <img
                  src={current.image}
                  alt={current.title}
                  className={`w-full h-full ${isEarthquake ? 'object-contain' : 'object-cover rounded-xl'} drop-shadow-[0_40px_60px_rgba(0,0,0,0.85)] ${
                    isEarthquake ? 'animate-[tremor_5s_ease-in-out_infinite]' : ''
                  }`}
                  style={{ filter: active ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.95)' }}
                />
              </div>

              {/* Pulserende scheur — alleen bij Aardbevingsherstel */}
              {isEarthquake && (
                <div
                  className="absolute inset-8 pointer-events-none mix-blend-screen animate-[crack-pulse_2.8s_ease-in-out_infinite]"
                  style={{
                    background: 'linear-gradient(115deg, transparent 44%, rgba(255,180,80,0.5) 49%, rgba(255,220,140,0.85) 50%, rgba(255,180,80,0.5) 51%, transparent 56%)',
                    transform: 'translateZ(85px)',
                  }}
                />
              )}

              {/* Spotlight die cursor volgt */}
              <div
                className="absolute inset-8 pointer-events-none transition-opacity duration-300 rounded-xl overflow-hidden"
                style={{
                  background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.22), transparent 28%)`,
                  opacity: active ? 1 : 0,
                  transform: 'translateZ(100px)',
                }}
              />

              {/* Glasreflectie */}
              <div
                className="absolute inset-8 pointer-events-none rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.4) 100%)',
                  transform: 'translateZ(95px)',
                }}
              />

              {/* Linksboven: dynamisch label */}
              <div
                key={`tag-${index}`}
                className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-[#e09d37]/30 px-4 py-2 rounded-sm animate-[fade-in_0.6s_ease-out]"
                style={{ transform: 'translateZ(130px)' }}
              >
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#e09d37]">{current.heroTagline}</p>
                <p className="text-[10px] font-bold text-white mt-0.5">{current.heroSubline}</p>
              </div>

              {/* Rechtsonder: icoon van de dienst */}
              <div
                key={`icon-${index}`}
                className="absolute bottom-2 right-2 bg-[#e09d37] text-black w-14 h-14 rounded-sm shadow-2xl flex items-center justify-center animate-[fade-in_0.6s_ease-out]"
                style={{
                  transform: `translateZ(140px) scale(${active ? 1.08 : 1})`,
                  transition: 'transform 0.3s ease-out',
                  boxShadow: '0 20px 40px -10px rgba(224,157,55,0.6)',
                }}
              >
                <i className={`fas ${current.icon} text-xl`}></i>
              </div>

              {/* Futuristische hoek-markers */}
              {[
                { pos: 'top-0 left-0', rotate: 'rotate-0' },
                { pos: 'top-0 right-0', rotate: 'rotate-90' },
                { pos: 'bottom-0 right-0', rotate: 'rotate-180' },
                { pos: 'bottom-0 left-0', rotate: '-rotate-90' },
              ].map((corner, i) => (
                <div
                  key={i}
                  className={`absolute ${corner.pos} w-8 h-8 ${corner.rotate}`}
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-[#e09d37]" />
                  <div className="absolute top-0 left-0 w-[2px] h-full bg-[#e09d37]" />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              aria-label="Vorige dienst"
              className="group flex items-center gap-3 px-5 py-3 rounded-sm border border-white/10 bg-black/40 hover:bg-[#e09d37] hover:text-black hover:border-[#e09d37] transition-all"
            >
              <i className="fas fa-arrow-left text-[#e09d37] group-hover:text-black transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white group-hover:text-black transition-colors hidden sm:inline">
                Vorige
              </span>
            </button>

            {/* Dots indicator */}
            <div className="flex items-center gap-2">
              {services.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 'next' : 'prev');
                    setIndex(i);
                  }}
                  aria-label={`Toon ${s.title}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === index
                      ? 'w-8 h-2 bg-[#e09d37]'
                      : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Volgende dienst"
              className="group flex items-center gap-3 px-5 py-3 rounded-sm border border-white/10 bg-black/40 hover:bg-[#e09d37] hover:text-black hover:border-[#e09d37] transition-all"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white group-hover:text-black transition-colors hidden sm:inline">
                Volgende
              </span>
              <i className="fas fa-arrow-right text-[#e09d37] group-hover:text-black transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const StandardCard: React.FC<{ service: Service }> = ({ service }) => (
  <div className="bg-[#111111] flex flex-col h-full rounded-xl overflow-hidden group shadow-2xl border border-white/5 transition-all duration-500 hover:border-[#e09d37]/30">
    <div className="h-80 overflow-hidden relative">
      <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50" />
      <div className="absolute top-8 right-8 w-14 h-14 bg-[#e09d37] text-black rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
        <i className={`fas ${service.icon} text-xl`}></i>
      </div>
    </div>
    <div className="p-12 flex flex-col flex-grow">
      <h3 className="text-2xl font-black mb-8 uppercase tracking-tight text-[#e09d37] leading-tight">{service.title}</h3>
      <p className="text-gray-300 mb-10 flex-grow text-lg leading-relaxed font-normal">{service.description}</p>
      {service.ctaGold ? (
        <Link to={service.ctaLink} className="inline-flex items-center gap-3 bg-[#e09d37] text-black px-7 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-[#e09d37] transition-all shadow-lg">
          {service.ctaLabel} <i className="fas fa-arrow-right"></i>
        </Link>
      ) : (
        <Link to={service.ctaLink} className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:text-[#e09d37] transition-all group/link">
          {service.ctaLabel} <i className="fas fa-arrow-right transform group-hover/link:translate-x-2 transition-transform"></i>
        </Link>
      )}
    </div>
  </div>
);

const Services: React.FC = () => {
  useEffect(() => {
    if (document.getElementById('services-3d-styles')) return;
    const style = document.createElement('style');
    style.id = 'services-3d-styles';
    style.textContent = `
      @keyframes tremor {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        20% { transform: translate(-1.5px, 1px) rotate(-0.15deg); }
        40% { transform: translate(2px, -1px) rotate(0.2deg); }
        60% { transform: translate(-1px, -1.5px) rotate(-0.1deg); }
        80% { transform: translate(1.5px, 1.5px) rotate(0.15deg); }
      }
      @keyframes crack-pulse {
        0%, 100% { opacity: 0.3; filter: blur(2px); }
        50% { opacity: 1; filter: blur(0.5px); }
      }
      @keyframes fade-in {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes slide-in-right {
        from { opacity: 0; transform: translateX(40px) scale(0.95); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
      @keyframes slide-in-left {
        from { opacity: 0; transform: translateX(-40px) scale(0.95); }
        to { opacity: 1; transform: translateX(0) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="bg-[#0a0a0a] pb-32">
      <ServicesHero />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) => (
            <StandardCard key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;


import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Kunststofkozijnen",
    description: "Plaatsen van nieuwe, hoogwaardig isolerende kunststof kozijnen en deuren. Voor een vernieuwde uitstraling, optimaal wooncomfort en lagere energiekosten.",
    icon: "fa-door-open",
    image: "/kunsttofkozijn-diensten.png",
    ctaLabel: "Vraag offerte aan",
    ctaLink: "/offerte",
    ctaGold: true
  },
  {
    title: "Onderhoud & Renovatie",
    description: "Vakkundig onderhoud en complete renovaties van uw woning of bedrijfspand. Wij zorgen voor een duurzaam en hoogwaardig resultaat, van dak tot fundering.",
    icon: "fa-hammer",
    image: "/bouw-renovatie-diensten.png",
    ctaLabel: "Neem contact op",
    ctaLink: "/contact",
    ctaGold: false
  },
  {
    title: "Verbouw",
    description: "Van kleine aanpassingen tot grote verbouwingen en aanbouwen. Wij realiseren uw woonwensen met oog voor detail, kwaliteit en een strakke afwerking.",
    icon: "fa-trowel-bricks",
    image: "/man-working-factory.jpg",
    ctaLabel: "Neem contact op",
    ctaLink: "/contact",
    ctaGold: false
  },
  {
    title: "Aardbevingsherstel",
    description: "Vakkundig herstel van bevingsschade en preventieve versterking van uw woning of bedrijfspand. Wij zorgen voor een veilig, duurzaam en toekomstbestendig resultaat.",
    icon: "fa-helmet-safety",
    image: "/bevingschade-vlag.png",
    ctaLabel: "Neem contact op",
    ctaLink: "/contact",
    ctaGold: false
  }
];

// Hero header met 3D vlag-animatie
const ServicesHero: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

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

  return (
    <section
      className="relative bg-gradient-to-br from-[#0a0a0a] via-[#100805] to-[#0a0a0a] border-b border-white/5 mb-24 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handleLeave}
    >
      {/* Achtergrond-grid (subtiele futuristische look) */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(224,157,55,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(224,157,55,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Beweegbare goud-gloed achter de vlag */}
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
          <p className="text-gray-400 text-lg md:text-xl max-w-lg font-normal leading-relaxed mb-10">
            Van moderne kunststofkozijnen tot vakkundig herstel van bevingsschade —
            specialist in en rond Groningen.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-12 h-[2px] bg-[#e09d37]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e09d37]">
              Specialisme Groningen
            </span>
          </div>
        </div>

        {/* 3D Vlag-scene */}
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
            {/* Diepte-laag: schaduw onder de vlag */}
            <div
              className="absolute left-1/2 bottom-4 w-3/4 h-12 -translate-x-1/2 rounded-full bg-black blur-2xl opacity-70 pointer-events-none"
              style={{ transform: 'translateZ(-100px) translateX(-50%)' }}
            />

            {/* Achtergrond-frame (donkere plaat) */}
            <div
              className="absolute inset-4 rounded-2xl border border-[#e09d37]/15 bg-gradient-to-br from-[#1a0f05] via-[#0a0a0a] to-[#0d0d0d] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)]"
              style={{ transform: 'translateZ(0px)' }}
            />

            {/* De vlag-afbeelding zwevend in 3D met tremor */}
            <div
              className="absolute inset-8 flex items-center justify-center"
              style={{ transform: `translateZ(${active ? 100 : 70}px)`, transition: 'transform 0.5s ease-out' }}
            >
              <img
                src="/bevingschade-vlag.png"
                alt="Aardbevingsherstel Groningen"
                className="w-full h-full object-contain animate-[tremor_5s_ease-in-out_infinite] drop-shadow-[0_40px_60px_rgba(0,0,0,0.85)]"
                style={{ filter: active ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.95)' }}
              />
            </div>

            {/* Pulserende scheur-gloed (diagonale streep) */}
            <div
              className="absolute inset-8 pointer-events-none mix-blend-screen animate-[crack-pulse_2.8s_ease-in-out_infinite]"
              style={{
                background: 'linear-gradient(115deg, transparent 44%, rgba(255,180,80,0.5) 49%, rgba(255,220,140,0.85) 50%, rgba(255,180,80,0.5) 51%, transparent 56%)',
                transform: 'translateZ(85px)',
              }}
            />

            {/* Spotlight die cursor volgt */}
            <div
              className="absolute inset-8 pointer-events-none transition-opacity duration-300 rounded-xl overflow-hidden"
              style={{
                background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.22), transparent 28%)`,
                opacity: active ? 1 : 0,
                transform: 'translateZ(100px)',
              }}
            />

            {/* Glasreflectie-laag */}
            <div
              className="absolute inset-8 pointer-events-none rounded-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 35%, transparent 65%, rgba(0,0,0,0.4) 100%)',
                transform: 'translateZ(95px)',
              }}
            />

            {/* Zwevende info-badge linksboven */}
            <div
              className="absolute top-2 left-2 bg-black/60 backdrop-blur-md border border-[#e09d37]/30 px-4 py-2 rounded-sm"
              style={{ transform: 'translateZ(130px)' }}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#e09d37]">Bevingsschade</p>
              <p className="text-[10px] font-bold text-white mt-0.5">Vakkundig hersteld</p>
            </div>

            {/* Zwevende stat-badge rechtsonder */}
            <div
              className="absolute bottom-2 right-2 bg-[#e09d37] text-black px-4 py-2 rounded-sm shadow-2xl"
              style={{
                transform: `translateZ(140px) scale(${active ? 1.08 : 1})`,
                transition: 'transform 0.3s ease-out',
                boxShadow: '0 20px 40px -10px rgba(224,157,55,0.6)',
              }}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.25em]">Erkend</p>
              <p className="text-[11px] font-black">Specialist</p>
            </div>

            {/* Hoek-markers (futuristische frame-stijl) */}
            {[
              { pos: 'top-0 left-0', rotate: 'rotate-0' },
              { pos: 'top-0 right-0', rotate: 'rotate-90' },
              { pos: 'bottom-0 right-0', rotate: 'rotate-180' },
              { pos: 'bottom-0 left-0', rotate: '-rotate-90' },
            ].map((corner, i) => (
              <div
                key={i}
                className={`absolute ${corner.pos} w-8 h-8 ${corner.rotate}`}
                style={{ transform: `translateZ(50px) ${corner.rotate ? '' : ''}` }}
              >
                <div className="absolute top-0 left-0 w-full h-[2px] bg-[#e09d37]" />
                <div className="absolute top-0 left-0 w-[2px] h-full bg-[#e09d37]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StandardCard: React.FC<{ service: typeof services[number] }> = ({ service }) => (
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

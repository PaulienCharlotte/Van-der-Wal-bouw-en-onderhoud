
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

// 3D Aardbevingsherstel card — mouse-tracked tilt, spotlight, parallax, pulserende scheur
const Earthquake3DCard: React.FC<{ service: typeof services[number] }> = ({ service }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (py - 0.5) * -12, y: (px - 0.5) * 12 });
    setSpot({ x: px * 100, y: py * 100 });
  };

  const handleEnter = () => setActive(true);
  const handleLeave = () => {
    setActive(false);
    setTilt({ x: 0, y: 0 });
    setSpot({ x: 50, y: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="relative h-full"
      style={{ perspective: '1500px' }}
    >
      <div
        className="relative bg-[#0d0d0d] flex flex-col h-full rounded-xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(224,157,55,0.25)] border border-white/10 transition-transform duration-200 ease-out will-change-transform"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${active ? 1.015 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* 3D Vlag scene */}
        <div className="h-80 relative overflow-hidden bg-gradient-to-br from-[#1a0f05] via-[#0a0a0a] to-[#0d0d0d]">
          {/* Achtergrond-gloed die met cursor meebeweegt */}
          <div
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(224,157,55,0.35) 0%, transparent 55%)`,
              opacity: active ? 1 : 0.5,
            }}
          />

          {/* Vlag met diepte (translateZ) en subtiele tremor */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ transform: `translateZ(${active ? 60 : 30}px)`, transition: 'transform 0.4s ease-out' }}
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-full object-cover animate-[tremor_5s_ease-in-out_infinite] drop-shadow-[0_25px_45px_rgba(0,0,0,0.7)]"
              style={{ filter: active ? 'brightness(1.1) contrast(1.05)' : 'brightness(0.9)' }}
            />
          </div>

          {/* Pulserende scheur-gloed (diagonale streep over de vlag) */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen animate-[crack-pulse_2.8s_ease-in-out_infinite]"
            style={{
              background: 'linear-gradient(115deg, transparent 44%, rgba(255,180,80,0.55) 49%, rgba(255,220,140,0.85) 50%, rgba(255,180,80,0.55) 51%, transparent 56%)',
              transform: 'translateZ(50px)',
            }}
          />

          {/* Spotlight overlay die cursor volgt */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.18), transparent 30%)`,
              opacity: active ? 1 : 0,
              transform: 'translateZ(70px)',
            }}
          />

          {/* Bovenlaag: glas-reflectie */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)',
            }}
          />

          {/* Icoon zwevend in 3D */}
          <div
            className="absolute top-8 right-8 w-14 h-14 bg-[#e09d37] text-black rounded-lg flex items-center justify-center shadow-2xl"
            style={{
              transform: `translateZ(110px) scale(${active ? 1.15 : 1})`,
              transition: 'transform 0.3s ease-out',
              boxShadow: '0 20px 40px -10px rgba(224,157,55,0.5)',
            }}
          >
            <i className={`fas ${service.icon} text-xl`}></i>
          </div>

          {/* "BEVINGSSCHADE" label zwevend */}
          <div
            className="absolute bottom-6 left-6"
            style={{ transform: 'translateZ(90px)' }}
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#e09d37] bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#e09d37]/30">
              Specialisme Groningen
            </span>
          </div>
        </div>

        {/* Tekst-kolom */}
        <div className="p-12 flex flex-col flex-grow relative" style={{ transform: 'translateZ(20px)' }}>
          <h3 className="text-2xl font-black mb-8 uppercase tracking-tight text-[#e09d37] leading-tight">{service.title}</h3>
          <p className="text-gray-300 mb-10 flex-grow text-lg leading-relaxed font-normal">{service.description}</p>
          <Link to={service.ctaLink} className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:text-[#e09d37] transition-all group/link">
            {service.ctaLabel} <i className="fas fa-arrow-right transform group-hover/link:translate-x-2 transition-transform"></i>
          </Link>
        </div>

        {/* Goud-randje gloed onderaan */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e09d37] to-transparent opacity-60"
          style={{ transform: 'translateZ(5px)' }}
        />
      </div>
    </div>
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
        0%, 100% { opacity: 0.35; filter: blur(2px); }
        50% { opacity: 1; filter: blur(0.5px); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="bg-[#0a0a0a] pb-32">
      <section className="bg-[#111111] py-40 border-b border-white/5 mb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="text-[#e09d37] font-black uppercase tracking-[0.4em] text-[11px] mb-6 block">Vakmanschap op maat</span>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold mb-8 tracking-tighter uppercase text-white">ONZE DIENSTEN</h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service, index) =>
            service.title === 'Aardbevingsherstel'
              ? <Earthquake3DCard key={index} service={service} />
              : <StandardCard key={index} service={service} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;

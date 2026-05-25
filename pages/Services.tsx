
import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Onderhoud & Renovatie",
    description: "Vakkundig onderhoud en complete renovaties van uw woning of bedrijfspand. Wij zorgen voor een duurzaam en hoogwaardig resultaat, van dak tot fundering.",
    icon: "fa-hammer",
    image: "/worker-is-cutting-wires-with-lineman-s-pliers.jpg"
  },
  {
    title: "Verbouw",
    description: "Van kleine aanpassingen tot grote verbouwingen en aanbouwen. Wij realiseren uw woonwensen met oog voor detail, kwaliteit en een strakke afwerking.",
    icon: "fa-trowel-bricks",
    image: "/man-working-factory.jpg"
  },
  {
    title: "Kunststofkozijnen",
    description: "Plaatsen van nieuwe, hoogwaardig isolerende kunststof kozijnen en deuren. Voor een vernieuwde uitstraling, optimaal wooncomfort en lagere energiekosten.",
    icon: "fa-door-open",
    image: "/kunsttofkozijn-diensten.png"
  },
  {
    title: "Aardbevingsherstel",
    description: "Vakkundig herstel van bevingsschade en preventieve versterking van uw woning of bedrijfspand. Wij zorgen voor een veilig, duurzaam en toekomstbestendig resultaat.",
    icon: "fa-helmet-safety",
    image: "/bevingschade-vlag.png"
  }
];

const Services: React.FC = () => {
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
          {services.map((service, index) => (
            <div key={index} className="bg-[#111111] flex flex-col h-full rounded-xl overflow-hidden group shadow-2xl border border-white/5 transition-all duration-500 hover:border-[#e09d37]/30">
              <div className="h-80 overflow-hidden relative">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-50" />
                <div className="absolute top-8 right-8 w-14 h-14 bg-[#e09d37] text-black rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                  <i className={`fas ${service.icon} text-xl`}></i>
                </div>
              </div>
              <div className="p-12 flex flex-col flex-grow">
                <h3 className="text-2xl font-black mb-8 uppercase tracking-tight text-[#e09d37] leading-tight">{service.title}</h3>
                <p className="text-gray-300 mb-10 flex-grow text-lg leading-relaxed font-normal">{service.description}</p>
                <Link to="/offerte" className="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-[11px] hover:text-[#e09d37] transition-all group/link">
                  PRIJSINDICATIE AANVRAGEN <i className="fas fa-arrow-right transform group-hover/link:translate-x-2 transition-transform"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;

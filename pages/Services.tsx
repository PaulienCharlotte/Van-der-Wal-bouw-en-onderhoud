
import React from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    title: "Dakrenovatie & Herstel",
    description: "Volledig strippen tot dakbeschot, vervangen van folies en rotte delen. Wij garanderen een waterdicht resultaat onder de pannen.",
    icon: "fa-hammer",
    image: "/construction-hammer-indoors-still-life.jpg"
  },
  {
    title: "Aanbouw & Ruwbouw",
    description: "Van kapschuren tot woonruimte uitbreidingen. Inclusief voorbereiding elektra en bekleden van wanden.",
    icon: "fa-trowel-bricks",
    image: "/worker-is-cutting-wires-with-lineman-s-pliers.jpg"
  },
  {
    title: "Vloeren & Verwarming",
    description: "Invrezen van vloerverwarming en storten van anhydriet of vloeibare zandcementvloeren voor een perfecte basis.",
    icon: "fa-temperature-arrow-up",
    image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Schuimbeton Storten",
    description: "Isolerende en lichtgewicht fundering in samenwerking met specialisten, ideaal voor renovaties van boerderijen en woningen.",
    icon: "fa-truck-moving",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Badkamer Totaal",
    description: "Herindeling van kamers, plaatsen van wanden en sanitair. Wij ontzorgen van sloop tot het eerste tegelwerk.",
    icon: "fa-bath",
    image: "/room-interior-renovation-indoor-paint.jpg"
  },
  {
    title: "Kozijn & Deuren",
    description: "Plaatsen van nieuwe deurkozijnen, deuren en kunststof kozijnen voor een frisse uitstraling en optimale isolatie.",
    icon: "fa-door-open",
    image: "/man-working-factory.jpg"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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


import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import QuoteTool from './pages/QuoteTool';
import Contact from './pages/Contact';

const Logo: React.FC<{ isDarkPage: boolean; isScrolled: boolean }> = ({ isDarkPage, isScrolled }) => (
  <div className="flex flex-col items-start leading-none tracking-tighter">
    <span className={`text-xl sm:text-2xl font-extrabold transition-colors duration-300 ${isScrolled || isDarkPage ? 'text-[#e09d37]' : 'text-[#d4a017]'} text-shadow-sm`}>VAN DER WAL</span>
    <span className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-1 transition-colors duration-300 ${isScrolled || isDarkPage ? 'text-gray-400' : 'text-gray-500'}`}>BOUW & ONDERHOUD</span>
  </div>
);

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const isDarkPage = location.pathname === '/' || location.pathname === '/diensten';
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Over Ons', path: '/over-ons' },
    { label: 'Diensten', path: '/diensten' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-xl' : 'bg-transparent py-6 sm:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex justify-between items-center">
            <Link to="/" className="shrink-0 transition-transform hover:scale-105">
              <Logo isDarkPage={isDarkPage} isScrolled={isScrolled} />
            </Link>

            <nav className="hidden lg:flex space-x-10 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isScrolled || isDarkPage
                      ? (location.pathname === item.path ? 'text-[#e09d37]' : 'text-gray-200 hover:text-[#e09d37]')
                      : (location.pathname === item.path ? 'text-[#d4a017]' : 'text-gray-900 hover:text-[#d4a017]')
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/offerte" className="bg-[#e09d37] text-black px-7 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-[#e09d37] transition-all shadow-lg">
                Offerte
              </Link>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`lg:hidden p-2 transition-colors ${isScrolled || isDarkPage ? 'text-white' : 'text-gray-900'}`}>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[110] bg-[#0a0a0a] transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-10 pt-32">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-white text-3xl">
            <i className="fas fa-times"></i>
          </button>
          <nav className="flex flex-col space-y-8">
            {navItems.concat([{ label: 'Offerte', path: '/offerte' }]).map((item) => (
              <Link key={item.label} to={item.path} className="text-5xl font-extrabold uppercase tracking-tighter text-white hover:text-[#e09d37]">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/10 relative z-10">
    <div className="max-w-7xl mx-auto px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <div className="flex flex-col items-start leading-none tracking-tighter">
            <span className="text-xl sm:text-2xl font-extrabold text-[#e09d37]">VAN DER WAL</span>
            <span className="text-[9px] uppercase tracking-[0.25em] font-bold text-gray-400 mt-1">BOUW & ONDERHOUD</span>
          </div>
          <p className="text-gray-400 mt-8 max-w-sm text-sm font-normal leading-relaxed">
            Gespecialiseerd in daken, renovaties en ruwbouw. Wij bouwen met passie en precisie voor een duurzaam resultaat waar u jarenlang van geniet.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-black text-[#e09d37] uppercase tracking-[0.2em] mb-8">Contact</h4>
          <ul className="space-y-4 text-gray-300 text-xs">
            <li className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-[#e09d37] w-4"></i> Jonkersvaart 97, 9354 TN Zevenhuizen</li>
            <li className="text-white font-bold text-base flex items-center gap-3"><i className="fas fa-phone-alt text-[#e09d37] w-4"></i> 06 48 32 47 29</li>
            <li className="flex items-center gap-3"><i className="fas fa-envelope text-[#e09d37] w-4"></i> info@jvanderwalbouwenonderhoud.nl</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-black text-[#e09d37] uppercase tracking-[0.2em] mb-8">Social</h4>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-[#e09d37] transition-colors text-2xl"><i className="fab fa-linkedin"></i></a>
            <a href="#" className="text-gray-400 hover:text-[#e09d37] transition-colors text-2xl"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-400 hover:text-[#e09d37] transition-colors text-2xl"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em] gap-4">
        <p>&copy; {new Date().getFullYear()} Van der Wal Bouw & Onderhoud.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Privacybeleid</a>
          <a href="#" className="hover:text-white transition-colors">Algemene Voorwaarden</a>
        </div>
      </div>
    </div>
  </footer>
);

const App: React.FC = () => (
  <Router>
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/over-ons" element={<About />} />
          <Route path="/diensten" element={<Services />} />
          <Route path="/offerte" element={<QuoteTool />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  </Router>
);

export default App;

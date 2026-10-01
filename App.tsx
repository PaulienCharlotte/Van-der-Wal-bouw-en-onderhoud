
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import QuoteTool from './pages/QuoteTool';
import Contact from './pages/Contact';

const Logo: React.FC<{ className?: string }> = ({ className = 'h-auto w-[150px] sm:w-[170px]' }) => (
  <img
    src="/logo.svg"
    width="1188"
    height="782"
    alt="Van der Wal Bouw en Onderhoud"
    className={`block shrink-0 ${className}`}
  />
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

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
    setIsScrolled(false);
  }, [location.pathname]);

  const isDarkPage = location.pathname === '/' || location.pathname === '/diensten' || location.pathname === '/over-ons' || location.pathname === '/realisaties';
  const isSolidHeader = isScrolled || location.pathname === '/offerte';
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Over Ons', path: '/over-ons' },
    { label: 'Diensten', path: '/diensten' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] py-3 transition-all duration-500 ${isSolidHeader ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/10 shadow-xl' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex justify-between items-center">
            <Link to="/" className="shrink-0 transition-transform hover:scale-105">
              <Logo />
            </Link>

            <nav className="hidden lg:flex gap-6 xl:gap-10 items-center">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isSolidHeader || isDarkPage
                      ? (location.pathname === item.path ? 'text-[#e09d37]' : 'text-gray-200 hover:text-[#e09d37]')
                      : (location.pathname === item.path ? 'text-[#d4a017]' : 'text-gray-900 hover:text-[#d4a017]')
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              <a href="/garageboxen-verhuur.html" className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#e09d37] transition-all duration-300 hover:text-white">
                Garageboxen
              </a>
              <Link to="/offerte" className="bg-[#e09d37] text-black px-7 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-[#e09d37] transition-all shadow-lg">
                Kozijnofferte
              </Link>
            </nav>

            <button aria-label="Menu openen" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`lg:hidden flex h-11 w-11 items-center justify-center transition-colors ${isSolidHeader || isDarkPage ? 'text-white' : 'text-gray-900'}`}>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-[110] overflow-x-hidden overflow-y-auto bg-[#0a0a0a] transition-all duration-500 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex min-h-full flex-col p-8 pt-28 sm:p-10 sm:pt-32">
          <button aria-label="Menu sluiten" onClick={() => setIsMenuOpen(false)} className="absolute right-8 top-8 flex h-11 w-11 items-center justify-center text-3xl text-white sm:right-10 sm:top-10">
            <i className="fas fa-times"></i>
          </button>
          <nav className="flex min-w-0 flex-col space-y-8">
            {navItems.concat([{ label: 'Kozijnofferte', path: '/offerte' }]).map((item) => (
              <Link key={item.label} to={item.path} className="max-w-full break-words text-3xl font-extrabold uppercase leading-tight tracking-normal text-white hover:text-[#e09d37] sm:text-5xl">
                {item.label}
              </Link>
            ))}
            <a href="/garageboxen-verhuur.html" className="max-w-full break-words text-4xl font-extrabold uppercase leading-tight tracking-tighter text-white hover:text-[#e09d37] sm:text-5xl">
              Garageboxen
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-white/10 relative z-10">
    <div className="max-w-7xl mx-auto px-6 sm:px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
        <div className="col-span-1 md:col-span-2">
          <Logo className="h-auto w-[260px] max-w-full" />
          <p className="text-gray-400 mt-8 max-w-sm text-sm font-normal leading-relaxed">
            Gespecialiseerd in daken, renovaties en ruwbouw. Wij bouwen met passie en precisie voor een duurzaam resultaat waar u jarenlang van geniet.
          </p>
        </div>
        <div>
          <h4 className="text-[11px] font-black text-[#e09d37] uppercase tracking-[0.2em] mb-8">Contact</h4>
          <ul className="space-y-4 text-gray-300 text-xs">
            <li className="flex items-center gap-3"><i className="fas fa-map-marker-alt text-[#e09d37] w-4"></i> Jonkersvaart 97, 9354 TN Zevenhuizen</li>
            <li className="text-white font-bold text-base flex items-center gap-3"><i className="fas fa-phone-alt text-[#e09d37] w-4"></i> 06 48 32 47 29</li>
            <li className="flex items-center gap-3"><i className="fas fa-envelope text-[#e09d37] w-4"></i> info@vdwalbouw.nl</li>
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-black text-[#e09d37] uppercase tracking-[0.2em] mb-8">Social</h4>
          <div className="flex space-x-6">
            <a href="https://www.instagram.com/jvanderwalbouwenonderhoud/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e09d37] transition-colors text-2xl"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-10 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 md:flex-row md:text-left">
        <p>&copy; {new Date().getFullYear()} Van der Wal Bouw & Onderhoud.</p>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 md:justify-end">
          <a href="/garageboxen-verhuur.html" className="hover:text-white transition-colors">Garageboxen</a>
          <a href="/privacyverklaring.html" className="hover:text-white transition-colors">Privacyverklaring</a>
          <a href="/algemene-voorwaarden.html" className="hover:text-white transition-colors">Algemene Voorwaarden</a>
        </div>
      </div>
    </div>
  </footer>
);

const PublicLayout: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white">
    <Header />
    <main className="flex-grow">
      <Outlet />
    </main>
    <Footer />
  </div>
);

const App: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/admin" element={<Admin />} />
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/over-ons" element={<About />} />
        <Route path="/diensten" element={<Services />} />
        <Route path="/realisaties" element={<Portfolio />} />
        <Route path="/offerte" element={<QuoteTool />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  </Router>
);

export default App;

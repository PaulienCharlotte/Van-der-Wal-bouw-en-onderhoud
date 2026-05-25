
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import QuoteTool from './pages/QuoteTool';
import Contact from './pages/Contact';

const LogoMark: React.FC<{ className?: string; color?: string }> = ({ className = 'h-8 w-8', color = '#e09d37' }) => (
  <svg viewBox="0 0 300 300" fill={color} xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
    {/* Screwdriver: top-left → bottom-right */}
    <g transform="rotate(-45, 150, 150)">
      <ellipse cx="150" cy="32" rx="15" ry="19" />
      <rect x="135" y="51" width="30" height="52" rx="4" />
      <rect x="143" y="103" width="14" height="128" />
      <rect x="135" y="231" width="30" height="11" rx="2" />
    </g>
    {/* Hammer: top-right → bottom-left */}
    <g transform="rotate(45, 150, 150)">
      <rect x="108" y="16" width="84" height="44" rx="5" />
      <rect x="143" y="60" width="14" height="218" />
      <rect x="135" y="278" width="30" height="13" rx="3" />
    </g>
  </svg>
);

const LogoFull: React.FC<{ className?: string; color?: string }> = ({ className = 'h-32 w-32', color = '#e09d37' }) => (
  <svg viewBox="0 0 500 500" fill={color} xmlns="http://www.w3.org/2000/svg" className={className} role="img" aria-label="Van der Wal Bouw en Onderhoud logo">
    <defs>
      <clipPath id="logoToolClip">
        {/* Tools only visible above and below the text band */}
        <rect x="0" y="0" width="500" height="172" />
        <rect x="0" y="328" width="500" height="172" />
      </clipPath>
    </defs>
    {/* Crossed tools — clipped to sit behind text band */}
    <g clipPath="url(#logoToolClip)">
      <g transform="rotate(-45, 250, 250)">
        <ellipse cx="250" cy="55" rx="22" ry="27" />
        <rect x="230" y="82" width="40" height="68" rx="6" />
        <rect x="243" y="150" width="14" height="200" />
        <rect x="233" y="350" width="34" height="14" rx="2" />
      </g>
      <g transform="rotate(45, 250, 250)">
        <rect x="188" y="28" width="124" height="54" rx="6" />
        <rect x="243" y="82" width="14" height="298" />
        <rect x="233" y="380" width="34" height="16" rx="4" />
      </g>
    </g>
    {/* Horizontal rules */}
    <rect x="0" y="172" width="500" height="4" />
    <rect x="0" y="324" width="500" height="4" />
    {/* Text */}
    <text x="250" y="268" textAnchor="middle" fontSize="64" fontWeight="900" fontFamily="inherit">VAN DER WAL</text>
    <text x="250" y="307" textAnchor="middle" fontSize="20" fontWeight="700" fontFamily="inherit" letterSpacing="4">BOUW EN ONDERHOUD</text>
  </svg>
);

const Logo: React.FC<{ isDarkPage: boolean; isScrolled: boolean }> = ({ isDarkPage, isScrolled }) => {
  const color = isScrolled || isDarkPage ? '#e09d37' : '#c49230';
  return (
    <div className="flex items-center gap-2.5">
      <LogoMark className="h-9 w-9 shrink-0 transition-all duration-300" color={color} />
      <div className="flex flex-col items-start leading-none tracking-tighter">
        <span className="text-xl sm:text-2xl font-extrabold transition-colors duration-300" style={{ color }}>VAN DER WAL</span>
        <span className={`text-[9px] uppercase tracking-[0.25em] font-bold mt-1 transition-colors duration-300 ${isScrolled || isDarkPage ? 'text-gray-400' : 'text-gray-500'}`}>BOUW & ONDERHOUD</span>
      </div>
    </div>
  );
};

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

  const isDarkPage = location.pathname === '/' || location.pathname === '/diensten' || location.pathname === '/over-ons' || location.pathname === '/realisaties';
  const isSolidHeader = isScrolled || location.pathname === '/offerte';
  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Over Ons', path: '/over-ons' },
    { label: 'Diensten', path: '/diensten' },
    { label: 'Realisaties', path: '/realisaties' },
    { label: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isSolidHeader ? 'bg-[#0a0a0a]/95 backdrop-blur-md py-3 border-b border-white/10 shadow-xl' : 'bg-transparent py-6 sm:py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex justify-between items-center">
            <Link to="/" className="shrink-0 transition-transform hover:scale-105">
              <Logo isDarkPage={isDarkPage} isScrolled={isSolidHeader} />
            </Link>

            <nav className="hidden lg:flex space-x-10 items-center">
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
              <Link to="/offerte" className="bg-[#e09d37] text-black px-7 py-3 rounded-sm text-[11px] font-black uppercase tracking-widest hover:bg-black hover:text-[#e09d37] transition-all shadow-lg">
                Offerte
              </Link>
            </nav>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`lg:hidden p-2 transition-colors ${isSolidHeader || isDarkPage ? 'text-white' : 'text-gray-900'}`}>
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
          <LogoFull className="h-28 w-28" color="#e09d37" />
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
            <a href="https://www.linkedin.com/in/jasper-van-der-wal-a26a23319/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#e09d37] transition-colors text-2xl"><i className="fab fa-linkedin"></i></a>
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

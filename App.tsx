
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import QuoteTool from './pages/QuoteTool';
import Contact from './pages/Contact';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#b88e4b] flex items-center justify-center rounded">
              <i className="fas fa-hammer text-white text-xl"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-gray-900 leading-none">VAKWERK</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#b88e4b] font-semibold">Bouw & Renovatie</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-[#b88e4b]' : 'text-gray-600 hover:text-[#b88e4b]'}`}>Home</Link>
            <Link to="/over-ons" className={`text-sm font-medium transition-colors ${location.pathname === '/over-ons' ? 'text-[#b88e4b]' : 'text-gray-600 hover:text-[#b88e4b]'}`}>Over Ons</Link>
            <Link to="/diensten" className={`text-sm font-medium transition-colors ${location.pathname === '/diensten' ? 'text-[#b88e4b]' : 'text-gray-600 hover:text-[#b88e4b]'}`}>Diensten</Link>
            <Link to="/offerte" className={`text-sm font-medium transition-colors ${location.pathname === '/offerte' ? 'text-[#b88e4b]' : 'text-gray-600 hover:text-[#b88e4b]'}`}>Offerte Tool</Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors ${location.pathname === '/contact' ? 'text-[#b88e4b]' : 'text-gray-600 hover:text-[#b88e4b]'}`}>Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Link to="/offerte" className="bg-[#b88e4b] text-white px-6 py-2.5 rounded text-sm font-semibold hover:bg-[#a07a3d] transition-all">
              Direct Offerte
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600 focus:outline-none">
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4">
          <Link to="/" className="block text-gray-600 hover:text-[#b88e4b] font-medium">Home</Link>
          <Link to="/over-ons" className="block text-gray-600 hover:text-[#b88e4b] font-medium">Over Ons</Link>
          <Link to="/diensten" className="block text-gray-600 hover:text-[#b88e4b] font-medium">Diensten</Link>
          <Link to="/offerte" className="block text-gray-600 hover:text-[#b88e4b] font-medium">Offerte Tool</Link>
          <Link to="/contact" className="block text-gray-600 hover:text-[#b88e4b] font-medium">Contact</Link>
          <Link to="/offerte" className="block bg-[#b88e4b] text-white text-center py-3 rounded font-bold">Aanvraag Starten</Link>
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#b88e4b] flex items-center justify-center rounded">
                <i className="fas fa-hammer text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold tracking-tight">VAKWERK</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Gespecialiseerd in hoogwaardig timmerwerk, renovaties en verbouwingen op maat. Als eenmanszaak garandeer ik persoonlijk contact en een onberispelijke afwerking.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-[#b88e4b] transition-colors"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-[#b88e4b] transition-colors"><i className="fab fa-instagram"></i></a>
              <a href="#" className="w-10 h-10 bg-gray-800 flex items-center justify-center rounded-full hover:bg-[#b88e4b] transition-colors"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#b88e4b]">Snelle Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/over-ons" className="hover:text-white transition-colors">Over Ons</Link></li>
              <li><Link to="/diensten" className="hover:text-white transition-colors">Diensten</Link></li>
              <li><Link to="/offerte" className="hover:text-white transition-colors">Offerte Tool</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 text-[#b88e4b]">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt mt-1 text-[#b88e4b]"></i>
                <span>Bouwstraat 123<br />1234 AB, Amsterdam</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone-alt text-[#b88e4b]"></i>
                <span>+31 (0)6 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-[#b88e4b]"></i>
                <span>info@vakwerkbouw.nl</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Vakwerk Bouw & Renovatie. Alle rechten voorbehouden.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Algemene Voorwaarden</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow pt-20">
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
};

export default App;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3" : "bg-transparent py-5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-extrabold text-gray-900 tracking-tight gap-2 flex items-center no-underline hover:opacity-80 transition-opacity">
              <span className="bg-accent text-gray-900 p-2 rounded-xl">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </span>
              Ucab
            </Link>
          </div>
          
          {/* Premium Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1 relative glass-card px-2 py-1.5 rounded-full border border-gray-100 bg-white/60 shadow-sm">
            <Link to="/" className="px-5 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">Home</Link>
            <Link to="#features" className="px-5 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">Features</Link>
            <Link to="#about" className="px-5 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">About</Link>
            
            <div className="relative pl-3 border-l-2 border-gray-200/60 ml-2">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-brand-900 text-white hover:bg-black px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center group ring-1 ring-black/5"
              >
                Sign In
                <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-4 w-64 rounded-[1.5rem] shadow-2xl glass-card border border-white/80 animate-fade-in origin-top-right overflow-hidden p-2 z-50">
                  <div className="p-1 space-y-1" role="menu" aria-orientation="vertical">
                    <Link 
                      to="/login" 
                      className="block px-4 py-3 text-sm font-bold text-gray-700 hover:bg-brand-50 hover:text-brand-700 rounded-xl transition-colors flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 shadow-sm border border-gray-100 text-brand-600">👤</span>
                      Passenger Login
                    </Link>
                    <Link 
                      to="/dlogin" 
                      className="block px-4 py-3 text-sm font-bold text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-colors flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 shadow-sm border border-gray-100 text-emerald-600">🚘</span>
                      Drive with Ucab
                    </Link>
                    <Link 
                      to="/alogin" 
                      className="block px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors flex items-center"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="w-8 h-8 rounded-lg bg-white flex items-center justify-center mr-3 shadow-sm border border-gray-100 text-gray-600">⚙️</span>
                      Admin Portal
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Premium Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 hover:text-brand-600 focus:outline-none p-2.5 rounded-xl glass-card border border-white/60 shadow-sm transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card mx-4 mt-2 rounded-2xl animate-slide-up border border-white/60 shadow-2xl p-3 z-50">
          <div className="flex flex-col space-y-2">
            <Link to="/" className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="#features" className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link to="#about" className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all" onClick={() => setIsMenuOpen(false)}>About</Link>
            <div className="h-px bg-gray-200/60 my-2 mx-2"></div>
            <div className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest px-4 py-1">Access Portals</div>
            <div className="grid grid-cols-1 gap-2">
              <Link 
                to="/login" 
                className="px-4 py-3 text-brand-700 bg-brand-50 font-bold rounded-xl transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Passenger Login
              </Link>
              <Link 
                to="/dlogin" 
                className="px-4 py-3 text-emerald-700 bg-emerald-50 font-bold rounded-xl transition-colors flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Driver Login
              </Link>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default NavBar;

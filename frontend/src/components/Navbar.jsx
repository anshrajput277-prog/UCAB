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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3" : "bg-transparent py-5"}`}>
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
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Home</Link>
            <Link to="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">Features</Link>
            <Link to="#about" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">About</Link>
            
            <div className="relative">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn-primary ml-4"
              >
                Sign In
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl shadow-xl glass-card ring-1 ring-black/5 animate-fade-in origin-top-right overflow-hidden p-2">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link 
                      to="/login" 
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-dark rounded-xl transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Passenger Login
                    </Link>
                    <Link 
                      to="/dlogin" 
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-emerald-600 rounded-xl transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Drive with Ucab
                    </Link>
                    <Link 
                      to="/alogin" 
                      className="block px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-accent-dark rounded-xl transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Admin Portal
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-900 hover:text-accent focus:outline-none p-2 rounded-lg bg-gray-50/50"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-card mx-4 mt-2 animate-slide-up border border-gray-200">
          <div className="flex flex-col space-y-1 p-2">
            <Link to="/" className="block px-4 py-3 text-gray-800 font-medium hover:bg-gray-50 rounded-xl" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <div className="h-px bg-gray-100 my-2"></div>
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider px-4 py-2">Portals</div>
            <Link 
              to="/login" 
              className="block px-4 py-3 text-gray-800 font-medium hover:bg-accent hover:text-gray-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Passenger Login
            </Link>
            <Link 
              to="/dlogin" 
              className="block px-4 py-3 text-gray-800 font-medium hover:bg-emerald-400 hover:text-gray-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Drive with Ucab
            </Link>
            <Link 
              to="/alogin" 
              className="block px-4 py-3 text-gray-800 font-medium hover:bg-accent hover:text-gray-900 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

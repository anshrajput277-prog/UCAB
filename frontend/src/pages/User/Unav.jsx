import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Unav = () => {
  const navigate = useNavigate();
  const get = localStorage.getItem('user');
  const user = get ? JSON.parse(get) : null;
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowLogoutConfirm(false);
    navigate('/');
  };

  const handleScroll = (e, targetId) => {
    if (window.location.pathname === '/uhome') {
      e.preventDefault();
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[999] transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Brand */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/uhome" className="text-2xl font-extrabold text-gray-900 tracking-tight gap-2 flex items-center no-underline hover:opacity-80 transition-opacity">
                <span className="bg-accent text-gray-900 p-2 rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                </span>
                Ucab
              </Link>
            </div>
            
            {/* Premium Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-1 relative glass-card px-2 py-1.5 rounded-full border border-gray-100 bg-white/60 shadow-sm">
              <Link to="/uhome" onClick={(e) => handleScroll(e, 'home')} className="px-4 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">Home</Link>
              <a href="#features" onClick={(e) => handleScroll(e, 'features')} className="px-4 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">Features</a>
              <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="px-4 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">About</a>
              <Link to="/cabs" className="px-4 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">Book Cab</Link>
              <Link to="/mybookings" className="px-4 py-2 text-gray-700 hover:text-brand-700 font-bold tracking-wide rounded-full hover:bg-white hover:shadow-sm transition-all duration-300">My Bookings</Link>
            </div>

            {/* User Info & Actions */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-4 border-l-2 border-gray-200/60 pl-4 ml-2">
                {user && (
                    <div className="flex flex-col justify-center text-right">
                        <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider leading-none mb-1">Welcome</span>
                        <span className="text-gray-900 font-bold text-sm leading-none pt-1">{user.name}</span>
                    </div>
                )}
                <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-full font-bold transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Logout
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
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
          <div className="lg:hidden absolute top-full left-0 right-0 glass-card mx-4 mt-2 rounded-2xl animate-slide-up border border-white/60 shadow-2xl p-3 z-50">
            <div className="flex flex-col space-y-2">
              <Link to="/uhome" onClick={(e) => { handleScroll(e, 'home'); setIsMenuOpen(false); }} className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all">Home</Link>
              <a href="#features" onClick={(e) => { handleScroll(e, 'features'); setIsMenuOpen(false); }} className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all">Features</a>
              <a href="#about" onClick={(e) => { handleScroll(e, 'about'); setIsMenuOpen(false); }} className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all">About</a>
              <Link to="/cabs" className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all" onClick={() => setIsMenuOpen(false)}>Book Cab</Link>
              <Link to="/mybookings" className="block px-4 py-3 text-gray-800 font-bold hover:bg-white rounded-xl shadow-sm transition-all" onClick={() => setIsMenuOpen(false)}>My Bookings</Link>
              <div className="h-px bg-gray-200/60 my-2 mx-2"></div>
              {user && (
                <div className="px-4 py-2 text-sm text-gray-500 font-medium">Signed in as {user.name}</div>
              )}
              <button
                onClick={() => { setShowLogoutConfirm(true); setIsMenuOpen(false); }}
                className="w-full text-left px-4 py-3 text-red-600 bg-red-50 hover:bg-red-100 font-bold rounded-xl transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Premium Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full mx-4 transform scale-100 border border-gray-100">
            <div className="flex items-center justify-center w-20 h-20 mx-auto bg-red-50 text-red-500 rounded-full mb-6 shadow-inner">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-center text-gray-900 mb-3 font-display tracking-tight">Logging Out?</h3>
            <p className="text-center text-gray-500 mb-8 font-medium leading-relaxed">Are you sure you want to end your session? You'll need to sign in again to book a cab.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleLogout}
                className="w-full py-3.5 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Yes, Log me out</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full py-3.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold rounded-xl transition-all duration-300 border border-gray-200 hover:border-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Unav;

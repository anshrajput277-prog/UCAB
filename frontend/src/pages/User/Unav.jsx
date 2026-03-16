import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Unav = () => {
  const navigate = useNavigate();
  const get = localStorage.getItem('user');
  const user = get ? JSON.parse(get) : null;
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setShowLogoutConfirm(false);
    navigate('/');
  };

  return (
    <>
      <Navbar expand="lg" className="fixed-top transition-all duration-300 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 py-3"> 
        <Container>
          <Navbar.Brand as={Link} to="/uhome" className="text-2xl font-extrabold text-gray-900 tracking-tight gap-2 d-flex align-items-center text-decoration-none" style={{ textDecoration: 'none' }}>
            <span className="bg-accent text-gray-900 p-2 rounded-xl me-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '24px', height: '24px' }}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            </span>
            Ucab
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0 shadow-none focus:ring-0" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center gap-2">
              <Link to="/uhome" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-black/5 transition-all duration-300 text-decoration-none">Home</Link>
              <Link to="/cabs" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-black/5 transition-all duration-300 text-decoration-none">Book Cab</Link>
              <Link to="/mybookings" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium rounded-xl hover:bg-black/5 transition-all duration-300 text-decoration-none">My Booking</Link>
              <div className="d-flex align-items-center ms-3 ps-3 border-start border-gray-200">
                  {user && (
                  <div className="me-3 d-flex flex-column justify-content-center text-end">
                      <span className="text-gray-400 text-xs font-bold text-uppercase tracking-wider" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Welcome</span>
                      <span className="text-gray-900 font-bold" style={{ lineHeight: '1.2' }}>
                      {user.name}
                      </span>
                  </div>
                  )}
                  <button
                    onClick={() => setShowLogoutConfirm(true)}
                    className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Logout
                  </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

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

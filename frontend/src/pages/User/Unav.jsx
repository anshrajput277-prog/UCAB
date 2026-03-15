import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Unav = () => {
  const navigate = useNavigate();
  const get = localStorage.getItem('user');
  const user = get ? JSON.parse(get) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
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
                <button
                onClick={handleLogout}
                className="btn-primary py-2 px-4 shadow-sm"
                >
                Logout
                </button>
                {user && (
                <div className="ms-3 d-flex flex-column justify-content-center">
                    <span className="text-gray-400 text-xs font-bold text-uppercase tracking-wider" style={{ fontSize: '0.75rem', lineHeight: '1' }}>Welcome</span>
                    <span className="text-gray-900 font-bold" style={{ lineHeight: '1.2' }}>
                    {user.name}
                    </span>
                </div>
                )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unav;

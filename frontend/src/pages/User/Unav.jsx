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
    <Navbar expand="lg" className="bg-warning"> 
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold text-dark">
          Ucab App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <Link to="/uhome" className="nav-link text-dark fw-semibold">Home</Link>
            <Link to="/cabs" className="nav-link text-dark fw-semibold">Book Cab</Link>
            <Link to="/mybookings" className="nav-link text-dark fw-semibold">My Booking</Link>
            <button
              onClick={handleLogout}
              className="btn btn-dark btn-sm ms-2"
            >
              Logout
            </button>
            {user && (
              <span className="ms-3 text-dark fw-bold">
                ({user.name})
              </span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unav;

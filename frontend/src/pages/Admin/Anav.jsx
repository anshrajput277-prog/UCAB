import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Anav = () => {
  const get = localStorage.getItem('user');

  return (
    <Navbar expand="lg" className="bg-amber-400">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-black font-bold text-lg">
          UCab App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto d-flex gap-3">
            <Link to="/ahome" className="text-black text-decoration-none">Home</Link>
            <Link to="/users" className="text-black text-decoration-none">Users</Link>
            <Link to="/acabs" className="text-black text-decoration-none">Cabs</Link>
            <Link to="/addcab" className="text-black text-decoration-none">AddCab</Link>
            <Link to="/" className="btn btn-dark btn-sm ms-2 ">(Logout)</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Anav;


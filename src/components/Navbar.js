import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { Link } from "react-router-dom";
// import { Route, Routes } from "react-router-dom";

const NavbarPage = () => {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Example-React</Navbar.Brand>
          <Nav className="mx-auto">
            <Link className="nav-link" to="/home">
              Inicio
            </Link>
            <Link className="nav-link" to="/new">
              Nuevo
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavbarPage;

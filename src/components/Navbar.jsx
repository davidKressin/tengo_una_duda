import React from 'react';
import { Link } from 'react-router-dom';
import horizontalLogo from '../assets/horizontalLogoCut.png';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={horizontalLogo}
            alt="Logo"
            className="d-inline-block align-middle"
            style={{ height: '50px' }}
          />
        </Link>

        {/* Botón de menú (para dispositivos pequeños) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/public">
                Publicar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                Sobre Nosotros
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

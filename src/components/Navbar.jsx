import React from 'react';
import { Link } from 'react-router-dom';
import horizontalLogo from '../assets/horizontalLogoCut.png';

export const Navbar = () => {
  return (
    <nav className="nav-glass navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={horizontalLogo}
            alt="Logo"
            className="d-inline-block align-middle filter-light"
            style={{ height: '40px' }}
          />
          <span className="ms-2 fw-bold text-white d-none d-sm-inline">Tengo una Duda</span>
        </Link>

        {/* Botón de menú */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ filter: 'invert(1)' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces del menú */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item mx-2">
              <Link className="nav-link text-white opacity-75 hover-opacity-100" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link className="nav-link text-white opacity-75 hover-opacity-100" to="/about">
                Nosotros
              </Link>
            </li>
            <li className="nav-item mx-2">
              {localStorage.getItem('studentEmail') ? (
                <div className="d-flex align-items-center gap-3">
                  <Link className="nav-link text-white opacity-75 hover-opacity-100" to="/my-plan">
                    <i className="fa-solid fa-calendar-day me-1"></i>
                    Mi Plan
                  </Link>
                  <Link className="nav-link text-white opacity-75 hover-opacity-100" to="/profile">
                    <i className="fa-regular fa-user-circle me-1"></i>
                    Mi Perfil
                  </Link>
                </div>
              ) : (
                <div className="d-flex align-items-center gap-3">
                  <Link className="nav-link text-white opacity-75 hover-opacity-100" to="/login-student">
                    Ingresar
                  </Link>
                  <Link className="btn btn-outline-light btn-sm rounded-pill px-3" to="/login-student?mode=signup">
                    Crear Cuenta
                  </Link>
                </div>
              )}
            </li>
            <li className="nav-item ms-lg-3">
              <Link className="btn-premium" to="/publish" style={{ padding: '0.5rem 1.25rem', fontSize: '0.9rem' }}>
                Resolver Duda
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

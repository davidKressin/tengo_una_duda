import React from 'react';
import { Link } from 'react-router-dom';
import horizontalLogo from "../assets/horizontalLogo.png";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="col-10">

        <Link className="navbar-brand" to="/">
          <div className="image-container m-0 p-2 ">
            <img src={horizontalLogo} className="" alt="" />
          </div>
        </Link>

      </div>

      <div className="container-fluid col-1 m-1">
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="home">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="public">Publicar</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

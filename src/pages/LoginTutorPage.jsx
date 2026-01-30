import React, { useState } from 'react';
import { TutorRoutes } from '../routes/TutorRoutes';
import { AppLayout } from '../layouts/AppLayout';

export const LoginTutorPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logged, setLogged] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setLogged(true);
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  if (logged) return <TutorRoutes />;

  return (
    <AppLayout>
      <div className='section-padding min-vh-100 d-flex align-items-center position-relative overflow-hidden'>
        <div className="hero-glow"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <div className="glass-card p-4 p-md-5">
                <div className="text-center mb-5">
                  <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                    <i className="fa-solid fa-user-shield fs-2"></i>
                  </div>
                  <h2 className="fw-bold text-white">Panel de Tutor</h2>
                  <p className="text-white">Ingresa tus credenciales para continuar</p>
                </div>

                <form onSubmit={handleLogin} className="row g-4">
                  <div className="col-12">
                    <label className="form-label text-white fw-600">Usuario</label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control bg-dark border-secondary text-white p-3 ps-5 rounded-3"
                        placeholder="admin"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-12">
                    <label className="form-label text-white fw-600">Contraseña</label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white">
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        type="password"
                        className="form-control bg-dark border-secondary text-white p-3 ps-5 rounded-3"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="col-12 mt-5">
                    <button type="submit" className="btn-premium w-100 py-3 fs-5 shadow-lg">
                      Iniciar Sesión
                    </button>
                  </div>
                </form>
              </div>
              <div className="text-center mt-4">
                <a href="/" className="text-white text-decoration-none">
                  <i className="fa-solid fa-arrow-left me-2"></i>
                  Volver al inicio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

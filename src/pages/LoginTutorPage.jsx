import React, { useState } from 'react';
import { TutorRoutes } from '../routes/TutorRoutes';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';

export const LoginTutorPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, currentUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      // Logic for tutor status could be added here (e.g., check role in Firestore)
    } catch (err) {
      console.error(err);
      setError('Credenciales incorrectas o error en el servidor.');
    } finally {
      setLoading(false);
    }
  };

  // If user is already logged in, show TutorRoutes
  // Note: For a more robust solution, we should verify if the user is actually a tutor
  if (currentUser) return <TutorRoutes />;

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

                {error && (
                  <div className="alert alert-danger mb-4">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin} className="row g-4">
                  <div className="col-12">
                    <label className="form-label text-white fw-600">Correo Electrónico</label>
                    <div className="position-relative">
                      <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white">
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        type="email"
                        className="form-control bg-dark border-secondary text-white p-3 ps-5 rounded-3"
                        placeholder="tutor@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
                      />
                    </div>
                  </div>

                  <div className="col-12 mt-5">
                    <button
                      type="submit"
                      className="btn-premium w-100 py-3 fs-5 shadow-lg"
                      disabled={loading}
                    >
                      {loading ? 'Cargando...' : 'Iniciar Sesión'}
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

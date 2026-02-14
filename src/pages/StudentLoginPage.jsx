import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';

export const StudentLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { login, register } = useAuth();

    const isSignup = new URLSearchParams(location.search).get('mode') === 'signup';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            if (isSignup) {
                await register(email, password, name);
                // Onboarding is usually for new students
                navigate('/onboarding');
            } else {
                await login(email, password);
                const from = location.state?.from?.pathname || '/profile';
                navigate(from, { replace: true });
            }
        } catch (err) {
            console.error(err);
            setError('Error en la autenticación: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

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
                                        <i className={`fa-solid ${isSignup ? 'fa-user-plus' : 'fa-user-graduate'} fs-2`}></i>
                                    </div>
                                    <h2 className="fw-bold text-white">{isSignup ? 'Crea tu Cuenta' : 'Mi Cuenta'}</h2>
                                    <p className="text-white">{isSignup ? 'Únete para resolver tus dudas' : 'Ingresa para ver tu perfil y dudas'}</p>
                                </div>

                                {error && (
                                    <div className="alert alert-danger bg-danger-subtle border-danger text-danger mb-4">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="row g-4">
                                    {isSignup && (
                                        <div className="col-12">
                                            <label className="form-label text-white fw-600">Nombre</label>
                                            <div className="position-relative">
                                                <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white">
                                                    <i className="fa-solid fa-user"></i>
                                                </span>
                                                <input
                                                    type="text"
                                                    className="form-control bg-dark border-secondary text-white p-3 ps-5 rounded-3"
                                                    placeholder="Tu nombre"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="col-12">
                                        <label className="form-label text-white fw-600">Correo Electrónico</label>
                                        <div className="position-relative">
                                            <span className="position-absolute top-50 start-0 translate-middle-y ms-3 text-white">
                                                <i className="fa-solid fa-envelope"></i>
                                            </span>
                                            <input
                                                type="email"
                                                className="form-control bg-dark border-secondary text-white p-3 ps-5 rounded-3"
                                                placeholder="correo@ejemplo.com"
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
                                                minLength="6"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-12 mt-5">
                                        <button
                                            type="submit"
                                            className="btn-premium w-100 py-3 fs-5 shadow-lg"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                            ) : null}
                                            {isSignup ? 'Registrarme' : 'Acceder'}
                                        </button>
                                    </div>
                                </form>

                                <div className="text-center mt-4">
                                    {isSignup ? (
                                        <p className="text-white opacity-75">
                                            ¿Ya tienes cuenta?{' '}
                                            <button
                                                onClick={() => navigate('/login-student')}
                                                className="btn btn-link text-primary p-0 text-decoration-none fw-bold"
                                            >
                                                Inicia Sesión
                                            </button>
                                        </p>
                                    ) : (
                                        <p className="text-white opacity-75">
                                            ¿No tienes cuenta?{' '}
                                            <button
                                                onClick={() => navigate('/login-student?mode=signup')}
                                                className="btn btn-link text-primary p-0 text-decoration-none fw-bold"
                                            >
                                                Regístrate
                                            </button>
                                        </p>
                                    )}
                                </div>
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

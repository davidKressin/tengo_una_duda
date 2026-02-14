import React from "react";
import { Link } from "react-router-dom";
import { AppLayout } from "../layouts/AppLayout";

export const HomePage = () => {
    return (
        <AppLayout>
            <div className="container-fluid p-0">
                {/* Hero Section */}
                <header className="section-padding position-relative text-center overflow-hidden">
                    <div className="hero-glow"></div>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-10">
                                <h1 className="display-3 mb-3">
                                    <span className="text-white">¿Tienes dudas?</span><br />
                                    <span className="text-gradient">Respuestas reales para la PAES</span>
                                </h1>
                                <p className="lead mb-5 text-white opacity-75 mx-auto" style={{ maxWidth: '700px', fontSize: '1.25rem' }}>
                                    Resuelve tus preguntas de manera rápida con nuestros tutores expertos y prepara tu futuro con total confianza.
                                </p>
                                <div className="d-flex justify-content-center gap-3 flex-wrap">
                                    <Link to="login-student?mode=signup" className="btn-premium">
                                        <i className="fa-solid fa-user-plus me-2"></i>
                                        Crear mi cuenta gratis
                                    </Link>
                                    <Link to="publish" className="btn btn-outline-light rounded-pill px-4 fw-600" style={{ border: '1px solid var(--glass-border)' }}>
                                        Resolver duda ahora
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 pt-4">
                            <div className="glass-card p-2 mx-auto" style={{ maxWidth: '900px' }}>
                                <img
                                    src="https://st2.depositphotos.com/3662505/6878/i/450/depositphotos_68789193-stock-photo-students.jpg"
                                    alt="Estudiantes exitosos"
                                    className="img-fluid rounded-4 shadow-lg w-100"
                                    style={{ objectFit: 'cover', height: '400px' }}
                                />
                            </div>
                        </div>
                    </div>
                </header>

                {/* How It Works Section */}
                <section className="section-padding">
                    <div className="container text-center">
                        <h2 className="mb-2 h1">El camino al <span className="text-gradient">éxito</span></h2>
                        <p className="text-white mb-5">Resolver tus dudas nunca fue tan fácil y rápido</p>

                        <div className="row g-4 mt-2">
                            {[
                                { icon: "fa-paper-plane", title: "1. Escribe tu duda", desc: "Cuéntanos qué necesitas saber o resolver." },
                                { icon: "fa-envelope", title: "2. Recibe una respuesta", desc: "Nuestros tutores te enviarán la solución por video o escrito." },
                                { icon: "fa-thumbs-up", title: "3. Prepárate con confianza", desc: "Obtén claridad y mejora tus resultados en la PAES." }
                            ].map((step, i) => (
                                <div className="col-md-4" key={i}>
                                    <div className="glass-card p-5 h-100 transition-hover">
                                        <div className="mb-4 d-inline-flex p-4 rounded-circle" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                                            <i className={`fa-regular ${step.icon} fs-1`}></i>
                                        </div>
                                        <h4 className="mb-3 text-white">{step.title}</h4>
                                        <p className="text-white opacity-75 mb-0">{step.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="section-padding" style={{ background: 'rgba(30, 41, 59, 0.4)' }}>
                    <div className="container">
                        <div className="text-center mb-5">
                            <h2 className="h1">Por qué elegir <span className="text-gradient">Tengo una Duda</span></h2>
                        </div>
                        <div className="row g-4 text-center">
                            {[
                                { icon: "fa-people-group", title: "Acceso rápido", desc: "Expertos listos para ayudarte en tiempo récord." },
                                { icon: "fa-bullseye", title: "Enfocado en PAES", desc: "Todo el material alineado con las pruebas oficiales." },
                                { icon: "fa-person-rays", title: "Atención exclusiva", desc: "Resolución personalizada a tu ritmo de estudio." },
                                { icon: "fa-gratipay", title: "Primera gratis", desc: "Empieza hoy sin costo y comprueba la calidad." }
                            ].map((benefit, i) => (
                                <div className="col-md-3" key={i}>
                                    <div className="p-4 rounded-4 h-100" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                                        <div className="mb-3 text-gradient">
                                            <i className={`fa-solid ${benefit.icon} fs-2`}></i>
                                        </div>
                                        <h5 className="mb-2 text-white">{benefit.title}</h5>
                                        <p className="text-white opacity-75 small mb-0">{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <footer className="section-padding text-center">
                    <div className="container">
                        <div className="glass-card p-5 py-5 position-relative overflow-hidden">
                            <div className="position-absolute translate-middle top-0 start-50 w-100 h-100 opacity-10" style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)', zIndex: 0 }}></div>
                            <div className="position-relative" style={{ zIndex: 1 }}>
                                <h2 className="display-5 mb-4 text-white">¿Listo para mejorar tus puntos?</h2>
                                <p className="lead mb-5 text-white opacity-75">No dejes que una duda te frene. Consulta ahora mismo.</p>
                                <div className="d-flex flex-column align-items-center gap-3">
                                    <Link to="publish" className="btn-premium btn-lg px-5">
                                        Publicar mi primera duda gratis
                                    </Link>
                                    <Link to="dudas" className="text-white opacity-75 text-decoration-none mt-3 hover-opacity-100">
                                        <i className="fa-solid fa-user-graduate me-2"></i>
                                        Acceso para Tutores
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </AppLayout>
    );
};



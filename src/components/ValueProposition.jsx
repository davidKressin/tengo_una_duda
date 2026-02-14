import React from 'react';
import { DifficultyChart } from './DifficultyChart';

export const ValueProposition = () => {
    return (
        <section className="section-padding overflow-hidden">
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div className="pe-lg-4">
                            <h2 className="display-5 mb-4 text-white">
                                Supera la <span className="text-gradient">Ley de Rendimiento Decreciente</span>
                            </h2>
                            <p className="lead text-white opacity-75 mb-4">
                                A medida que mejoras tu puntaje, cada punto adicional requiere exponencialmente más esfuerzo. Es la realidad de las pruebas de alto rendimiento como la PAES.
                            </p>
                            <div className="glass-card p-4 mb-4 border-start border-4 border-primary">
                                <h5 className="text-white mb-2">Nuestra Propuesta</h5>
                                <p className="text-white opacity-75 mb-0">
                                    En <strong>Tengo una duda</strong>, optimizamos tu tiempo de estudio atacando directamente los puntos ciegos que te impiden saltar de los 700 a los 900+ puntos.
                                </p>
                            </div>
                            <ul className="list-unstyled text-white opacity-75 mb-0">
                                <li className="mb-3 d-flex align-items-center">
                                    <i className="fa-solid fa-circle-check text-primary me-3"></i>
                                    Estrategias específicas para preguntas de alta dificultad.
                                </li>
                                <li className="mb-3 d-flex align-items-center">
                                    <i className="fa-solid fa-circle-check text-primary me-3"></i>
                                    Tutoría personalizada donde más te cuesta.
                                </li>
                                <li className="d-flex align-items-center">
                                    <i className="fa-solid fa-circle-check text-primary me-3"></i>
                                    Material enfocado en el "salto final" de puntaje.
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="glass-card p-5 position-relative">
                            <div className="position-absolute top-0 start-0 w-100 h-100 opacity-5" style={{ background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}></div>
                            <div className="position-relative">
                                <div className="text-center mb-4">
                                    <h4 className="text-white">Curva de Dificultad PAES</h4>
                                    <p className="small text-white opacity-50">Dificultad vs. Puntaje</p>
                                </div>
                                <div className="px-4 pb-4">
                                    <DifficultyChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

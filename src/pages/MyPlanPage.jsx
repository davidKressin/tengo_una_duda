import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';

export const MyPlanPage = () => {
    const { currentUser, userProfile, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    const testNames = {
        m1: 'Matemática 1 (M1)',
        m2: 'Matemática 2 (M2)',
        lenguaje: 'Competencia Lectora',
        ciencias: 'Ciencias',
        historia: 'Historia'
    };

    const selectedTests = userProfile?.tests || [];
    const studentName = userProfile?.name || currentUser?.displayName || '';

    // State for the active test tab
    const [activeTest, setActiveTest] = useState('');

    // Set initial active test when userProfile loads
    useEffect(() => {
        if (selectedTests.length > 0 && !activeTest) {
            setActiveTest(selectedTests[0]);
        }
    }, [selectedTests, activeTest]);

    // Function to generate roadmap items for a specific test
    const getRoadmapForTest = (testId) => {
        const name = testNames[testId] || testId;
        return [
            {
                title: `Diagnóstico ${name}`,
                description: `Define tu nivel base para ${name}.`,
                status: 'pending',
                icon: 'fa-clipboard-check',
                type: 'milestone'
            },
            {
                title: `Sesión de Nivelación`,
                description: `Repasa los conceptos clave iniciales de ${name}.`,
                status: 'locked',
                icon: 'fa-chalkboard-user',
                type: 'session'
            },
            {
                title: `Ensayo ${name} #1`,
                description: `Primer simulacro oficial de ${name}.`,
                status: 'locked',
                icon: 'fa-file-signature',
                type: 'test'
            }
        ];
    };

    // Mock weekly sessions
    const scheduledSessions = [
        // { day: 'Lunes', time: '16:00', title: 'Repaso Matemática M1', tutor: 'Diego' },
        // { day: 'Miércoles', time: '17:30', title: 'Taller de Comprensión', tutor: 'Sofía' },
    ];

    const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

    return (
        <AppLayout>
            <div className='section-padding min-vh-100 position-relative overflow-hidden'>
                <div className="hero-glow"></div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="d-flex justify-content-between align-items-end mb-5">
                                <div>
                                    <h2 className="display-6 fw-bold text-gradient mb-2">Mi Programación</h2>
                                    <p className="text-white opacity-75 mb-0">Tu hoja de ruta para la PAES, {studentName}.</p>
                                </div>
                                <div className="d-flex gap-2">
                                    <button className="btn btn-primary rounded-pill px-4 shadow-lg border-0" style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }} onClick={() => alert('¡Próximamente! Podrás elegir tu tutor y horario preferido.')}>
                                        <i className="fa-solid fa-calendar-plus me-2"></i>
                                        Agendar Sesión
                                    </button>
                                    <button className="btn btn-outline-light rounded-pill px-4" onClick={() => navigate('/upload-exams')}>
                                        <i className="fa-solid fa-cloud-arrow-up me-2"></i>
                                        Subir Ensayos
                                    </button>
                                    <button className="btn btn-outline-light rounded-pill px-4" onClick={() => navigate('/profile')}>
                                        <i className="fa-solid fa-user me-2"></i>
                                        Mi Perfil
                                    </button>
                                </div>
                            </div>

                            {/* Weekly Calendar Section */}
                            <div className="mb-5">
                                <h4 className="text-white mb-4 d-flex align-items-center">
                                    <i className="fa-solid fa-calendar-week me-3 text-primary"></i>
                                    Esta Semana
                                </h4>
                                <div className="row g-2">
                                    {weekDays.map(day => {
                                        const sessions = scheduledSessions.filter(s => s.day === day);
                                        return (
                                            <div key={day} className="col">
                                                <div className="glass-card p-3 h-100 text-center" style={{ minHeight: '120px', background: 'rgba(255, 255, 255, 0.03)' }}>
                                                    <small className="text-white opacity-50 d-block mb-3 fw-bold">{day.substring(0, 3).toUpperCase()}</small>
                                                    {sessions.length > 0 ? (
                                                        sessions.map((s, i) => (
                                                            <div
                                                                key={i}
                                                                className="p-2 rounded-3 mb-2 cursor-pointer transition-hover"
                                                                style={{
                                                                    background: 'rgba(99, 102, 241, 0.2)',
                                                                    border: '1px solid rgba(99, 102, 241, 0.3)',
                                                                    cursor: 'pointer'
                                                                }}
                                                                onClick={() => navigate(`/study-session/${i + 1}`)}
                                                            >
                                                                <div className="text-primary fw-bold small" style={{ fontSize: '10px' }}>{s.time}</div>
                                                                <div className="text-white fw-600" style={{ fontSize: '11px' }}>{s.title}</div>
                                                                <div className="text-white opacity-50" style={{ fontSize: '9px' }}>con {s.tutor}</div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="d-flex align-items-center justify-content-center h-50">
                                                            <i className="fa-solid fa-minus text-white opacity-10"></i>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="glass-card p-4 mb-5 border-primary border-opacity-25" style={{ background: 'rgba(99, 102, 241, 0.05)' }}>
                                <div className="d-flex align-items-center gap-4">
                                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle text-primary">
                                        <i className="fa-solid fa-lightbulb fs-3"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h5 className="text-white mb-1">¡Mejora tu plan personalizado!</h5>
                                        <p className="text-white opacity-75 small mb-0">Adjunta fotos de tus ensayos anteriores para que nuestros tutores analicen tus debilidades específicas.</p>
                                    </div>
                                    <button className="btn btn-sm btn-outline-primary rounded-pill px-4" onClick={() => navigate('/upload-exams')}>
                                        Adjuntar ahora
                                    </button>
                                </div>
                            </div>

                            {/* Test Navigation Tabs */}
                            {selectedTests.length > 0 && (
                                <div className="mb-5">
                                    <div className="d-flex flex-wrap gap-2 justify-content-center p-2 glass-card rounded-pill" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                                        {selectedTests.map(testId => (
                                            <button
                                                key={testId}
                                                className={`btn rounded-pill px-4 py-2 transition-all ${activeTest === testId ? 'btn-primary shadow-lg' : 'text-white opacity-50 hover-opacity-100'}`}
                                                style={{ border: 'none', background: activeTest === testId ? 'linear-gradient(135deg, var(--primary), var(--secondary))' : 'transparent' }}
                                                onClick={() => setActiveTest(testId)}
                                            >
                                                {testNames[testId] || testId.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTest && (
                                <div className="mb-5 animate-fade-in">
                                    <h4 className="text-white mb-4 d-flex align-items-center">
                                        <i className="fa-solid fa-route me-3 text-primary"></i>
                                        Plan de Estudio: {testNames[activeTest] || activeTest.toUpperCase()}
                                    </h4>

                                    <div className="roadmap-container position-relative py-4">
                                        {/* Vertical Line */}
                                        <div className="position-absolute start-50 translate-middle-x h-100 bg-secondary opacity-25" style={{ width: '2px', top: 0, zIndex: 0 }}></div>

                                        {getRoadmapForTest(activeTest).map((item, index) => (
                                            <div key={index} className={`row mb-5 align-items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`} style={{ position: 'relative', zIndex: 1 }}>
                                                {/* Content Card */}
                                                <div className="col-md-5">
                                                    <div className={`glass-card p-4 transition-hover ${item.status === 'pending' ? 'border-primary' : ''}`} style={{ border: item.status === 'pending' ? '1px solid var(--primary)' : '1px solid var(--glass-border)' }}>
                                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                                            <span className={`badge rounded-pill px-3 py-2 small ${item.status === 'pending' ? 'bg-primary' : 'bg-secondary opacity-50'}`}>
                                                                {item.status === 'pending' ? 'Próximo' : 'Bloqueado'}
                                                            </span>
                                                            <i className={`fa-solid ${item.icon} fs-4 ${item.status === 'pending' ? 'text-primary' : 'text-white opacity-25'}`}></i>
                                                        </div>
                                                        <h4 className="text-white mb-2">{item.title}</h4>
                                                        <p className="text-white opacity-75 small mb-0">{item.description}</p>
                                                        {item.status === 'pending' && (
                                                            <button
                                                                className="btn btn-sm btn-primary mt-3 w-100 rounded-pill"
                                                                onClick={() => item.type === 'milestone' && item.title.includes('Diagnóstico') ? navigate(`/diagnostic/${activeTest}`) : null}
                                                            >
                                                                Comenzar ahora
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Dot on the line */}
                                                <div className="col-md-2 d-flex justify-content-center">
                                                    <div className={`rounded-circle shadow-lg d-flex align-items-center justify-content-center ${item.status === 'pending' ? 'bg-primary' : 'bg-dark border border-secondary'}`} style={{ width: '40px', height: '40px', zIndex: 2 }}>
                                                        <div className="bg-white rounded-circle" style={{ width: '12px', height: '12px' }}></div>
                                                    </div>
                                                </div>

                                                {/* Spacer for the other side */}
                                                <div className="col-md-5"></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {selectedTests.length === 0 && (
                                <div className="glass-card p-5 text-center mt-5">
                                    <i className="fa-solid fa-triangle-exclamation display-4 text-warning mb-4"></i>
                                    <h3 className="text-white">Parece que no has seleccionado tus pruebas</h3>
                                    <p className="text-white opacity-75 mb-4">Para generar tu plan personalizado, necesitamos saber qué pruebas vas a rendir.</p>
                                    <button className="btn-premium px-5" onClick={() => navigate('/onboarding')}>
                                        Configurar mi Plan
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

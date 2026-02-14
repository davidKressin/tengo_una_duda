import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import { saveUserProfile } from '../services/userService';
import careers from '../db/careers.json';

export const StudentOnboardingPage = () => {
    const { currentUser } = useAuth();
    const [step, setStep] = useState(1);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: currentUser?.displayName || '',
        email: currentUser?.email || '',
        career: localStorage.getItem('studentCareer') || '',
        university: localStorage.getItem('studentUniversity') || '',
        tests: JSON.parse(localStorage.getItem('studentTests') || '[]')
    });
    const navigate = useNavigate();

    const testOptions = [
        { id: 'm1', name: 'Competencia Matemática 1 (M1)' },
        { id: 'm2', name: 'Competencia Matemática 2 (M2)' },
        { id: 'lenguaje', name: 'Competencia Lectora' },
        { id: 'ciencias', name: 'Ciencias' },
        { id: 'historia', name: 'Historia y Ciencias Sociales' }
    ];

    // Update formData if currentUser changes (e.g. on mount/refresh)
    useEffect(() => {
        if (currentUser) {
            setFormData(prev => ({
                ...prev,
                name: prev.name || currentUser.displayName || '',
                email: prev.email || currentUser.email || ''
            }));
        }
    }, [currentUser]);

    const handleNext = () => setStep(step + 1);
    const handleBack = () => setStep(step - 1);

    const handleTestToggle = (testId) => {
        setFormData(prev => ({
            ...prev,
            tests: prev.tests.includes(testId)
                ? prev.tests.filter(id => id !== testId)
                : [...prev.tests, testId]
        }));
    };

    const handleFinish = async () => {
        if (!currentUser) return;

        setIsSaving(true);
        try {
            // Save to Firebase
            await saveUserProfile(currentUser.uid, {
                name: formData.name,
                email: formData.email,
                career: formData.career,
                university: formData.university,
                tests: formData.tests,
                onboardingCompleted: true
            });

            // Save to localStorage as backup/cache
            localStorage.setItem('studentCareer', formData.career);
            localStorage.setItem('studentUniversity', formData.university);
            localStorage.setItem('studentTests', JSON.stringify(formData.tests));
            localStorage.setItem('onboardingCompleted', 'true');

            navigate('/profile');
        } catch (error) {
            console.error("Error finishing onboarding:", error);
            alert("Hubo un error al guardar tu perfil. Por favor intenta de nuevo.");
        } finally {
            setIsSaving(false);
        }
    };

    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="onboarding-step">
                        <h3 className="text-white mb-4">Información Básica</h3>
                        <div className="mb-3">
                            <label className="form-label text-white opacity-75">Nombre Completo</label>
                            <input
                                type="text"
                                className="form-control bg-dark border-secondary text-white p-3 rounded-3"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-white opacity-75">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control bg-dark border-secondary text-white p-3 rounded-3"
                                value={formData.email}
                                disabled
                            />
                        </div>
                        <button className="btn-premium w-100 py-3" onClick={handleNext}>Continuar</button>
                    </div>
                );
            case 2:
                return (
                    <div className="onboarding-step">
                        <h3 className="text-white mb-4">Tu Objetivo PAES</h3>
                        <div className="mb-3">
                            <label className="form-label text-white opacity-75">¿Qué carrera quieres estudiar?</label>
                            <select
                                className="form-select bg-dark border-secondary text-white p-3 rounded-3"
                                value={formData.career}
                                onChange={(e) => setFormData({ ...formData, career: e.target.value, university: '' })}
                            >
                                <option value="">Selecciona una carrera</option>
                                {careers.map(career => (
                                    <option key={career.id} value={career.nombre}>
                                        {career.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="form-label text-white opacity-75">¿En qué universidad?</label>
                            <select
                                className="form-select bg-dark border-secondary text-white p-3 rounded-3"
                                value={formData.university}
                                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                                disabled={!formData.career}
                            >
                                <option value="">{formData.career ? 'Selecciona una universidad' : 'Primero elige una carrera'}</option>
                                {formData.career && careers.find(c => c.nombre === formData.career)?.universidades.map((uni, idx) => (
                                    <option key={idx} value={uni.nombre}>
                                        {uni.nombre} ({uni.puntaje_corte} pts)
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-light rounded-pill px-4" onClick={handleBack}>Atrás</button>
                            <button className="btn-premium flex-grow-1" onClick={handleNext}>Continuar</button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="onboarding-step">
                        <h3 className="text-white mb-4">Tus Pruebas</h3>
                        <p className="text-white opacity-75 mb-4">Selecciona las pruebas que vas a rendir:</p>
                        <div className="d-flex flex-column gap-2 mb-4">
                            {testOptions.map(test => (
                                <div
                                    key={test.id}
                                    className={`glass-card p-3 cursor-pointer transition-hover d-flex align-items-center ${formData.tests.includes(test.id) ? 'border-primary' : ''}`}
                                    onClick={() => handleTestToggle(test.id)}
                                    style={{ cursor: 'pointer', border: formData.tests.includes(test.id) ? '1px solid var(--primary)' : '1px solid var(--glass-border)' }}
                                >
                                    <div className={`me-3 rounded-circle d-flex align-items-center justify-content-center ${formData.tests.includes(test.id) ? 'bg-primary text-white' : 'bg-secondary text-white opacity-25'}`} style={{ width: '24px', height: '24px' }}>
                                        {formData.tests.includes(test.id) && <i className="fa-solid fa-check small"></i>}
                                    </div>
                                    <span className="text-white">{test.name}</span>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex gap-3">
                            <button className="btn btn-outline-light rounded-pill px-4" onClick={handleBack}>Atrás</button>
                            <button className="btn-premium flex-grow-1" onClick={handleNext}>Continuar</button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="onboarding-step text-center">
                        <div className="mb-4 text-primary">
                            <i className="fa-solid fa-chart-line display-1"></i>
                        </div>
                        <h2 className="text-white mb-3">¡Casi listo!</h2>
                        <p className="text-white fs-5 mb-5">
                            Necesitamos saber el nivel en el que estás.<br />
                            <span className="text-gradient fw-bold">Haz nuestro diagnóstico</span>
                        </p>
                        <button
                            className="btn-premium w-100 py-3 mb-3"
                            onClick={handleFinish}
                            disabled={isSaving}
                        >
                            {isSaving ? 'Guardando...' : 'Empezar Diagnóstico'}
                        </button>
                        <button
                            className="btn btn-link text-white opacity-50 text-decoration-none"
                            onClick={handleFinish}
                            disabled={isSaving}
                        >
                            Lo haré más tarde
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <AppLayout>
            <div className='section-padding min-vh-100 d-flex align-items-center position-relative overflow-hidden'>
                <div className="hero-glow"></div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            {/* Progres Bar */}
                            {step < 4 && (
                                <div className="mb-5">
                                    <div className="d-flex justify-content-between text-white small opacity-75 mb-2">
                                        <span>Paso {step} de 3</span>
                                        <span>{Math.round((step / 3) * 100)}%</span>
                                    </div>
                                    <div className="progress bg-dark" style={{ height: '6px', borderRadius: '10px' }}>
                                        <div
                                            className="progress-bar bg-primary"
                                            role="progressbar"
                                            style={{ width: `${(step / 3) * 100}%`, borderRadius: '10px' }}
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="glass-card p-4 p-md-5">
                                {renderStep()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

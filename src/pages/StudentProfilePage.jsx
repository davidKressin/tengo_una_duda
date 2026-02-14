import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';

import { getUserProfile } from '../services/userService';

export const StudentProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (currentUser) {
                try {
                    const data = await getUserProfile(currentUser.uid);
                    setProfileData(data);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [currentUser]);

    const name = profileData?.name || currentUser?.displayName || 'Usuario';
    const email = profileData?.email || currentUser?.email || '';

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('studentCareer');
            localStorage.removeItem('studentUniversity');
            localStorage.removeItem('studentTests');
            localStorage.removeItem('onboardingCompleted');
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) {
        return (
            <AppLayout>
                <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className='section-padding min-vh-100 position-relative overflow-hidden'>
                <div className="hero-glow"></div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <div className="glass-card p-4 p-md-5">
                                <div className="text-center mb-5">
                                    <div className="profile-avatar mb-4 mx-auto">
                                        <div className="d-flex align-items-center justify-content-center h-100 bg-primary text-white fs-1 rounded-circle" style={{ width: '100px', height: '100px', margin: '0 auto' }}>
                                            {name.charAt(0).toUpperCase()}
                                        </div>
                                    </div>
                                    <h2 className="display-6 fw-bold text-gradient">{name}</h2>
                                    <p className="text-white opacity-75">{email}</p>
                                </div>

                                <div className="student-info mt-4">
                                    <div className="mb-4">
                                        <h5 className="text-white border-bottom border-secondary pb-2 mb-3">Información Académica</h5>
                                        <div className="row g-3">
                                            <div className="col-6">
                                                <small className="text-white opacity-50 d-block">Carrera Objetivo</small>
                                                <span className="text-white">{profileData?.career || 'No definida'}</span>
                                            </div>
                                            <div className="col-6">
                                                <small className="text-white opacity-50 d-block">Universidad</small>
                                                <span className="text-white">{profileData?.university || 'No definida'}</span>
                                            </div>
                                            <div className="col-12 mt-3">
                                                <small className="text-white opacity-50 d-block mb-2">Pruebas a Rendir</small>
                                                <div className="d-flex flex-wrap gap-2">
                                                    {(profileData?.tests || []).map(test => (
                                                        <span key={test} className="badge bg-primary-soft text-primary rounded-pill border border-primary border-opacity-25 px-3 py-2">
                                                            {test.toUpperCase()}
                                                        </span>
                                                    ))}
                                                    {(profileData?.tests || []).length === 0 && (
                                                        <span className="text-white opacity-50 small">Ninguna seleccionada</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-grid gap-3 mt-5">
                                        <button className="btn btn-primary py-3 rounded-pill shadow-lg mb-2" onClick={() => navigate('/my-plan')}>
                                            <i className="fa-solid fa-calendar-check me-2"></i>
                                            Ver Mi Programación
                                        </button>
                                        <button className="btn btn-outline-light rounded-pill" onClick={() => navigate('/upload-exams')}>
                                            <i className="fa-solid fa-cloud-arrow-up me-2"></i>
                                            Adjuntar Ensayos Previos
                                        </button>
                                        <button className="btn btn-outline-light rounded-pill" onClick={() => navigate('/my-doubts')}>
                                            <i className="fa-solid fa-list-check me-2"></i>
                                            Ver mis dudas hechas
                                        </button>
                                        <button className="btn btn-danger btn-sm opacity-75 hover-opacity-100 rounded-pill mt-3" onClick={handleLogout}>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

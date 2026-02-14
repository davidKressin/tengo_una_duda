import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const AuthGuard = ({ children }) => {
    const { currentUser, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-vh-100 d-flex align-items-center justify-content-center bg-dark">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }

    if (!currentUser) {
        // Redirigir al login si no está autenticado, guardando la ubicación actual
        return <Navigate to="/login-student" state={{ from: location }} replace />;
    }

    return children;
};

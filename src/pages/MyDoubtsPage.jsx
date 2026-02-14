import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { database } from '../firebaseConfig';
import { AppLayout } from '../layouts/AppLayout';

export const MyDoubtsPage = () => {
    const [doubts, setDoubts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = localStorage.getItem('studentEmail');
        if (!storedEmail) {
            navigate('/login-student');
        } else {
            setEmail(storedEmail);

            const doubtsRef = ref(database, 'dudas');
            const unsubscribe = onValue(doubtsRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const doubtsList = Object.keys(data).map(key => ({
                        id: key,
                        ...data[key]
                    })).filter(duda => duda.email === storedEmail);
                    setDoubts(doubtsList);
                } else {
                    setDoubts([]);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }
    }, [navigate]);

    return (
        <AppLayout>
            <div className='section-padding min-vh-100 position-relative overflow-hidden'>
                <div className="hero-glow"></div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="display-6 fw-bold text-gradient mb-0">Mis Dudas</h2>
                                <button className="btn btn-outline-light rounded-pill" onClick={() => navigate('/profile')}>
                                    <i className="fa-solid fa-user me-2"></i>
                                    Mi Perfil
                                </button>
                            </div>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Cargando...</span>
                                    </div>
                                </div>
                            ) : doubts.length > 0 ? (
                                <div className="row g-4">
                                    {doubts.map((duda) => (
                                        <div className="col-md-6 col-xl-4" key={duda.id}>
                                            <div className="glass-card h-100 p-4 transition-hover d-flex flex-column">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <span className="badge bg-primary-soft text-primary px-3 py-2 rounded-pill small">
                                                        {duda.materia}
                                                    </span>
                                                    <span className={`badge px-3 py-2 rounded-pill small ${duda.solved ? 'bg-success' : 'bg-warning text-dark'}`}>
                                                        {duda.solved ? 'Resuelta' : 'Pendiente'}
                                                    </span>
                                                </div>
                                                <h5 className="text-white mb-2">{duda.titulo}</h5>
                                                <div className="text-white opacity-75 small mb-3 flex-grow-1" dangerouslySetInnerHTML={{ __html: duda.duda.substring(0, 100) + '...' }}></div>
                                                <div className="mt-auto pt-3 border-top border-secondary d-flex justify-content-between align-items-center">
                                                    <span className="text-white opacity-50 small">
                                                        <i className="fa-regular fa-calendar me-1"></i>
                                                        {duda.date || 'Reciente'}
                                                    </span>
                                                    <button className="btn btn-link text-primary p-0 text-decoration-none fw-bold">
                                                        Ver detalle
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card p-5 text-center">
                                    <div className="mb-4 text-primary opacity-50">
                                        <i className="fa-regular fa-folder-open display-1"></i>
                                    </div>
                                    <h3 className="text-white">Aún no tienes dudas publicadas</h3>
                                    <p className="text-white opacity-75 mb-4">¿Te ha surgido algún problema estudiando para la PAES? ¡Nosotros te ayudamos!</p>
                                    <button className="btn-premium px-5" onClick={() => navigate('/publish')}>
                                        Publicar mi primera duda
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

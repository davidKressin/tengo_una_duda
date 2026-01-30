import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { useParams, Link } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { AppLayout } from "../layouts/AppLayout";

export const DudaPage = () => {
    const { id } = useParams();
    const [dudaData, setDudaData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDudas = async () => {
            try {
                const dudasRef = ref(db, `dudas/${id}`);
                onValue(dudasRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setDudaData(data);
                    } else {
                        setDudaData(null);
                    }
                    setLoading(false);
                });
            } catch (e) {
                console.error("Error:", e);
                setLoading(false);
            }
        };
        fetchDudas();
    }, [id]);

    if (loading) {
        return (
            <AppLayout>
                <div className="section-padding text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (!dudaData) {
        return (
            <AppLayout>
                <div className="section-padding text-center">
                    <h3 className="text-white">Duda no encontrada</h3>
                    <Link to="/dudas" className="btn btn-outline-light mt-3 rounded-pill px-4">Volver al listado</Link>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <div className="section-padding min-vh-100 position-relative overflow-hidden">
                <div className="hero-glow"></div>
                <div className="container mt-5">
                    <div className="mb-4">
                        <Link to="/dudas" className="text-white text-decoration-none small">
                            <i className="fa-solid fa-arrow-left me-2"></i> Volver al panel
                        </Link>
                    </div>

                    <div className="glass-card p-4 p-md-5 mb-4">
                        <div className="row">
                            <div className="col-lg-8">
                                <span className="badge bg-primary bg-opacity-10 text-primary mb-3">{dudaData.materia}</span>
                                <h1 className="display-5 fw-bold text-white mb-4">{dudaData.titulo}</h1>

                                <div className="p-4 rounded-4 text-white" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)' }}>
                                    <h5 className="text-white mb-3 small text-uppercase fw-bold">Descripción de la duda</h5>
                                    <div
                                        className="duda-content"
                                        dangerouslySetInnerHTML={{ __html: dudaData.duda }}
                                    ></div>
                                </div>
                            </div>

                            <div className="col-lg-4 mt-4 mt-lg-0">
                                <div className="glass-card p-4 h-100" style={{ background: 'rgba(255, 255, 255, 0.03)' }}>
                                    <h5 className="text-white mb-4 fw-bold">Resumen de la duda</h5>

                                    <div className="mb-4">
                                        <label className="text-white small d-block mb-1">Recompensa</label>
                                        <span className="fs-4 fw-bold text-secondary">
                                            {dudaData.recompensa > 0 ? `$${dudaData.recompensa.toLocaleString()}` : "Gratis"}
                                        </span>
                                    </div>

                                    <div className="mb-4">
                                        <label className="text-white small d-block mb-1">Método preferido</label>
                                        <span className="text-white">
                                            <i className={`fa-solid ${dudaData.metodo === 'Video' ? 'fa-video' : 'fa-pen'} me-2`}></i>
                                            {dudaData.metodo}
                                        </span>
                                    </div>

                                    <hr className="opacity-10 my-4" />

                                    <h6 className="text-white mb-3 small text-uppercase">Estudiante</h6>
                                    <div className="d-flex align-items-center">
                                        <div className="p-2 rounded-circle bg-primary bg-opacity-10 text-primary me-3">
                                            <i className="fa-solid fa-user"></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold text-white">{dudaData.name}</div>
                                            <div className="small text-white">{dudaData.email}</div>
                                        </div>
                                    </div>

                                    <div className="mt-5">
                                        <button className="btn-premium w-100 py-3">
                                            Enviar Respuesta
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

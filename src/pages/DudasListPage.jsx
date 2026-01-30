import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseConfig";
import { onValue, ref } from "firebase/database";
import { AppLayout } from "../layouts/AppLayout";

export const DudasListPage = () => {
    const [dudas, setDudas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDudas = async () => {
            try {
                const dudasRef = ref(db, "dudas");
                onValue(dudasRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const dudasArray = Object.keys(data).map((key) => ({
                            id: key,
                            ...data[key],
                        }));
                        setDudas(dudasArray);
                    } else {
                        setDudas([]);
                    }
                    setLoading(false);
                });
            } catch (e) {
                console.error("Error al obtener las dudas:", e);
                setError("Error al cargar las dudas.");
                setLoading(false);
            }
        };
        fetchDudas();
    }, []);

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

    return (
        <AppLayout>
            <div className="section-padding min-vh-100 position-relative overflow-hidden">
                <div className="hero-glow"></div>
                <div className="container mt-5">
                    <div className="row mb-5 align-items-center">
                        <div className="col-md-8">
                            <h1 className="display-5 fw-bold text-white mb-2">Panel de Control <span className="text-gradient">Dudas</span></h1>
                            <p className="text-white">Gestiona y responde las consultas de los estudiantes.</p>
                        </div>
                    </div>

                    <div className="glass-card overflow-hidden">
                        <div className="table-responsive">
                            <table className="table table-dark table-hover mb-0">
                                <thead className="bg-surface">
                                    <tr>
                                        <th className="px-4 py-3 border-0">Estudiante / ID</th>
                                        <th className="py-3 border-0">Título</th>
                                        <th className="py-3 border-0">Materia / Método</th>
                                        <th className="py-3 border-0">Recompensa</th>
                                        <th className="px-4 py-3 border-0 text-end">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dudas.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="text-center py-5 text-white">No hay dudas publicadas aún.</td>
                                        </tr>
                                    ) : (
                                        dudas.map((duda) => (
                                            <tr key={duda.id} className="align-middle">
                                                <td className="px-4 py-3 border-bottom border-light border-opacity-10">
                                                    <div className="d-flex flex-column">
                                                        <span className="fw-bold text-white">{duda.name || "Anónimo"}</span>
                                                        <span className="small text-white">{duda.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-3 border-bottom border-light border-opacity-10">
                                                    <span className="text-white">{duda.titulo}</span>
                                                </td>
                                                <td className="py-3 border-bottom border-light border-opacity-10">
                                                    <div className="d-flex flex-column">
                                                        <span className="badge bg-primary bg-opacity-10 text-primary w-fit mb-1" style={{ width: 'fit-content' }}>{duda.materia}</span>
                                                        <small className="text-white">
                                                            <i className={`fa-solid ${duda.metodo === 'Video' ? 'fa-video' : 'fa-pen'} me-1`}></i>
                                                            {duda.metodo}
                                                        </small>
                                                    </div>
                                                </td>
                                                <td className="py-3 border-bottom border-light border-opacity-10">
                                                    <span className="fw-bold text-secondary">
                                                        {duda.recompensa > 0 ? `$${duda.recompensa.toLocaleString()}` : "Gratis"}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 border-bottom border-light border-opacity-10 text-end">
                                                    <Link
                                                        to={`/dudas/${duda.id}`}
                                                        className="btn btn-outline-light btn-sm rounded-pill px-3"
                                                    >
                                                        Responder <i className="fa-solid fa-chevron-right ms-1"></i>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

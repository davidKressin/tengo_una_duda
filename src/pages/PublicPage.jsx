import React, { useState, useRef, useEffect } from 'react';
import { ref, set, push } from "firebase/database";
import { database as db } from '../firebaseConfig';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formValidation } from '../utils/formValidation';
import { Modal } from '../components/Modal';
import { useLocation } from 'react-router-dom';
import { paidMode } from "../config/productionMode";
import { writeDudaData } from '../utils/firebaseUtils';
import { subjects } from "../db/subjects.json";
import { AppLayout } from '../layouts/AppLayout';

export const PublicPage = () => {
    const [content, setContent] = useState('');
    const [materia, setMateria] = useState('Matemáticas');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [metodo, setMetodo] = useState('Video');
    const [errors, setErrors] = useState({});
    const [hasBeensent, setHasBeensent] = useState(false);
    const [paid, setPaid] = useState(false);

    const recompensaValue = paidMode ? 1000 : 0;
    const quillRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const enviado = params.get("enviado");
        if (enviado === "true") {
            setHasBeensent(true);
            setPaid(true);
        } else if (enviado === "false") {
            setHasBeensent(true);
        }
    }, [location]);

    const handleChangeContent = (content) => setContent(content);
    const handleChangeMateria = (e) => setMateria(e.target.value);
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangeTitulo = (e) => setTitulo(e.target.value);
    const handleChangeMetodo = (e) => setMetodo(e.target.value);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;
        if (!formValidation('text', titulo)) { tempErrors.titulo = '* El título es requerido'; isValid = false; }
        if (!formValidation('text', name)) { tempErrors.name = '* Tu nombre es requerido'; isValid = false; }
        if (!formValidation('email', email)) { tempErrors.email = '* El email no es válido'; isValid = false; }
        if (!formValidation('text', content)) { tempErrors.content = '* El contenido es requerido'; isValid = false; }
        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = { titulo, duda: content, name, email, materia, metodo, recompensa: recompensaValue, paid };
        if (validateForm()) {
            if (paidMode) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/webpay_plus/create`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                    });
                    const webpayData = await response.json();
                    if (webpayData.url && webpayData.token) {
                        window.location.href = `${webpayData.url}?key=${webpayData.dudaKey}&token_ws=${webpayData.token}`;
                    }
                } catch (error) { console.error("Error:", error); }
            } else {
                await writeDudaData(body, null);
                setHasBeensent(true);
                setTimeout(() => setHasBeensent(false), 5000);
            }
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image"],
        ],
    };

    return (
        <AppLayout>
            <div className='section-padding min-vh-100 position-relative overflow-hidden'>
                <div className="hero-glow"></div>
                <Modal
                    type={paid || !paidMode ? "success" : "danger"}
                    action={""}
                    id="addModal"
                    isOpen={hasBeensent}
                    onClose={() => setHasBeensent(false)}
                    tableName={"Modal"}
                />

                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="glass-card p-4 p-md-5">
                                <div className="text-center mb-5">
                                    <h2 className="display-6 fw-bold text-gradient">Publicar mi duda</h2>
                                    <p className="text-white">Completa los datos para que un tutor pueda ayudarte.</p>
                                </div>

                                <form onSubmit={handleSubmit} className="row g-4">
                                    <div className="col-12">
                                        <label className={`form-label fw-600 ${errors.titulo ? "text-accent" : "text-white"}`}>
                                            Título de la duda {errors.titulo && <span className="small ms-2">({errors.titulo})</span>}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark border-secondary text-white p-3 rounded-3"
                                            style={{ backgroundColor: 'rgba(15, 23, 42, 0.6) !important' }}
                                            placeholder="Ej: Duda con logaritmos en base 10"
                                            value={titulo}
                                            onChange={handleChangeTitulo}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className={`form-label fw-600 ${errors.name ? "text-accent" : "text-white"}`}>
                                            Tu Nombre {errors.name && <span className="small ms-2">({errors.name})</span>}
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control bg-dark border-secondary text-white p-3 rounded-3"
                                            placeholder="Ingresa tu nombre"
                                            value={name}
                                            onChange={handleChangeName}
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label className={`form-label fw-600 ${errors.email ? "text-accent" : "text-white"}`}>
                                            Email {errors.email && <span className="small ms-2">({errors.email})</span>}
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control bg-dark border-secondary text-white p-3 rounded-3"
                                            placeholder="correo@ejemplo.com"
                                            value={email}
                                            onChange={handleChangeEmail}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label className={`form-label fw-600 ${errors.content ? "text-accent" : "text-white"}`}>
                                            Explica tu duda {errors.content && <span className="small ms-2">({errors.content})</span>}
                                        </label>
                                        <div className="bg-white rounded-3 overflow-hidden text-dark">
                                            <ReactQuill
                                                ref={quillRef}
                                                value={content}
                                                onChange={handleChangeContent}
                                                modules={modules}
                                                theme="snow"
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-7">
                                        <label className="form-label fw-600 text-white">Materia</label>
                                        <select
                                            className="form-select bg-dark border-secondary text-white p-3 rounded-3"
                                            value={materia}
                                            onChange={handleChangeMateria}
                                        >
                                            {subjects.map(x => <option key={x} value={x}>{x}</option>)}
                                        </select>
                                    </div>

                                    <div className="col-md-5">
                                        <label className="form-label fw-600 text-white">Método de respuesta</label>
                                        <div className="d-flex gap-2">
                                            <button
                                                type="button"
                                                className={`btn flex-grow-1 p-3 rounded-3 ${metodo === 'Video' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                                                onClick={() => setMetodo('Video')}
                                            >
                                                <i className="fa-solid fa-video me-2"></i> Video
                                            </button>
                                            <button
                                                type="button"
                                                className={`btn flex-grow-1 p-3 rounded-3 ${metodo === 'Escrito' ? 'btn-primary' : 'btn-outline-secondary text-white'}`}
                                                onClick={() => setMetodo('Escrito')}
                                            >
                                                <i className="fa-solid fa-pen-nib me-2"></i> Escrito
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px dashed var(--glass-border)' }}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className="text-white">Costo del servicio:</span>
                                                <span className="fw-bold fs-5 text-white">
                                                    {recompensaValue === 0 ? "¡GRATIS!" : recompensaValue.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-12 mt-4">
                                        <button type="submit" className="btn-premium w-100 py-3 fs-5 shadow-lg">
                                            <i className="fa-solid fa-cloud-arrow-up"></i>
                                            Publicar Duda Ahora
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

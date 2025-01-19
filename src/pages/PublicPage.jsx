import React, { useState, useRef, useEffect } from 'react';
import { ref, set, push } from "firebase/database";
import { database as db } from '../firebaseConfig';
import horizontalLogo from "../assets/horizontalLogo.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formValidation } from '../utils/formValidation';
import { Modal } from '../components/Modal';
import { useLocation } from 'react-router-dom';
import {paidMode} from "../config/productionMode";
import { writeDudaData } from '../utils/firebaseUtils';

import {subjects}  from "../db/subjects.json"

export const PublicPage = () => {
    const [content, setContent] = useState('');
    const [materia, setMateria] = useState('Matemáticas');
    const [email, setEmail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [metodo, setMetodo] = useState('Video');
    const [errors, setErrors] = useState({});
    const [publiced, setPubliced] = useState(false);
    const [hasBeensent, setHasBeensent] = useState(false);
    // const [paidToken, setPaidToken] = useState("");
    const [paid, setPaid] = useState(false);

    const recompensaValue = paidMode ? 1000 : 0;

    const quillRef = useRef(null); // Create ref for ReactQuill

    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const enviado = params.get("enviado");

        if (enviado === "true") {
            console.log("Transacción exitosa");
            setHasBeensent(true);
            setPaid(true);
            // Mostrar un mensaje de éxito al usuario
        } else if (enviado === "false") {
            setHasBeensent(true);
            console.log("Transacción fallida");
            // Mostrar un mensaje de error al usuario
        }
    }, [location]);

    const handleChangeContent = (content) => {
        setContent(content);
        console.log(content);
    };

    const handleChangeMateria = (e) => {
        setMateria(e.target.value);
    };

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleChangeTitulo = (e) => {
        setTitulo(e.target.value);
    };

    const handleChangeMetodo = (e) => {
        setMetodo(e.target.value);
    };

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        if (!formValidation('text', titulo)) {
            tempErrors.titulo = '* El título es requerido';
            isValid = false;
        }

        if (!formValidation('email', email)) {
            tempErrors.email = '* El email no es válido';
            isValid = false;
        }

        if (!formValidation('text', content)) {
            tempErrors.content = '* El contenido de la duda es requerido';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = {
            titulo: titulo,
            duda: content,
            email: email,
            materia: materia,
            metodo: metodo,
            recompensa: recompensaValue,
            paid: paid,
        }

        if (validateForm()) {
            if(paidMode){
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/webpay_plus/create`, {
                        method: "POST", // Cambia a "POST" si tu backend espera POST
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ // Construye el JSON con los parámetros
                            titulo: titulo,
                            duda: content,
                            email: email,
                            materia: materia,
                            metodo: metodo,
                            recompensa: recompensaValue,
                            paid: paid,
                        }),
                    });
    
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.statusText}`);
                    }
    
                    const webpayData = await response.json();
                    console.log("Respuesta de Webpay:", webpayData);
    
                    if (webpayData.url && webpayData.token) {
                        
                        window.location.href = `${webpayData.url}?key=${webpayData.dudaKey}&token_ws=${webpayData.token}`;
                    }
                } catch (error) {
                    console.error("Error al enviar la solicitud:", error);
                }
            }else{
                await writeDudaData(body, null);
                setHasBeensent(true);

                // Después de 5 segundos, se pone hasBeensent en false
                setTimeout(() => {
                    setHasBeensent(false);
                }, 5000); // 5000 milisegundos = 5 segundos
            }
            
        }
        console.log(errors);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
        ],
    };

    return (
        <div className='container-fluid p-0 pt-3' style={{ "background": "#CCCCCC", "minHeight": "100vh" }}>
            <Modal
                type={!!paid ? "success" : (!paidMode) ? "success" : "danger"} //TODO: otro método válido con gratuidad
                action={""}
                id="addModal"
                isOpen={hasBeensent}
                onClose={() => console.log("cerrando")}
                tableName={"Modal"}
            />
            <div className='card card-responsive p-4 col-md-10 mx-auto'>
                <div className="text-center mb-4">
                    <h1 className="font-bold fs-4">Publicar Duda</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="">
                        {!!errors && <p>{errors.email}</p>}
                        {!!errors && <p>{errors.titulo}</p>}
                        {!!errors && <p>{errors.content}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="titulo" className={`form-label ${errors.titulo && "text-danger fw-bolder"}`}>Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="titulo"
                            placeholder="Ingresa el título de tu duda"
                            value={titulo}
                            onChange={handleChangeTitulo}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className={`form-label ${errors.email && "text-danger fw-bolder"}`}>Correo electrónico</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="Ingresa tu email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="duda" className={`form-label ${errors.content && "text-danger fw-bolder"}`}>Duda</label>
                        <ReactQuill
                            ref={quillRef}
                            value={content}
                            onChange={handleChangeContent}
                            modules={modules}
                        />
                    </div>

                    <div className="d-flex flex-row justify-content-start">
                        <div className="mb-3 w-75 mr-4">
                            <label htmlFor="subject">Selecciona una materia:</label>
                            <select
                                id="subject"
                                className="form-control"
                                value={materia}
                                onChange={handleChangeMateria}
                            >
                                {subjects.map(x => <option value={x}>{x}</option>)}
                                {/* <option value="Matemáticas">Matemáticas</option>
                                <option value="Biología">Biología</option>
                                <option value="Química">Química</option>
                                <option value="Física">Física</option>
                                <option value="Historia">Historia</option>
                                <option value="Lenguaje">Lenguaje</option> */}
                            </select>
                        </div>

                        <div className="mb-3 d-flex flex-column">
                            <label htmlFor="subject">Método:</label>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="btnradio1"
                                    value="Video"
                                    onChange={handleChangeMetodo}
                                    autoComplete="off"
                                    defaultChecked
                                />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">Video</label>

                                <input
                                    type="radio"
                                    className="btn-check"
                                    name="btnradio"
                                    id="btnradio2"
                                    value="Escrito"
                                    onChange={handleChangeMetodo}
                                    autoComplete="off"
                                />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2">Escrito</label>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="coins" className="form-label">Recompensa:</label>
                        <input
                            id="coins"
                            type="text"
                            className="form-control"
                            value={recompensaValue.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}
                            readOnly
                        />
                    </div>

                    {publiced
                        ? (<form method='post' action='https://www.webpay.cl/backpub/external/form-pay'>
                            <input type='hidden' name='idFormulario' value='197168' />
                            <input type='hidden' name='monto' value='100' />
                            <input type='image' title='Imagen' name='button1' src='https://www.webpay.cl/assets/img/boton_webpaycl.svg' value='Boton 1' />
                        </form>)
                        : (<button type="submit" className="btn btn-primary w-100">Publicar</button>)
                    }
                </form>
            </div>
        </div>
    );
};

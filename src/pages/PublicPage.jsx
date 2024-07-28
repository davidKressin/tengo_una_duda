// PublicPage.js

import React, { useState } from 'react';
import { ref, set, push } from "firebase/database";
import { database as db } from '../firebaseConfig'; // Ajusta la ruta según donde tengas tu firebaseConfig.js
import horizontalLogo from "../assets/horizontalLogo.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // importar estilos
import { formValidation } from '../utils/formValidation'; // Ajusta la ruta según donde tengas tu formValidation.js

export const PublicPage = () => {
    const [content, setContent] = useState('');
    const [materia, setMateria] = useState('Matemáticas');
    const [email, setEmail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [metodo, setMetodo] = useState('');
    const [errors, setErrors] = useState({});

    const recompensaValue = 1000; // Valor fijo de la recompensa en CLP

    const handleChangeContent = (content) => {
        setContent(content);
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

    function writeDudaData(titulo, duda, email, materia, metodo, recompensa) {
        const newDudaRef = push(ref(db, 'dudas')); // Genera un nuevo ID automáticamente

        set(
            newDudaRef, {
                titulo,
                duda,
                email,
                materia, 
                metodo, 
                recompensa
            }
        );

    }

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


    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            writeDudaData(
                titulo,
                content,
                email,
                materia,
                metodo,
                recompensaValue
            );
        }
        console.log(errors);
    };

    return (
        <div className='container-fluid p-0' style={{ "background": "#CCCCCC", "minHeight": "100vh" }}>
            <div className="row col-md-12 bg-white m-0">
                <div className="image-container m-0 p-0 ">
                    <img src={horizontalLogo} alt="" />
                </div>
            </div>

            <div className='card card-responsive p-4 mt-2 col-md-10 mx-auto'>
                <div className="text-center mb-4">
                    <h4 className="fs-1 font-bold">Publicar Duda</h4>
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
                        <label htmlFor="email" className={`form-label ${errors.email && "text-danger fw-bolder"}`}>email</label>
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
                        <label htmlFor="duda"  className={`form-label ${errors.content && "text-danger fw-bolder"}`}>Duda</label>
                        <ReactQuill value={content} onChange={handleChangeContent} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="subject">Selecciona una materia:</label>
                        <select
                            id="subject"
                            className="form-control"
                            value={materia}
                            onChange={handleChangeMateria}
                        >
                            <option value="Matemáticas">Matemáticas</option>
                            <option value="Ciencias">Ciencias</option>
                            <option value="Finanzas">Finanzas</option>
                            <option value="Programación">Programación</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <p>Método</p>
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

                    <button type="submit" className="btn btn-primary">Publicar</button>
                    <form name='rec20108_btn1' method='post' action='https://www.webpay.cl/backpub/external/form-pay'><input type='hidden' name='idFormulario' value='197168' /><input type='hidden' name='monto' value='100' /><input type='image' title='Imagen' name='button1' src='https://www.webpay.cl/assets/img/boton_webpaycl.svg' value='Boton 1' /></form>
                </form>
            </div>
        </div>
    );
};

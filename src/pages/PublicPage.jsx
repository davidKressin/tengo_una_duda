// PublicPage.js

import React, { useState } from 'react';
import { ref, set, push } from "firebase/database";
import { database as db } from '../firebaseConfig'; // Ajusta la ruta según donde tengas tu firebaseConfig.js
import horizontalLogo from "../assets/horizontalLogo.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // importar estilos

export const PublicPage = () => {
    const [content, setContent] = useState('');
    const [materia, setMateria] = useState('Matemáticas');
    const [email, setEmail] = useState('');
    const [titulo, setTitulo] = useState('');
    const [metodo, setMetodo] = useState('');
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
    const handleSubmit = (e) => {
        e.preventDefault();

        writeDudaData(
            titulo,
            content,
            email,
            materia,
            metodo,
            recompensaValue);
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
                    <div className="mb-3">
                        <label htmlFor="titulo" className="form-label">Título</label>
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
                        <label htmlFor="email" className="form-label">email</label>
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
                        <label htmlFor="duda" className="form-label">Duda</label>
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
                </form>
            </div>
        </div>
    );
};

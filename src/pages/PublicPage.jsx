import React, { useState } from 'react';
import horizontalLogo from "../assets/horizontalLogo.png";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

export const PublicPage = () => {
    const [content, setContent] = useState('');
    const [materia, setMateria] = useState('Matemáticas');
    const [titulo, setTitulo] = useState('');
    const [metodo, setMetodo] = useState('');

    const handleChangeContent = (content) => {
        setContent(content);
    };

    const handleChangeMateria = (e) => {
        setMateria(e.target.value);
    };

    const handleChangeTitulo = (e) => {
        setTitulo(e.target.value);
    };


    const handleChangeMetodo = (e) => {
        setMetodo(e.target.value);
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();

        // Crear objeto JSON con los datos del formulario
        const formData = {
            titulo: titulo,
            duda: content,
            materia: materia,
            metodo: metodo,
            recompensa: document.getElementById('coins').value // Obtener valor del campo de recompensa
        };

        // Convertir objeto a JSON
        const formDataJSON = JSON.stringify(formData);

        // Guardar el JSON (aquí puedes enviarlo a un servidor, almacenarlo en localStorage, etc.)
        console.log(formDataJSON); // Mostrar en consola para demostración

        // Aquí podrías enviar formDataJSON a un servidor usando fetch o axios, por ejemplo
    };

    return (
        <div className='container-fluid p-0'>

            <div className="image-container m-0 p-0">
                <img className='' src={horizontalLogo} alt="" />
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
                        <input id="coins" min={0} type="number" className="form-control" defaultValue={0} />
                    </div>

                    <button type="submit" className="btn btn-primary">Publicar</button>
                </form>
            </div>
        </div>
    );
};

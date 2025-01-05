import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export const HomePage = () => {
    const gradientBackground = {
        background: "linear-gradient(135deg, #b3e5fc, #e1bee7)",
        minHeight: "100vh",
        margin: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    };
    return (
        <div className="container-fluid p-0">
            {/* Hero Section */}
            <header className="text-center py-2 rounded" style={gradientBackground}>
                <h1 className="display-4 fs-2 mb-2">¿Tienes dudas? ¡Aquí tienes las respuestas para la PAES!</h1>
                <p className="lead mb-4">Resuelve tus preguntas de manera rápida y prepara tu futuro con confianza.</p>
                <div className="d-flex col-12 flex-row justify-content-center flex-wrap">
                    <Link to={"public"} className="btn btn-primary col-lg-2 col-sm-4 mx-2 mb-1">Resolver mi duda ahora</Link>
                    {/* <Link to={"public"} className="btn btn-outline-primary col-lg-2 col-sm-4 mx-2 mb-1">Explorar recursos gratuitos</Link> */}
                </div>
                <div className="mt-4">
                    <img
                        // src="https://via.placeholder.com/800x400"
                        src="https://st2.depositphotos.com/3662505/6878/i/450/depositphotos_68789193-stock-photo-students.jpg"
                        alt="Estudiantes felices"
                        className="img-fluid rounded"
                    />
                </div>
            </header>

            {/* How It Works Section */}
            <section className="py-5 text-center ">
                <h2 className="mb-5 fs-5">Resolver tus dudas nunca fue tan fácil</h2>
                <div className="row">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-regular fa-paper-plane fs-2 text-black"></i>
                        </div>
                        <h5>1. Escribe tu pregunta</h5>
                        <p>Cuéntanos qué necesitas saber.</p>
                    </div>
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-regular fa-envelope fs-2 text-black"></i>
                        </div>
                        <h5>2. Recibe una respuesta</h5>
                        <p>Nuestros expertos te ayudarán al instante.</p>
                    </div>
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-regular fa-thumbs-up fs-2 text-black"></i>
                        </div>
                        <h5>3. Prepárate con confianza</h5>
                        <p>Obtén claridad y asegura tus resultados.</p>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-5 bg-light rounded">
                <h2 className="text-center mb-4 fs-5">Por qué elegir Tengo una Duda</h2>
                <div className="row text-center">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-solid fa-people-group fs-2 text-black"></i>
                        </div>
                        <h5>Acceso rápido a expertos</h5>
                        <p>Resuelve tus preguntas en tiempo récord.</p>
                    </div>
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-solid fa-bullseye fs-2 text-black"></i>
                        </div>
                        <h5>Enfocado en la PAES</h5>
                        <p>Todo lo que necesitas para preparar la prueba.</p>
                    </div>
                    {/* <div className="col-md-3 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-solid fa-book-open fs-2 text-black"></i>
                        </div>
                        <h5>Recursos personalizados</h5>
                        <p>Guías, ejercicios y estrategias de estudio.</p>
                    </div> */}
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        <div
                            className="d-flex justify-content-center align-items-center rounded-circle bg-light text-white"
                            style={{ width: "100px", height: "100px" }}
                        >
                            <i className="fa-brands fa-gratipay fs-2 text-black"></i>
                        </div>
                        <h5>Gratuito y accesible</h5>
                        <p>¡Sube tu primera duda sin costo y mejora tus resultados!</p>
                    </div>
                </div>
            </section>


            {/* Resources Section */}
            {/* <section className="py-5 rounded">
                <h2 className="text-center mb-4">¡Empieza a estudiar hoy mismo!</h2>
                <div className="text-center">
                    <button className="btn btn-primary btn-lg">Descargar recursos gratuitos</button>
                </div>
            </section> */}

            {/* Call to Action Section */}
            <footer className="text-center  py-5">
                <h2 className="mb-4">¿Listo para resolver todas tus dudas?</h2>
                <button className="btn btn-primary btn-lg">Publica tu duda</button>
            </footer>
        </div>
    );
};



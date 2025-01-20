import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Importa tu configuración de Firebase
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { onValue, ref } from "firebase/database";

export const DudaPage = () => {

    const { id } = useParams();

    // Estado para almacenar los datos de la duda
    const [dudaData, setDudaData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Recuperar los datos de la duda desde Firestore

    useEffect(() => {
        const fetchDudas = async () => {
            try {
                const dudasRef = ref(db, `dudas/${id}`); // Referencia a la colección "dudas"

                // Escucha los cambios en la colección
                onValue(dudasRef, (snapshot) => {
                    const data = snapshot.val();
                    console.log("data", data)
                    if (data) {
                        // Convierte los datos en un array de objetos
                        const dudasArray = Object.keys(data).map((key) => ({
                            id: key, // Agrega el ID (clave de Firebase)
                            ...data[key], // Propiedades del documento
                        }));
                        setDudaData(data);
                        console.log(dudaData);
                    } else {
                        setDudaData([]); // Si no hay datos, establece dudas como un array vacío
                    }
                    setLoading(false);
                });
            } catch (e) {
                console.error("Error al obtener las dudas:", e);
                setLoading(false);
            }
        };

        fetchDudas();
    }, [id]);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <h3>Cargando datos...</h3>
            </div>
        );
    }

    if (!dudaData) {
        return (
            <div className="container text-center mt-5">
                <h3>No se encontraron datos para la duda especificada.</h3>
            </div>
        );
    }

    // Renderizar los datos una vez que se cargan
    return (
        <div className="container mt-5">
            {/* Título */}
            <div className="row mb-4">
                <div className="col text-center">
                    <h1 className="fs-2">{dudaData.titulo}</h1>
                </div>
            </div>

            {/* Contenido (iframe) */}
            <div className="row mb-4">
                <div className="col">
                    <div className="card shadow-sm">
                        <div className="card-header text-center bg-light text-dark">
                            <h3>Contenido de la Duda</h3>
                        </div>
                        <div className="card-body">
                            <div
                                style={{
                                    width: "100%",
                                    height: "400px",
                                    border: "1px solid #ddd",
                                    borderRadius: "5px",
                                    padding: "10px",
                                    overflow: "auto",
                                }}
                                dangerouslySetInnerHTML={{ __html: dudaData.duda }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Información adicional */}
            <div className="row">
                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Materia</h5>
                            <p className="card-text">{dudaData.materia}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Recompensa</h5>
                            <p className="card-text">{dudaData.recompensa}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Método de Pago</h5>
                            <p className="card-text">{dudaData.metodo}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Datos del Estudiante</h5>
                            <p className="card-text">{dudaData.name}</p>
                            <p className="card-text">{dudaData.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

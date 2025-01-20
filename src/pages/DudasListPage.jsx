import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig"; // Asegúrate de apuntar a tu archivo de configuración Firebase.
import { get, onValue, query, ref } from "firebase/database";

export const DudasListPage = () => {
    const [dudas, setDudas] = useState([]); // Estado para almacenar las dudas
    const [loading, setLoading] = useState(true); // Estado para mostrar el indicador de carga
    const [error, setError] = useState(null); // Estado para errores

    // Función para cargar las dudas desde Firestore
    useEffect(() => {
        const fetchDudas = async () => {
            try {
                const dudasRef = ref(db, "dudas"); // Referencia a la colección "dudas"

                // Escucha los cambios en la colección
                onValue(dudasRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        // Convierte los datos en un array de objetos
                        const dudasArray = Object.keys(data).map((key) => ({
                            id: key, // Agrega el ID (clave de Firebase)
                            ...data[key], // Propiedades del documento
                        }));
                        setDudas(dudasArray);
                    } else {
                        setDudas([]); // Si no hay datos, establece dudas como un array vacío
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

    // Mostrar un indicador de carga mientras se obtienen los datos
    if (loading) {
        return (
            <div className="container text-center mt-5">
                <h3>Cargando dudas...</h3>
            </div>
        );
    }

    // Mostrar un mensaje de error si ocurre algo
    if (error) {
        return (
            <div className="container text-center mt-5">
                <h3>{error}</h3>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {/* Título */}
            <div className="row mb-4">
                <div className="col text-center">
                    <h1 className="">Listado de Dudas</h1>
                </div>
            </div>

            {/* Tabla con las dudas */}
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Título</th>
                                <th scope="col">Materia</th>
                                <th scope="col">Método</th>
                                <th scope="col">Recompensa</th>
                                <th scope="col">Correo</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dudas.map((duda) => (
                                <tr key={duda.id}>
                                    <td>{duda.titulo}</td>
                                    <td>{duda.materia}</td>
                                    <td>{duda.metodo}</td>
                                    <td>{duda.recompensa}</td>
                                    <td>{duda.email}</td>
                                    <td>
                                        <Link
                                            to={`/dudas/${duda.id}`}
                                            className="btn btn-primary btn-sm"
                                        >
                                            Ver detalle
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

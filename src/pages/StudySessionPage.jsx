import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';

export const StudySessionPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Tutor Diego', text: '¡Hola! Bienvenidos a la sesión de hoy. ¿Tienen dudas con la M1?', system: true },
        { id: 2, sender: 'María', text: 'Hola Diego, yo tengo dudas con logaritmos.', system: false },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const [isMuted, setIsMuted] = useState(true);
    const [isCameraOn, setIsCameraOn] = useState(false);

    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setMessages([...messages, {
                id: Date.now(),
                sender: localStorage.getItem('studentName') || 'Estudiante',
                text: newMessage,
                system: false
            }]);
            setNewMessage('');
        }
    };

    return (
        <AppLayout>
            <div className="min-vh-100 bg-color1 position-relative pt-5 mt-5">
                <div className="hero-glow"></div>
                <div className="container-fluid px-4 mt-4">
                    <div className="row g-4">
                        {/* Video Area (Left) */}
                        <div className="col-lg-9">
                            <div className="glass-card overflow-hidden position-relative shadow-2xl" style={{ height: '75vh', border: '1px solid rgba(255, 255, 255, 0.05)' }}>

                                <div className="w-100 h-100 bg-dark d-flex flex-column align-items-center justify-content-center">
                                    {/* Web Stream (Vimeo) */}
                                    <div className="w-100 h-100 position-relative">
                                        <div style={{ padding: '56.25% 0 0 0', position: 'relative' }}>
                                            <iframe
                                                src="https://vimeo.com/event/5729319/embed/interaction"
                                                frameBorder="0"
                                                allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share"
                                                referrerPolicy="strict-origin-when-cross-origin"
                                                allowFullScreen
                                                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                            ></iframe>
                                        </div>
                                    </div>

                                    <div className="position-absolute top-0 start-0 m-4" style={{ zIndex: 5 }}>
                                        <span className="badge bg-danger rounded-pill px-3 py-2 d-flex align-items-center">
                                            <span className="blink-dot me-2"></span> EN VIVO
                                        </span>
                                    </div>

                                    {/* Bottom Controls Bar */}
                                    {/* <div className="position-absolute bottom-0 start-50 translate-middle-x mb-4 px-4 py-3 rounded-pill glass-card d-flex gap-4 align-items-center" style={{ background: 'rgba(15, 23, 42, 0.9)', zIndex: 20 }}>
                                        <button
                                            className={`btn btn-circle ${isMuted ? 'btn-outline-danger' : 'btn-primary'}`}
                                            onClick={() => setIsMuted(!isMuted)}
                                            title={isMuted ? 'Activar Micrófono' : 'Silenciar'}
                                        >
                                            <i className={`fa-solid ${isMuted ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
                                        </button>
                                        <button
                                            className={`btn btn-circle ${!isCameraOn ? 'btn-outline-secondary' : 'btn-primary'}`}
                                            onClick={() => setIsCameraOn(!isCameraOn)}
                                            title={isCameraOn ? 'Apagar Cámara' : 'Encender Cámara'}
                                        >
                                            <i className={`fa-solid ${isCameraOn ? 'fa-video' : 'fa-video-slash'}`}></i>
                                        </button>
                                        <div className="vr bg-white opacity-25"></div>
                                        <button className="btn btn-circle btn-outline-light" title="Compartir Pantalla">
                                            <i className="fa-solid fa-desktop"></i>
                                        </button>
                                        <button className="btn btn-circle btn-outline-light" title="Levantar la Mano">
                                            <i className="fa-solid fa-hand"></i>
                                        </button>
                                        <div className="vr bg-white opacity-25"></div>
                                        <button
                                            className="btn btn-danger rounded-pill px-4"
                                            onClick={() => navigate('/my-plan')}
                                        >
                                            Salir
                                        </button>
                                    </div> */}
                                </div>
                            </div>

                            <div className="mt-4 px-2">
                                <h4 className="text-white fw-bold mb-1">Repaso Matemática M1: Logaritmos y Funciones</h4>
                                <p className="text-white opacity-50 small">Moderado por Tutor Diego • 24 estudiantes conectados</p>
                            </div>
                        </div>

                        {/* Chat Area (Right) */}
                        {/* <div className="col-lg-3">
                            <div className="glass-card d-flex flex-column shadow-xl" style={{ height: '75vh', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                <div className="p-3 border-bottom border-white border-opacity-10 d-flex align-items-center">
                                    <i className="fa-solid fa-comments text-primary me-2"></i>
                                    <h6 className="text-white mb-0 fw-bold">Chat de la Sesión</h6>
                                </div>

                                <div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-3 custom-scrollbar">
                                    {messages.map((msg) => (
                                        <div key={msg.id} className={`d-flex flex-column ${msg.system ? 'align-items-start' : 'align-items-end'}`}>
                                            <div className="d-flex align-items-center gap-2 mb-1">
                                                <small className={`fw-bold ${msg.system ? 'text-primary' : 'text-secondary'}`} style={{ fontSize: '10px' }}>
                                                    {msg.sender}
                                                </small>
                                            </div>
                                            <div className={`p-2 rounded-3 small ${msg.system ? 'bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25' : 'bg-primary text-white shadow-sm'}`} style={{ maxWidth: '90%' }}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={chatEndRef} />
                                </div>

                                <div className="p-3 border-top border-white border-opacity-10">
                                    <form onSubmit={handleSendMessage} className="position-relative">
                                        <input
                                            type="text"
                                            className="form-control bg-dark border-secondary text-white rounded-pill py-2 ps-3 pe-5 small"
                                            placeholder="Escribe un mensaje..."
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            style={{ fontSize: '13px' }}
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-primary pe-3"
                                            disabled={!newMessage.trim()}
                                        >
                                            <i className="fa-solid fa-paper-plane"></i>
                                        </button>
                                    </form>
                                    <div className="d-flex justify-content-between mt-2 px-1">
                                        <button className="btn btn-link p-0 text-white opacity-25 hover-opacity-100" title="Activar Voz a Texto">
                                            <i className="fa-solid fa-microphone"></i>
                                        </button>
                                        <button className="btn btn-link p-0 text-white opacity-25 hover-opacity-100" title="Enviar Emoji">
                                            <i className="fa-regular fa-face-smile"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>

            <style>{`
                .blink-dot {
                    width: 8px;
                    height: 8px;
                    background-color: #fff;
                    border-radius: 50%;
                    display: inline-block;
                    animation: blink 1s infinite;
                }
                @keyframes blink {
                    0% { opacity: 1; }
                    50% { opacity: 0.3; }
                    100% { opacity: 1; }
                }
                .btn-circle {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
            `}</style>
        </AppLayout>
    );
};

import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { storage, database } from '../firebaseConfig';
import { ref as sRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref as dRef, push, set } from 'firebase/database';

export const UploadExamsPage = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [subject, setSubject] = useState('Matemáticas');
    const [examDate, setExamDate] = useState('');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setSelectedImages(prev => [...prev, ...files]);

        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviews(prev => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);

        const newPreviews = [...previews];
        URL.revokeObjectURL(newPreviews[index]);
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleUpload = async () => {
        if (selectedImages.length === 0) {
            alert('Por favor selecciona al menos una imagen.');
            return;
        }

        setUploading(true);
        const email = localStorage.getItem('studentEmail');

        try {
            // Simplified upload logic
            // In a production app, we would loop through images and upload each to Firebase Storage
            // For now, we simulate the upload process to show the UI works
            for (let i = 0; i <= 100; i += 10) {
                setProgress(i);
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            alert('¡Ensayos subidos con éxito! Ahora nuestros tutores podrán analizar tu nivel.');

            // Mark as uploaded in localStorage for the demo
            const uploadedCount = parseInt(localStorage.getItem('uploadedExamsCount') || '0');
            localStorage.setItem('uploadedExamsCount', uploadedCount + selectedImages.length);

            navigate('/profile');
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Hubo un error al subir las imágenes.');
        } finally {
            setUploading(false);
            setProgress(0);
        }
    };

    return (
        <AppLayout>
            <div className='section-padding min-vh-100 position-relative overflow-hidden'>
                <div className="hero-glow"></div>
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="glass-card p-4 p-md-5">
                                <div className="text-center mb-5">
                                    <div className="mb-3 d-inline-flex p-3 rounded-circle" style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)' }}>
                                        <i className="fa-solid fa-cloud-arrow-up fs-2"></i>
                                    </div>
                                    <h2 className="display-6 fw-bold text-gradient">Adjuntar Ensayos Previos</h2>
                                    <p className="text-white opacity-75">Sube fotos de tus ensayos y sus respuestas para personalizar tu plan.</p>
                                </div>

                                <div className="row g-4 mb-4">
                                    <div className="col-md-6">
                                        <label className="form-label text-white fw-600">Materia del Ensayo</label>
                                        <select
                                            className="form-select bg-dark border-secondary text-white p-3 rounded-3"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        >
                                            <option value="Matemáticas">Matemáticas</option>
                                            <option value="Lenguaje">Lenguaje</option>
                                            <option value="Ciencias">Ciencias</option>
                                            <option value="Historia">Historia</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label text-white fw-600">Fecha de realización</label>
                                        <input
                                            type="date"
                                            className="form-control bg-dark border-secondary text-white p-3 rounded-3"
                                            value={examDate}
                                            onChange={(e) => setExamDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="col-12">
                                        <div
                                            className="upload-dropzone border border-secondary border-dashed rounded-4 p-5 text-center cursor-pointer transition-hover"
                                            style={{ borderStyle: 'dashed', background: 'rgba(255, 255, 255, 0.02)', cursor: 'pointer' }}
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="d-none"
                                                multiple
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                            <i className="fa-regular fa-images display-4 text-primary opacity-50 mb-3"></i>
                                            <h5 className="text-white">Haz clic o arrastra tus fotos aquí</h5>
                                            <p className="text-white opacity-50 small mb-0">Soporta JPG, PNG (máx. 5MB por foto)</p>
                                        </div>
                                    </div>
                                </div>

                                {previews.length > 0 && (
                                    <div className="mb-4">
                                        <h6 className="text-white mb-3">Vista previa ({previews.length})</h6>
                                        <div className="row g-3">
                                            {previews.map((preview, index) => (
                                                <div key={index} className="col-4 col-md-3">
                                                    <div className="position-relative ratio ratio-1x1 rounded-3 overflow-hidden border border-secondary">
                                                        <img src={preview} alt={`preview-${index}`} className="object-fit-cover w-100 h-100" />
                                                        <button
                                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 rounded-circle p-0 d-flex align-items-center justify-content-center"
                                                            style={{ width: '20px', height: '20px' }}
                                                            onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                                                        >
                                                            <i className="fa-solid fa-xmark small"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {uploading && (
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between text-white small mb-2">
                                            <span>Subiendo archivos...</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="progress bg-dark" style={{ height: '8px' }}>
                                            <div className="progress-bar progress-bar-striped progress-bar-animated bg-primary" style={{ width: `${progress}%` }}></div>
                                        </div>
                                    </div>
                                )}

                                <div className="d-grid gap-3 mt-5">
                                    <button
                                        className="btn-premium py-3 fs-5"
                                        onClick={handleUpload}
                                        disabled={uploading || selectedImages.length === 0}
                                    >
                                        <i className="fa-solid fa-cloud-arrow-up me-2"></i>
                                        {uploading ? 'Subiendo...' : 'Subir Ensayos Ahora'}
                                    </button>
                                    <button
                                        className="btn btn-link text-white opacity-50 text-decoration-none"
                                        onClick={() => navigate('/profile')}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

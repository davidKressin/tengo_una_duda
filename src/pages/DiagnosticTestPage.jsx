import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { useAuth } from '../context/AuthContext';
import { getDiagnosticQuestions, submitDiagnosticResults } from '../services/apiService';

export const DiagnosticTestPage = () => {
    const { testId } = useParams();
    const navigate = useNavigate();
    const { currentUser, userProfile } = useAuth();
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [error, setError] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [report, setReport] = useState(null);

    // Timer logic
    useEffect(() => {
        let interval;
        if (!loading && !submitting && !showResults) {
            interval = setInterval(() => {
                setTimeElapsed(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [loading, submitting, showResults]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                setLoading(true);
                const data = await getDiagnosticQuestions(testId);
                if (data.ok && data.questions) {
                    setQuestions(data.questions);
                } else {
                    throw new Error("Invalid API response format");
                }
            } catch (err) {
                setError("No pudimos cargar las preguntas. Por favor, intenta de nuevo más tarde.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [testId]);

    const handleOptionSelect = (questionId, option) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: option
        }));
    };

    const handleNext = async () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            try {
                setSubmitting(true);
                const score = calculateScore();

                // Prepare data for submission
                const resultsData = {
                    userId: currentUser?.uid,
                    userName: userProfile?.name || currentUser?.displayName || 'Usuario Invitado',
                    userEmail: currentUser?.email,
                    testId: testId,
                    score: score.percentage,
                    correctAnswers: score.correct,
                    totalQuestions: score.total,
                    incorrectQuestions: score.incorrectQuestions,
                    timeSeconds: timeElapsed,
                    timeFormatted: formatTime(timeElapsed),
                    answers: answers,
                    timestamp: new Date().toISOString()
                };

                // Submit to API
                const response = await submitDiagnosticResults(resultsData);
                if (response && response.report) {
                    setReport(response.report);
                }

                setShowResults(true);
            } catch (err) {
                console.error("Submission error:", err);
                setError("Hubo un problema al enviar tus resultados. Por favor, intenta de nuevo.");
            } finally {
                setSubmitting(false);
            }
        }
    };

    const handlePrev = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    const calculateScore = () => {
        let correct = 0;
        const incorrectQuestions = [];

        questions.forEach(q => {
            if (answers[q.id] === q.answer) {
                correct++;
            } else {
                incorrectQuestions.push({
                    id: q.id,
                    question: q.question,
                    userAnswer: answers[q.id],
                    correctAnswer: q.answer,
                    topic: q.topic
                });
            }
        });

        return {
            total: questions.length,
            correct: correct,
            percentage: Math.round((correct / questions.length) * 100),
            incorrectQuestions: incorrectQuestions
        };
    };

    if (loading || submitting) {
        return (
            <AppLayout>
                <div className="section-padding min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="text-center">
                        <div className="spinner-border text-primary mb-3" role="status">
                            <span className="visually-hidden">Procesando...</span>
                        </div>
                        <h5 className="text-white opacity-75">{submitting ? 'Enviando tus resultados...' : 'Cargando diagnóstico...'}</h5>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (error) {
        return (
            <AppLayout>
                <div className="section-padding min-vh-100 d-flex align-items-center justify-content-center">
                    <div className="glass-card p-5 text-center">
                        <i className="fa-solid fa-circle-exclamation text-danger display-4 mb-4"></i>
                        <h3 className="text-white mb-3">¡Ops! Algo salió mal</h3>
                        <p className="text-white opacity-75 mb-4">{error}</p>
                        <button className="btn btn-primary rounded-pill px-5" onClick={() => navigate('/my-plan')}>
                            Volver a Mi Plan
                        </button>
                    </div>
                </div>
            </AppLayout>
        );
    }

    if (showResults) {
        const score = calculateScore();
        return (
            <AppLayout>
                <div className="section-padding min-vh-100 position-relative overflow-hidden">
                    <div className="hero-glow"></div>
                    <div className="container mt-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="glass-card p-5 text-center">
                                    <h2 className="display-6 fw-bold text-gradient mb-4">Resultado del Diagnóstico</h2>
                                    <div className="display-2 fw-bold text-white mb-2">{score.percentage}%</div>
                                    <div className="d-flex justify-content-center gap-3 mb-5">
                                        <div className="px-3 py-1 rounded-pill bg-white bg-opacity-10 text-white small">
                                            <i className="fa-solid fa-clock me-2 text-primary"></i>
                                            {formatTime(timeElapsed)} total
                                        </div>
                                        <div className="px-3 py-1 rounded-pill bg-white bg-opacity-10 text-white small">
                                            <i className="fa-solid fa-check me-2 text-success"></i>
                                            {score.correct}/{score.total} correctas
                                        </div>
                                    </div>

                                    <div className="text-start mb-5">
                                        <h5 className="text-white mb-4 d-flex align-items-center">
                                            <i className="fa-solid fa-chart-pie me-3 text-primary"></i>
                                            Análisis por Tópico (Errores)
                                        </h5>
                                        <div className="row g-4">
                                            {report && Object.entries(report).map(([topic, data]) => (
                                                <div key={topic} className="col-md-6">
                                                    <div className="p-4 rounded-4 bg-dark bg-opacity-50 border border-white border-opacity-10 shadow-sm transition-hover">
                                                        <div className="d-flex justify-content-between align-items-end mb-3">
                                                            <div>
                                                                <h6 className="text-white mb-1 fw-bold">{topic}</h6>
                                                                <small className="text-white opacity-50">
                                                                    {data.incorrect} errores de {data.total} preguntas
                                                                </small>
                                                            </div>
                                                            <div className={`fw-bold ${data.wrongPercentage > 50 ? 'text-danger' : data.wrongPercentage > 20 ? 'text-warning' : 'text-success'}`}>
                                                                {data.wrongPercentage}%
                                                            </div>
                                                        </div>
                                                        <div className="progress overflow-visible" style={{ height: '8px', background: 'rgba(255, 255, 255, 0.05)' }}>
                                                            <div
                                                                className={`progress-bar rounded-pill transition-all ${data.wrongPercentage > 50 ? 'bg-danger' :
                                                                        data.wrongPercentage > 20 ? 'bg-warning' :
                                                                            'bg-success'
                                                                    }`}
                                                                style={{
                                                                    width: `${data.wrongPercentage}%`,
                                                                    boxShadow: `0 0 15px ${data.wrongPercentage > 50 ? 'rgba(220, 38, 38, 0.5)' :
                                                                            data.wrongPercentage > 20 ? 'rgba(245, 158, 11, 0.5)' :
                                                                                'rgba(16, 185, 129, 0.5)'
                                                                        }`
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {!report && (
                                                <div className="col-12 text-center py-4 bg-white bg-opacity-5 rounded-4 border border-dashed border-white border-opacity-10">
                                                    <p className="text-white opacity-50 mb-0">No hay datos de reporte disponibles.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <button className="btn-premium px-5" onClick={() => navigate('/my-plan')}>
                                        Continuar con mi Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <AppLayout>
            <div className="section-padding min-vh-100 position-relative">
                <div className="container mt-5">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            {/* Header Info */}
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div className="d-flex align-items-center gap-3">
                                    <span className="badge bg-primary px-3 py-2 rounded-pill small shadow-sm">
                                        {currentQuestion.topic}
                                    </span>
                                    <div className="d-flex align-items-center text-white opacity-75 small fw-500">
                                        <i className="fa-solid fa-clock me-2 text-primary"></i>
                                        {formatTime(timeElapsed)}
                                    </div>
                                    <div className="text-white opacity-50 small">
                                        Pregunta {currentQuestionIndex + 1} de {questions.length}
                                    </div>
                                </div>
                                <button className="btn btn-link text-white opacity-75 text-decoration-none hover-opacity-100" onClick={() => navigate('/my-plan')}>
                                    Abandonar
                                </button>
                            </div>

                            {/* Progress Bar */}
                            <div className="progress mb-5" style={{ height: '6px', background: 'rgba(255, 255, 255, 0.1)' }}>
                                <div
                                    className="progress-bar bg-primary transition-all"
                                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>

                            {/* Question Card */}
                            <div className="glass-card p-5 mb-4">
                                <h3 className="text-white mb-5 line-height-base">{currentQuestion.question}</h3>

                                <div className="row g-3">
                                    {currentQuestion.options.map((option, idx) => (
                                        <div className="col-12" key={idx}>
                                            <div
                                                className={`p-4 rounded-4 transition-all cursor-pointer border ${answers[currentQuestion.id] === option
                                                    ? 'bg-primary border-primary text-white shadow-lg scale-102'
                                                    : 'bg-dark bg-opacity-50 border-white border-opacity-10 text-white hover-border-opacity-30'
                                                    }`}
                                                onClick={() => handleOptionSelect(currentQuestion.id, option)}
                                                style={{ scale: answers[currentQuestion.id] === option ? '1.02' : '1' }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <span className={`me-3 fw-bold ${answers[currentQuestion.id] === option ? 'text-white' : 'text-primary'}`}>{String.fromCharCode(65 + idx)})</span>
                                                    <span className="fw-500">{option}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="d-flex justify-content-between">
                                <button
                                    className={`btn btn-outline-light rounded-pill px-4 ${currentQuestionIndex === 0 ? 'invisible' : ''}`}
                                    onClick={handlePrev}
                                >
                                    Anterior
                                </button>
                                <button
                                    className="btn btn-primary rounded-pill px-5 shadow-lg border-0"
                                    style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
                                    onClick={handleNext}
                                    disabled={!answers[currentQuestion.id]}
                                >
                                    {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

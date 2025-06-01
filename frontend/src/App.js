import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
import QuestionDisplay from './components/QuestionDisplay';
import AnswerInput from './components/AnswerInput';
import EvaluationResult from './components/EvaluationResult';
import RecommendationsDisplay from './components/RecommendationDisplay';
import FileInput from './components/FileInput';

const App = () => {
    const [question, setQuestion] = useState("");
    const [evaluation, setEvaluation] = useState("");
    const [recommendations, setRecommendations] = useState("");
    const [showWarning, setShowWarning] = useState(true);
    const [uploadedFileContent, setUploadedFileContent] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loadingQuestion, setLoadingQuestion] = useState(false);
    const [answerSubmitted, setAnswerSubmitted] = useState(false);

    const handleFileLoaded = (content) => {
        setUploadedFileContent(content);
        setQuestion("");
        setEvaluation("");
        setRecommendations("");
        setErrorMessage("");
        setLoadingQuestion(false);
        setAnswerSubmitted(false);
    };

    const getQuestion = async (content = uploadedFileContent) => {
        setErrorMessage("");
        setQuestion("");
        setEvaluation("");
        setRecommendations("");
        setAnswerSubmitted(false);

        if (!content) {
            setErrorMessage("Por favor, carga un archivo para generar una pregunta.");
            return;
        }

        setLoadingQuestion(true);
        
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/generate-question`, {
                documentText: content
            });
            setQuestion(response.data.question);
        } catch (error) {
            console.error("Error al generar la pregunta:", error);
            setErrorMessage("Error al generar la pregunta. Algo salió mal. Por favor, inténtalo de nuevo más tarde o verifica tu conexión.");
        } finally {
            setLoadingQuestion(false);
        }
    };

    const submitAnswer = async (userAnswer) => {
        setErrorMessage("");
        setEvaluation("");
        setRecommendations("");

        if (!userAnswer || !question) {
            setErrorMessage("Por favor, ingresa una respuesta y asegúrate de que haya una pregunta generada.");
            return;
        }

        setAnswerSubmitted(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/evaluate-answer`, {
                userAnswer,
                question
            });
            setEvaluation(response.data.evaluation);
            getRecommendations(userAnswer, response.data.evaluation);
        } catch (error) {
            console.error("Error al evaluar la respuesta:", error);
            setErrorMessage("Error al evaluar la respuesta. Por favor, inténtalo de nuevo.");
            setAnswerSubmitted(false);
        }
    };

    const getRecommendations = async (userAnswer, evaluationResult) => {
        setErrorMessage("");
        try {
            const recResponse = await axios.post(`${process.env.REACT_APP_API_URL}/recommend-resources`, {
                userAnswer,
                question,
                evaluation: evaluationResult
            });
            setRecommendations(recResponse.data.recommendations);
        } catch (error) {
            console.error("Error al obtener recomendaciones:", error);
            setErrorMessage("Error al obtener recomendaciones. Por favor, inténtalo de nuevo.");
        }
    };

    const handleCloseWarning = () => {
        setShowWarning(false);
    };

    return (
        <div className="App">
            <h1>Tutor LLM</h1>

            <div className="content-area">
                <FileInput onFileLoaded={handleFileLoaded} />
                <button
                    onClick={() => getQuestion()}
                    disabled={loadingQuestion}
                >
                    Generar Nueva Pregunta
                </button>

                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}

                <QuestionDisplay question={question} loading={loadingQuestion}/>
                <AnswerInput onSubmit={submitAnswer} disabled={!question || answerSubmitted}/>
                <EvaluationResult evaluation={evaluation}/>
                <RecommendationsDisplay recommendations={recommendations}/>
            </div>

            {showWarning && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h2>⚠️ Advertencia</h2>
                        <p>
                            Esta aplicación utiliza modelos LLM. Las respuestas generadas pueden contener errores,
                            alucinaciones o recomendaciones incorrectas. No se garantiza la veracidad ni la precisión
                            de la información proporcionada. Úsala bajo tu propio criterio y teniendo en cuenta que
                            puede ser necesario verificar las respuestas con una fuente más fiable (recursos generados
                            por humanos expertos, como libros, blogs, notas de clase, etc.)
                        </p>
                        <button onClick={handleCloseWarning}>Entendido</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;

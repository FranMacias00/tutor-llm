const QuestionDisplay = ({ question, loading }) => {
    return (
        <div>
            <h2>Pregunta:</h2>
            <p>
                {loading
                    ? "Generando pregunta..."
                    : question
                        ? question
                        : "Carga un archivo y haz clic en 'Generar Nueva Pregunta'"
                }
            </p>
        </div>
    );
};

export default QuestionDisplay;

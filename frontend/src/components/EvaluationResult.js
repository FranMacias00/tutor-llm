import ReactMarkdown from 'react-markdown';

const EvaluationResult = ({ evaluation }) => {
    return (
        <div>
            <h3>Evaluación:</h3>
            <div style={{ textAlign: 'left' }}>
                <ReactMarkdown>{evaluation || "Esperando evaluación..."}</ReactMarkdown>
            </div>
        </div>
    );
};

export default EvaluationResult;

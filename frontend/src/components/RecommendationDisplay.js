import ReactMarkdown from 'react-markdown';

const RecommendationDisplay = ({ recommendations }) => {
    return (
        <div>
            <h3>Recomendaciones para mejorar:</h3>
            <div style={{ textAlign: 'left' }}>
                <ReactMarkdown>{recommendations || "Esperando recomendación..."}</ReactMarkdown>
            </div>
        </div>
    );
};

export default RecommendationDisplay;

import { useState } from 'react';

const AnswerInput = ({ onSubmit, disabled }) => {
    const [answer, setAnswer] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(answer);
        setAnswer("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Tu respuesta:
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={disabled}
                />
            </label>
            <button type="submit" disabled={disabled}>Enviar</button> 
        </form>
    );
};

export default AnswerInput;

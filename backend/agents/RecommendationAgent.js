class RecommendationAgent {
    constructor(llm, model) {
        this.llm = llm;
        this.model = model;
    }

    async recommendResources(question, userAnswer, evaluation) {
        let prompt;

        if (evaluation.includes("Incorrecto")) {
            prompt = `
                El usuario ha respondido incorrectamente la siguiente pregunta:
                - Pregunta: ${question}
                - Respuesta del usuario: ${userAnswer}
                
                Proporciona enlaces a libros, documentación o recursos en línea para mejorar en este tema.
            `;
        } else {
            prompt = `
                El usuario ha respondido correctamente la siguiente pregunta:
                - Pregunta: ${question}
                - Respuesta del usuario: ${userAnswer}
                
                Proporciona recursos adicionales para profundizar aún más en este tema.
            `;
        }

        const recommendations = await this.llm.call(prompt, this.model);
        return recommendations.trim();
    }
}

module.exports = RecommendationAgent;

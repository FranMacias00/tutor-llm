class EvaluationAgent {
    constructor(llm, model) {
        this.llm = llm;
        this.model = model;
    }

    async evaluateAnswer(userAnswer, question) {
        const prompt = `
            Evalúa la siguiente respuesta del usuario.

            - Pregunta: ${question}
            - Respuesta del usuario: ${userAnswer}

            Primero indica si es "Correcto" o "Incorrecto".
            Después, muestra la respuesta del usuario.
            Por último, proporciona una breve explicación justificando la evaluación.
            `;
        const evaluation = await this.llm.call(prompt, this.model);
        return evaluation.trim();
    }
}

module.exports = EvaluationAgent;

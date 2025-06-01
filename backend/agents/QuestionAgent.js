class QuestionAgent {
    constructor(llm, model) {
        this.llm = llm;
        this.model = model;
    }

    async generateQuestion(text) {
        const prompt = `${text}
        Del texto anterior, extrae una pregunta que pueda plantearse a un estudiante 
        para evaluar su conocimiento del tema. El formato de salida que debes proporcionar es el siguiente:  
        [Pregunta]: ... texto de la pregunta...    
        Debes dar la pregunta en español.`;
        const response = await this.llm.call(prompt, this.model);   
        return { question: response.trim() };
    }
}

module.exports = QuestionAgent;

const QuestionAgent = require('../agents/QuestionAgent');
const EvaluationAgent = require('../agents/EvaluationAgent');
const RecommendationAgent = require('../agents/RecommendationAgent');

class OrchestratorAgent {
    constructor(llm, questionModel = "llama3.1:8b", evaluationModel = "cogito:8b", recommenderModel = "gemma3:12b") {
        this.questionAgent = new QuestionAgent(llm, questionModel);
        this.evaluationAgent = new EvaluationAgent(llm, evaluationModel);
        this.recommenderAgent = new RecommendationAgent(llm, recommenderModel);
    }

    async generateQuestion(documentText) {
        return await this.questionAgent.generateQuestion(documentText);
    }

    async evaluateAnswer(userAnswer, question) {
        return await this.evaluationAgent.evaluateAnswer(userAnswer, question);
    }

    async recommendResources(question, userAnswer, evaluation) {
        return await this.recommenderAgent.recommendResources(question, userAnswer, evaluation);
    }
}

module.exports = OrchestratorAgent;

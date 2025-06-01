const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const ApiLLM = require('./model/ApiLLM');
const OrchestratorAgent = require('./orchestrator/OrchestratorAgent');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const llm = new ApiLLM(process.env.API_KEY, process.env.ENDPOINT_URL);
const orchestrator = new OrchestratorAgent(llm);

app.post('/generate-question', async (req, res) => {
    try {
        const { documentText } = req.body;
        if (!documentText) {
            return res.status(400).json({ error: "Se requiere el contenido del documento para generar una pregunta." });
        }
        const { question } = await orchestrator.generateQuestion(documentText);
        res.json({ question });
    } catch (error) {
        console.error("Error en /generate-question:", error);
        res.status(500).json({ error: "Error al generar la pregunta." });
    }
});

app.post('/evaluate-answer', async (req, res) => {
    try {
        const { userAnswer, question } = req.body;
        const evaluation = await orchestrator.evaluateAnswer(userAnswer, question);
        res.json({ evaluation });
    } catch (error) {
        console.error("Error en /evaluate-answer:", error);
        res.status(500).json({ error: "Error al evaluar la respuesta." });
    }
});

app.post('/recommend-resources', async (req, res) => {
    try {
        const { question, userAnswer, evaluation } = req.body;
        const recommendations = await orchestrator.recommendResources(question, userAnswer, evaluation);
        res.json({ recommendations });
    } catch (error) {
        console.error("Error en /recommend-resources:", error);
        res.status(500).json({ error: "Error al recomendar recursos." });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));

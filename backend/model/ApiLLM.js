const axios = require('axios');

class ApiLLM {
    constructor(apiKey, endpointUrl) {
        this.apiKey = apiKey;
        this.endpointUrl = endpointUrl;
    }

    async call(prompt, model) {
        const headers = {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
        };

        const payload = {
            model : model,
            messages: [{ role: "user", content: prompt }],
        };

        try {
            const start = Date.now();
            const response = await axios.post(this.endpointUrl, payload, { headers: headers });
            const duration = Date.now() - start;
            console.log(`[${model}] Tiempo de respuesta del modelo: ${duration} ms`);
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("Error al llamar al LLM:", error);
            throw error;
        }
    }
}

module.exports = ApiLLM;

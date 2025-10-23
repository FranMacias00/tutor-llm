# Tutor-LLM

Proyecto que implementa un asistente/tutor educativo basado en modelos de lenguaje (LLM).

El sistema permite:

* Generar preguntas a partir del texto de un documento.
* Evaluar respuestas del usuario frente a una pregunta generada.
* Recomendar recursos (libros, documentación, enlaces) según la evaluación.

La arquitectura está dividida en dos partes principales:

* **Backend:** API REST desarrollada con Express.
* **Frontend:** aplicación React que consume dicha API.

---

## 📂 Estructura del repositorio

* `backend/` — Servidor Express y lógica de los agentes.

  * `server.js` — Punto de entrada del servidor; expone los endpoints REST.
  * `agents/` — Implementaciones de los agentes:

    * `QuestionAgent.js` — Genera preguntas a partir de texto.
    * `EvaluationAgent.js` — Evalúa la respuesta del usuario (Correcto/Incorrecto y explicación).
    * `RecommendationAgent.js` — Recomienda recursos según la evaluación.
  * `orchestrator/OrchestratorAgent.js` — Coordina los agentes y selecciona modelos por defecto.
  * `model/ApiLLM.js` — Cliente HTTP que encapsula las llamadas al servicio de LLM (usa `axios`).

* `frontend/` — Aplicación React que interactúa con el backend.

  * `src/components/` — Componentes UI (entrada de respuesta, preguntas, recomendaciones, etc.).

* `README.md` — (este archivo) documentación del proyecto.

---

## ⚙️ Requisitos

* Node.js (>= 16 recomendado)
* npm (o yarn)
* Una clave/API y una URL de endpoint para el servicio LLM que se utilizará desde `backend/model/ApiLLM.js`

---

## 🔐 Variables de entorno (backend)

En el fichero `.env` dentro de la carpeta `backend/`, definir las siguientes variables:

```
API_KEY=tu_api_key_aqui
ENDPOINT_URL=https://api.tu-llm.com/v1/generate
PORT=5000
```

---

## 🚀 Instalación y ejecución

### Backend (API)

1. Abrir una terminal y moverse al directorio `backend`:

   ```bash
   cd backend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Ejecutar el servidor:

   ```bash
   node server.js
   ```

### Frontend (React)

1. En otra terminal, moverse al directorio `frontend`:

   ```bash
   cd frontend
   ```

2. Instalar dependencias y ejecutar:

   ```bash
   npm install
   npm start
   ```

La aplicación React se iniciará en `http://localhost:3000` por defecto.

---

## 🧠 Endpoints del API (backend)

Todos los endpoints son **POST** y devuelven **JSON**.

### 1. Generar pregunta

* **Ruta:** `/generate-question`
* **Body JSON:**

  ```json
  { "documentText": "Texto completo del documento o fragmento" }
  ```
* **Respuesta:**

  ```json
  { "question": "[Pregunta]: ..." }
  ```

### 2. Evaluar respuesta

* **Ruta:** `/evaluate-answer`
* **Body JSON:**

  ```json
  {
    "userAnswer": "Respuesta del estudiante",
    "question": "Pregunta previamente generada"
  }
  ```
* **Respuesta:**

  ```json
  {
    "evaluation": "Correcto\nRespuesta del usuario: ...\nExplicación..."
  }
  ```

### 3. Recomendar recursos

* **Ruta:** `/recommend-resources`
* **Body JSON:**

  ```json
  {
    "question": "...",
    "userAnswer": "...",
    "evaluation": "..."
  }
  ```
* **Respuesta:**

  ```json
  {
    "recommendations": "Lista de recursos o enlaces en texto"
  }
  ```

---

## 🧩 Arquitectura y diseño

* **ApiLLM** (`backend/model/ApiLLM.js`): cliente HTTP genérico para llamar al servicio LLM. Envía un objeto con `model` y `messages`, y devuelve `response.data.choices[0].message.content`.
* **OrchestratorAgent** (`backend/orchestrator/OrchestratorAgent.js`): orquesta los tres agentes (Question, Evaluation, Recommendation) y selecciona los modelos por defecto (`llama3.1:8b`, `cogito:8b`, `gemma3:12b`).
* **Agentes** (`backend/agents/`): cada uno construye un *prompt* específico y usa `ApiLLM.call()` para obtener respuestas.

**Flujo típico:**

1. El frontend envía el texto del documento a `/generate-question`.
2. El `OrchestratorAgent` invoca a `QuestionAgent` para generar una pregunta.
3. El usuario responde en el frontend y envía su respuesta a `/evaluate-answer`.
4. `EvaluationAgent` formatea un prompt para evaluar la respuesta y generar una explicación.
5. Según el resultado, el frontend llama a `/recommend-resources` para obtener recursos adicionales.

---

## 🗂️ Ficheros clave

* `backend/server.js` — arranque y endpoints del servidor
* `backend/orchestrator/OrchestratorAgent.js` — coordinación de agentes
* `backend/model/ApiLLM.js` — cliente de llamadas a LLM
* `backend/agents/QuestionAgent.js`, `EvaluationAgent.js`, `RecommendationAgent.js` — lógica y prompts de cada agente

---

## 👨‍💻 Autor

**Francisco Javier Macías Villaécija**  
Ingeniero Informático  
[GitHub](https://github.com/FranMacias00)


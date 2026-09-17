# AI Service Implementation - Technical Explanation
## 1. Architecture Overview

The AI assistance service is implemented as a **separate microservice** using Express.js as the web framework. This service runs independently from the main backend on port 5100.

### File Structure:
```
ai-service/
├── src/
│   ├── index.js              # Express.js server setup
│   ├── config.js             # Configuration management
│   ├── constants.js          # Constants (categories, departments)
│   ├── routes/
│   │   └── ai.routes.js      # Express.js API routes
│   └── services/
│       ├── llm.js            # LLM integration (Gemini/OpenAI)
│       ├── heuristics.js     # Fallback algorithms
│       ├── faq.js            # FAQ chatbot logic
│       └── similar.js        # Similar case detection (MongoDB)
├── public/                    # Static HTML UI
└── package.json              # Dependencies (includes Express.js)
```

---

## 2. Express.js Implementation Details

### 2.1 Server Setup (`src/index.js`)

```javascript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import aiRoutes from './routes/ai.routes.js';

const app = express();

// Express.js middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(publicDir));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'adama-citizen-ai-service',
    provider: resolveEffectiveProvider(),
    port: config.port,
  });
});

// Mount AI routes
app.use('/api/ai', aiRoutes);

// Express.js error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

// Start Express.js server on port 5100
app.listen(config.port, () => {
  console.log(`[ai] Helper UI  → http://localhost:${config.port}`);
  console.log(`[ai] API        → http://localhost:${config.port}/api/ai`);
});
```

**Key Points:**
- Uses Express.js version 5.1.0 (latest)
- Implements RESTful API architecture
- Uses Express middleware (cors, helmet, json parser)
- Serves static files for the UI
- Provides HTTP endpoints for AI operations

---

### 2.2 API Routes (`src/routes/ai.routes.js`)

Express.js Router is used to define the API endpoints:

```javascript
import { Router } from 'express';

const router = Router();

// All routes use Express.js Router
router.get('/meta', ...);           // GET  /api/ai/meta
router.post('/categorize', ...);    // POST /api/ai/categorize
router.post('/improve', ...);       // POST /api/ai/improve
router.post('/similar', ...);       // POST /api/ai/similar
router.post('/assist', ...);        // POST /api/ai/assist
router.post('/triage', ...);        // POST /api/ai/triage
router.post('/resolution', ...);    // POST /api/ai/resolution
router.post('/chat', ...);          // POST /api/ai/chat

export default router;
```

---

## 3. AI Implementation Methods

The AI service uses a **hybrid approach** with three layers:

### Layer 1: Express.js (Web Framework)
- **Role**: HTTP server, API routing, request/response handling
- **Technology**: Express.js 5.1.0
- **Responsibility**: 
  - Accept HTTP requests from the frontend
  - Validate input data
  - Route requests to appropriate AI service functions
  - Return JSON responses

### Layer 2: LLM Integration (`services/llm.js`)
- **Role**: Connect to external AI providers
- **Technology**: 
  - Google Gemini API (free tier, default)
  - OpenAI GPT API (paid option)
- **Method**: 
  - Express.js receives the request
  - Constructs prompts for the AI model
  - Sends HTTP requests to Gemini/OpenAI APIs using `fetch()`
  - Receives AI-generated responses
  - Parses JSON and sends back through Express.js

**Code Example:**
```javascript
async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${config.geminiModel}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': config.geminiApiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json' },
    }),
  });
  const data = await res.json();
  return JSON.parse(data.candidates[0].content.parts[0].text);
}
```

### Layer 3: Heuristic Fallback (`services/heuristics.js`)
- **Role**: Provide offline AI-like functionality when API keys are unavailable
- **Technology**: Rule-based algorithms, keyword matching
- **Method**: Pure JavaScript logic running in Express.js

---

## 4. Express.js Dependencies

From `package.json`:

```json
{
  "name": "adama-citizen-ai-service",
  "version": "1.0.0",
  "type": "module",
  "dependencies": {
    "express": "^5.1.0",        ← Express.js web framework
    "cors": "^2.8.5",           ← Express middleware for CORS
    "helmet": "^8.1.0",         ← Express middleware for security
    "dotenv": "^16.5.0",        ← Environment configuration
    "mongoose": "^8.16.0"       ← MongoDB for similar case detection
  }
}
```

---

## 5. How It Works (Complete Flow)

```
┌─────────────┐         HTTP POST          ┌──────────────────┐
│   Frontend  │  ────────────────────────►  │   Express.js     │
│  (React)    │  /api/ai/assist            │   AI Service     │
└─────────────┘                             │   (Port 5100)    │
                                            └────────┬─────────┘
                                                     │
                                    ┌────────────────┴─────────────────┐
                                    │                                  │
                              ┌─────▼─────┐                   ┌───────▼────────┐
                              │  Gemini   │                   │   Heuristic    │
                              │   API     │                   │   Fallback     │
                              │ (Cloud)   │                   │   (Local)      │
                              └─────┬─────┘                   └───────┬────────┘
                                    │                                  │
                                    └────────────────┬─────────────────┘
                                                     │
┌─────────────┐      JSON Response         ┌────────▼─────────┐
│   Frontend  │  ◄──────────────────────   │   Express.js     │
│  Receives   │  { improved, classification│   Sends Result   │
│  AI Result  │     similar, provider }    └──────────────────┘
└─────────────┘
```

**Step-by-step:**
1. Citizen submits complaint through React frontend
2. Frontend sends HTTP POST to Express.js AI service
3. Express.js route handler receives request (`/api/ai/assist`)
4. Service extracts title, description, location from request body
5. Service calls LLM function (Gemini API or OpenAI API)
6. If API is available: sends prompt to cloud AI, receives response
7. If API fails: uses heuristic fallback (keyword-based logic)
8. Express.js formats response as JSON
9. Frontend receives AI suggestions and displays to user

---

## 6. Proof That Express.js Is Used

### Evidence 1: Package.json
```json
"dependencies": {
  "express": "^5.1.0"
}
```

### Evidence 2: Import Statement
```javascript
import express from 'express';
```

### Evidence 3: Express App Creation
```javascript
const app = express();
```

### Evidence 4: Express Middleware
```javascript
app.use(cors());
app.use(express.json());
```

### Evidence 5: Express Routes
```javascript
app.use('/api/ai', aiRoutes);
```

### Evidence 6: Express Server
```javascript
app.listen(5100, () => { ... });
```

---

## 7. Why Express.js Is Used (Not Direct AI Library)

**Express.js serves as the web server layer because:**

1. **AI APIs require HTTP communication**: Gemini and OpenAI are cloud services accessed via REST APIs. Express.js handles incoming HTTP requests from the frontend and outgoing HTTP requests to AI providers.

2. **Separation of concerns**: 
   - Express.js = Web server & API routing
   - LLM service = AI logic & API integration
   - Heuristics service = Fallback algorithms

3. **RESTful architecture**: The frontend needs a consistent API to communicate with the AI service. Express.js provides this API layer.

4. **Middleware support**: Express.js provides middleware for security (helmet), CORS, JSON parsing, error handling.

5. **Microservice architecture**: The AI service is a separate microservice that can be deployed independently. Express.js is the standard Node.js framework for building microservices.

---

## 8. AI Provider Integration

### Google Gemini (Default)
- **API**: REST API at `generativelanguage.googleapis.com`
- **Access**: HTTP fetch calls from Express.js
- **Authentication**: API key in HTTP headers
- **Model**: gemini-1.5-flash (configurable)

### OpenAI (Optional)
- **API**: REST API at `api.openai.com`
- **Access**: HTTP fetch calls from Express.js
- **Authentication**: Bearer token
- **Model**: gpt-4o-mini (configurable)

### Heuristic Fallback (Offline)
- **Technology**: Pure JavaScript algorithms
- **Runs inside Express.js**: No external calls
- **Methods**:
  - Keyword matching for categorization
  - Text capitalization fixes
  - Template-based response generation

---

## 9. Summary for Your Advisor

**YES, Express.js is definitely used to implement the AI assistant service.**

**What Express.js Does:**
- Provides the web server that runs on port 5100
- Defines REST API endpoints (`/api/ai/assist`, `/api/ai/chat`, etc.)
- Handles HTTP requests from the React frontend
- Manages routing, middleware, and error handling
- Serves the static AI helper UI

**What Express.js Does NOT Do:**
- It does not generate AI responses itself
- It does not contain machine learning algorithms
- It acts as a **coordinator** between the frontend and AI providers

**The Complete Tech Stack:**
- **Web Framework**: Express.js (HTTP server, API layer)
- **AI Providers**: Google Gemini API / OpenAI API (cloud-based LLMs)
- **Fallback**: JavaScript heuristics (rule-based logic)
- **Database**: MongoDB (for finding similar complaints)
- **Frontend Integration**: React app sends requests to Express.js

**Analogy:**
Think of Express.js as a **post office**:
- It receives letters (HTTP requests) from citizens (React frontend)
- It sends those letters to experts (Gemini/OpenAI AI services)
- It receives responses from experts
- It delivers responses back to citizens
- The post office (Express.js) doesn't write the responses itself, but it manages all the communication

---

## 10. Running the AI Service

```bash
cd ai-service
npm install          # Installs Express.js and dependencies
npm run dev          # Starts Express.js server on port 5100
```

Server output confirms Express.js is running:
```
[ai] Helper UI  → http://localhost:5100
[ai] API        → http://localhost:5100/api/ai
[ai] Provider   → gemini
```

---

**Conclusion**: Express.js is **absolutely** used to implement the AI assistant service. It serves as the web framework and API layer that connects the frontend to AI providers (Gemini/OpenAI) and fallback heuristics.

The AI service is a properly architected Node.js microservice using Express.js as its foundation.

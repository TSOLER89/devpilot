# ✈️ DevPilot

DevPilot is a full-stack AI-powered developer learning assistant built with React, ASP.NET Core, Ollama and OpenAI.

The application is designed to help developers learn and review programming concepts through an interactive conversational interface.

DevPilot focuses primarily on topics such as C#, .NET, ASP.NET Core, React, JavaScript, APIs, Git and modern web development.

---

## 🚀 Features

- AI-powered developer assistant
- Conversational follow-up questions
- Conversation memory
- React-based chat interface
- ASP.NET Core Web API backend
- Local Ollama integration
- OpenAI integration
- Markdown rendering for AI responses
- Syntax-friendly code blocks
- Suggested developer questions
- Topic navigation
- New Chat functionality
- Loading and thinking states
- Error handling
- Responsive design
- Mobile-friendly interface
- Sticky chat input
- Automatic scrolling to new AI responses

---

## 🧠 Example Questions

DevPilot can answer questions such as:

- What is dependency injection?
- Explain `useState` in React
- What is a REST API?
- What is the difference between C# and JavaScript?
- Give me a simple ASP.NET Core example
- Explain async/await
- What is Git?
- Explain this in simpler words
- Give me an example of that

Because DevPilot maintains conversation context, users can ask follow-up questions without repeating the original topic.

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- React Markdown
- remark-gfm

### Backend

- C#
- .NET 10
- ASP.NET Core Web API
- Dependency Injection
- REST API
- Data Annotations
- Swagger / OpenAPI

### AI

- Ollama local API (`qwen2.5-coder:7b`)
- OpenAI API
- OpenAI .NET SDK
- Responses API
- Conversation context using Ollama message history and OpenAI response IDs

### Development Tools

- Visual Studio
- Visual Studio Code
- Git
- GitHub
- Swagger

---

## 🏗️ Architecture

DevPilot uses a separated frontend and backend architecture.

```text
React / Vite
     │
     │ HTTP / JSON
     ▼
ASP.NET Core Web API
     │
     ▼
ChatController
     ├─────────────► OllamaService ──► Ollama local API
     │
     └─────────────► ChatService ──► OpenAiService ──► OpenAI API
```

📁 Project Structure
devpilot/
│
├── src/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── ChatInput.jsx
│ │ ├── ChatMessage.jsx
│ │ ├── ChatProviderSelector.jsx
│ │ ├── TopicSelector.jsx
│ │ └── SuggestedQuestions.jsx
│ │
│ ├── services/
│ │ └── chatApi.js
│ │
│ ├── App.jsx
│ ├── App.css
│ ├── index.css
│ └── main.jsx
│
├── backend/
│ └── DevPilot.Api/
│ ├── Controllers/
│ │ └── ChatController.cs
│ │
│ ├── Models/
│ │ ├── ChatRequest.cs
│ │ ├── ChatResponse.cs
│ │ └── AiResult.cs
│ │
│ ├── Services/
│ │ ├── IChatService.cs
│ │ ├── ChatService.cs
│ │ ├── IAiService.cs
│ │ ├── OpenAiService.cs
│ │ ├── IOllamaService.cs
│ │ └── OllamaService.cs
│ │
│ ├── Program.cs
│ └── DevPilot.Api.csproj
│
├── package.json
├── vite.config.js
└── README.md

▶️ Running the Project

DevPilot requires Node.js, the .NET 10 SDK, and Ollama. Ollama runs locally; React only communicates with the ASP.NET Core backend.

### Install and configure Ollama

Install Ollama for Windows, then download the configured model:

```powershell
ollama pull qwen2.5-coder:7b
ollama list
```

Ollama normally starts its local service automatically. If it is not running, start it with `ollama serve`. The backend defaults are in `backend/DevPilot.Api/appsettings.json`:

```json
{
  "Ollama": {
    "BaseUrl": "http://localhost:11434",
    "Model": "qwen2.5-coder:7b",
    "TimeoutSeconds": 120,
    "NumPredict": 400
  }
}
```

Override these values in `appsettings.Development.json` as needed. The timeout is in seconds.

### Start the backend and frontend

In the first terminal, from the repository root:

```powershell
dotnet run --project backend\DevPilot.Api\DevPilot.Api.csproj --launch-profile http
```

In a second terminal:

```powershell
npm install
npm run dev
```

Vite normally serves the frontend at `http://localhost:5173`. Configure `VITE_API_BASE_URL=http://localhost:5279` in the frontend `.env` file if it is not already set. The API Swagger UI is available at `http://localhost:5279/swagger`.

The frontend defaults to **Ollama (Local AI)** during development. Use the **AI provider** selector to switch to **OpenAI**. OpenAI still requires its API key to be configured on the backend, for example with:

```powershell
dotnet user-secrets set "OpenAI:ApiKey" "YOUR_API_KEY" --project backend\DevPilot.Api\DevPilot.Api.csproj
```

Both providers use the backend `POST /api/chat` endpoint. Ollama requests include recent conversation history and are sent with `stream: false`. Cancelling a request or starting a new chat aborts the pending frontend request.

### API example

```json
{
  "message": "Explain dependency injection",
  "provider": "ollama",
  "mode": "explain",
  "topic": ".NET",
  "conversationHistory": []
}
```

### Validation

```powershell
npm run build
npm test
npm run lint
dotnet build backend\DevPilot.Api\DevPilot.Api.csproj
```

The API currently has no dedicated backend test project.
📱 Responsive Design

DevPilot is designed to work across:

Desktop
Tablet
Mobile

The interface uses responsive CSS and adapts chat messages, navigation and controls depending on screen size.

🎯 Learning Goals

DevPilot was created as a learning and portfolio project while studying .NET system development.

The project provides practical experience with:

React component architecture
React Hooks
useState
useRef
useEffect
Props
Event handling
Async JavaScript
Fetch API
REST APIs
JSON
C#
ASP.NET Core
Controllers
Service layer architecture
Interfaces
Dependency Injection
async/await
Request validation
CORS
Swagger
External API integration
Secure secrets management
AI integration
Git and GitHub

👩‍💻 Author

Developed by Tsoler Hayitian

.NET System Developer student

GitHub: TSOLER89

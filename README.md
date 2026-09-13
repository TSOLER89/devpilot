# ✈️ DevPilot

DevPilot is a full-stack AI-powered developer learning assistant built with React, ASP.NET Core and OpenAI.

The application is designed to help developers learn and review programming concepts through an interactive conversational interface.

DevPilot focuses primarily on topics such as C#, .NET, ASP.NET Core, React, JavaScript, APIs, Git and modern web development.

---

## 🚀 Features

- AI-powered developer assistant
- Conversational follow-up questions
- Conversation memory
- React-based chat interface
- ASP.NET Core Web API backend
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

- OpenAI API
- OpenAI .NET SDK
- Responses API
- Conversation context using response IDs

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
     │
     ▼
IChatService
     │
     ▼
ChatService
     │
     ▼
IAiService
     │
     ▼
OpenAiService
     │
     ▼
OpenAI API
```

📁 Project Structure
devpilot/
│
├── src/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── ChatInput.jsx
│ │ ├── ChatMessage.jsx
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
│ │ └── OpenAiService.cs
│ │
│ ├── Program.cs
│ └── DevPilot.Api.csproj
│
├── package.json
├── vite.config.js
└── README.md

▶️ Running the Project

DevPilot requires both the React frontend and ASP.NET Core backend to run.

1. Clone the repository
   git clone https://github.com/TSOLER89/devpilot.git
   cd devpilot
2. Install frontend dependencies
   npm install
3. Start the React frontend
   npm run dev

Vite will display the local development address, normally:

http://localhost:5173

4. Start the ASP.NET Core API

Run the backend from Visual Studio or:

dotnet run

The API runs locally using HTTPS.

📖 Swagger

Swagger is available during development for testing the API.

Example:

https://localhost:7040/swagger

The main chat endpoint is:

POST /api/chat

Example request:

{
"message": "Explain dependency injection",
"previousResponseId": null
}

Example response:

{
"answer": "Dependency injection is...",
"responseId": "response-id"
}
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

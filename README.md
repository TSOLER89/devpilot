# DevPilot

DevPilot is a responsive developer learning assistant built with React and Vite.

The project is designed to help developers practice and review programming concepts such as React, JavaScript, C#, .NET and Git through an interactive chat interface.

This project is being developed step by step as part of my journey as a .NET System Developer.

## Features

- Interactive chat interface
- Topic-based navigation
- Predefined developer-focused responses
- Send messages using the button or Enter key
- Responsive design for desktop, tablet and mobile
- Reusable React components

## Topics

DevPilot currently supports questions about:

- React
- JavaScript
- C#
- .NET
- Git

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS

### Development Tools

- Git
- GitHub
- Visual Studio Code

## Project Structure

```text
src/
├── components/
│   ├── Header.jsx
│   ├── ChatInput.jsx
│   ├── ChatMessage.jsx
│   └── TopicSidebar.jsx
│
├── data/
│   └── botResponses.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx
```

Getting Started

Clone the repository:

git clone <https://github.com/TSOLER89/devpilot.git>

Navigate to the project:

cd devpilot

Install dependencies:

npm install

Start the development server:

npm run dev

Then open the local URL displayed by Vite in your browser.

Current Architecture

React Components
│
▼
App State
│
▼
JavaScript Response Logic

Currently, DevPilot uses local JavaScript logic to generate responses.

Roadmap

Future development will include:

ASP.NET Core Web API
C# backend
REST API communication between React and .NET
Database integration
CRUD functionality
Saved questions
Quiz functionality
Improved developer learning features
React Native mobile application

The goal is to evolve DevPilot into a full-stack application where the web and mobile clients can communicate with the same ASP.NET Core backend.

Learning Goals

This project is used to practice:

Component-based development with React
JSX
Props
State with useState
Event handling
JavaScript arrays and .map()
Responsive CSS
Git version control
Frontend architecture

Later stages will focus on C#, ASP.NET Core, REST APIs and database development.

import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import { getBotResponse } from "./Data/botResponses";

function App() {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      message: "Hi! I'm DevPilot. What would you like to learn today?",
    },
  ]);

  const getBotResponse = (message) => {
  const question = message.toLowerCase();

  if (question.includes("react")) {
    return "React is a JavaScript library for building user interfaces with reusable components.";
  }

  if (question.includes("c#")) {
    return "C# is a programming language commonly used with .NET to build APIs, web applications, desktop applications and more.";
  }

  if (question.includes("javascript")) {
    return "JavaScript is a programming language used to make web pages interactive.";
  }

  if (question.includes("git")) {
    return "Git is a version control system that keeps track of changes in your project.";
  }

  return "I don't know that yet, but I'm still learning!";
};


 const handleSend = () => {
  if (input.trim() === "") {
    return;
  }

  const userMessage = {
    id: Date.now(),
    role: "user",
    message: input,
  };

  const botMessage = {
    id: Date.now() + 1,
    role: "assistant",
    message: getBotResponse(input),
  };

  setMessages([...messages, userMessage, botMessage]);

  setInput("");
};

  return (
    <div className="app">
      <Header />

      <main className="chat-container">
        {messages.map((item) => (
          <ChatMessage
            key={item.id}
            role={item.role}
            message={item.message}
          />
        ))}

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </main>
    </div>
  );
}

export default App;
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
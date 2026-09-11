import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

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

    const newMessage = {
      id: Date.now(),
      role: "user",
      message: input,
    };

    setMessages([...messages, newMessage]);

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
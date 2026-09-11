import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

function App() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    console.log(input);
  };

  return (
    <div className="app">
      <Header />

      <main className="chat-container">
        <ChatMessage
          role="assistant"
          message="Hi! I'm DevPilot. What would you like to learn today?"
        />

        <ChatMessage
          role="user"
          message="What is React?"
        />

        <ChatMessage
          role="assistant"
          message="React is a JavaScript library for building user interfaces with reusable components."
        />

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
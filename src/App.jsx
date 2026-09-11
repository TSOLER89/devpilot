import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

import TopicSidebar from "./components/TopicSidebar";
import SuggestedQuestions from "./components/SuggestedQuestions";

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

  const handleTopicSelect = (topic) => {
  setInput(`Explain ${topic}`);
};

const handleQuestionSelect = (question) => {
  setInput(question);
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

        <div className="main-layout">
      <TopicSidebar onSelectTopic={handleTopicSelect} />

      <main className="chat-container">
        {messages.map((item) => (
          <ChatMessage
            key={item.id}
            role={item.role}
            message={item.message}
          />
        ))}

        <SuggestedQuestions
            onSelectQuestion={handleQuestionSelect}
        />

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
        />
      </main>
    </div>
    </div>
  );
} 

export default App;
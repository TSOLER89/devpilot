import { useState, useRef } from "react";
import "./App.css";

import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";

import TopicSelector from "./components/TopicSelector";
import SuggestedQuestions from "./components/SuggestedQuestions";

import { getBotResponse } from "./Data/botResponses";


const initialMessages = [];

function App() {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const [messages, setMessages] = useState(initialMessages);

  const handleNewChat = () => {
  setMessages(initialMessages);
  setInput("");
  inputRef.current?.focus();
};
  const handleTopicSelect = (topic) => {
  setInput(`Explain ${topic}`);
  inputRef.current.focus();
};

const handleQuestionSelect = (question) => {
  setInput(question);
  inputRef.current.focus();
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
    <Header onNewChat={handleNewChat} />

    <main className="main-content">

      <TopicSelector
        onSelectTopic={handleTopicSelect}
      />

      <section className="chat-panel">

        <div className="welcome-section">
          <span className="welcome-icon">✈</span>

          <h2>Hi! I'm DevPilot.</h2>

          <p>
            What would you like to learn today?
          </p>
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          onSend={handleSend}
          inputRef={inputRef}
        />

        <div className="messages-container">
          {messages.map((item) => (
            <ChatMessage
              key={item.id}
              role={item.role}
              message={item.message}
            />
          ))}
        </div>

        {messages.length === 0 && (
          <SuggestedQuestions
            onSelectQuestion={handleQuestionSelect}
          />
        )}

      </section>

    </main>
  </div>
);
}

export default App;
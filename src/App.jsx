import { useState, useRef, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import TopicSelector from "./components/TopicSelector";
import SuggestedQuestions from "./components/SuggestedQuestions";
import DeveloperModeSelector from "./components/DeveloperModeSelector";

import { sendChatMessage } from "./services/chatApi";

const initialMessages = [];

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  
  const [previousResponseId, setPreviousResponseId] = useState(null);

  const [selectedMode, setSelectedMode] = useState("explain");

  const inputRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const lastMessage = messages[messages.length - 1];

    // Scroll only when DevPilot's answer arrives
    if (lastMessage.role === "assistant") {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  const handleNewChat = () => {
    setMessages(initialMessages);
    setInput("");
    setPreviousResponseId(null);

    inputRef.current?.focus();
  };

  const handleTopicSelect = (topic) => {
    setInput(`Explain ${topic}`);
    inputRef.current?.focus();
  };

  const handleQuestionSelect = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleSend = async () => {
    const message = input.trim();

    if (message === "" || isLoading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      message: message,
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
    ]);

    setInput("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage(
        message,
        previousResponseId,
        selectedMode
      );

      setPreviousResponseId(data.responseId);

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        message: data.answer,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        botMessage,
      ]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
      message: `⚠️ ${error.message}`,
      };

      setMessages((currentMessages) => [
        ...currentMessages,
        errorMessage,
      ]);

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header onNewChat={handleNewChat} />

      <main className="main-content">
          <div className="learning-controls">
            <TopicSelector
              onSelectTopic={handleTopicSelect}
            />

            <DeveloperModeSelector
              selectedMode={selectedMode}
              onSelectMode={setSelectedMode}
            />
          </div>

        <section className="chat-panel">
          <div className="welcome-section">
            <span className="welcome-icon">✈</span>

            <h2>Welcome aboard the Development Flight</h2>

            <p>
              What would you like to learn today?
            </p>
          </div>

          {messages.length === 0 && (
            <SuggestedQuestions
              onSelectQuestion={handleQuestionSelect}
            />
          )}

          <div className="messages-container">
            {messages.map((item, index) => {
              const isLastMessage =
                index === messages.length - 1;

              return (
                <div
                  key={item.id}
                  ref={
                    isLastMessage && item.role === "assistant"
                      ? lastMessageRef
                      : null
                  }
                  className="message-anchor"
                >
                  <ChatMessage
                    role={item.role}
                    message={item.message}
                  />
                </div>
              );
            })}

               {isLoading && (
              <div className="thinking-message">
                <span>DevPilot is thinking</span>

                <span className="thinking-dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            )}
          </div>

          <div className="chat-input-wrapper">
            <ChatInput
              input={input}
              setInput={setInput}
              onSend={handleSend}
              inputRef={inputRef}
              isLoading={isLoading}
              selectedMode={selectedMode}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
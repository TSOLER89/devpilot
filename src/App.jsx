import { useState, useRef, useEffect } from "react";
import "./App.css";

import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";
import ChatInput from "./components/ChatInput";
import TopicSelector from "./components/TopicSelector";
import SuggestedQuestions from "./components/SuggestedQuestions";
import DeveloperModeSelector from "./components/DeveloperModeSelector";
import ChatProviderSelector from "./components/ChatProviderSelector";
import FlyingLogo from "./components/FlyingLogo";
import QuizAcademy from "./components/QuizAcademy";

import { sendChatMessage } from "./services/chatApi";

const initialMessages = [];

function App() {
  const [activeView, setActiveView] = useState("chat");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(
    import.meta.env.DEV ? "ollama" : "openai"
  );
  
  const [previousResponseId, setPreviousResponseId] = useState(null);

  const [selectedMode, setSelectedMode] = useState("explain");

  const [selectedTopic, setSelectedTopic] = useState(null);

  const inputRef = useRef(null);
  const lastMessageRef = useRef(null);
  const activeRequestRef = useRef(0);
  const requestControllerRef = useRef(null);

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

  useEffect(() => () => {
    activeRequestRef.current += 1;
    requestControllerRef.current?.abort();
  }, []);

  const handleNewChat = () => {
    activeRequestRef.current += 1;
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setMessages(initialMessages);
    setInput("");
    setIsLoading(false);
    setPreviousResponseId(null);
    setSelectedMode("explain");
    setSelectedTopic(null);

    inputRef.current?.focus();
  };

const handleTopicSelect = (topic) => {
  setSelectedTopic(topic);

  const prompts = {
    explain: `Explain ${topic}`,
    debug: `Help me debug ${topic}`,
    improve: `Help me improve my ${topic} code`,
    error: `Explain an error in ${topic}`,
    quiz: `Quiz me on ${topic}`,
    teach: `Teach me about ${topic}`,
    plan: `Help me plan a ${topic} project`,
  };

  setInput(prompts[selectedMode] ?? `Explain ${topic}`);

  inputRef.current?.focus();
};

  const handleQuestionSelect = (question) => {
    setInput(question);
    inputRef.current?.focus();
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setPreviousResponseId(null);
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

    const requestId = activeRequestRef.current + 1;
    activeRequestRef.current = requestId;
    const requestController = new AbortController();
    requestControllerRef.current = requestController;

    setInput("");
    setIsLoading(true);

    try {
      const conversationHistory =
        selectedProvider === "ollama"
          ? messages.slice(-20).map(({ role, message: content }) => ({
              role,
              content,
            }))
          : undefined;

      const data = await sendChatMessage({
        message,
        previousResponseId,
        mode: selectedMode,
        topic: selectedTopic,
        provider: selectedProvider,
        conversationHistory,
        signal: requestController.signal,
      });

      if (requestId !== activeRequestRef.current) {
        return;
      }

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
      if (requestId !== activeRequestRef.current) {
        return;
      }

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
      if (requestId === activeRequestRef.current) {
        requestControllerRef.current = null;
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="app">
      <Header onNewChat={handleNewChat} onHome={() => setActiveView("chat")} />

      <main className="main-content">
        <nav className="view-navigation" aria-label="Main navigation">
          <button
            type="button"
            aria-current={activeView === "chat" ? "page" : undefined}
            onClick={() => setActiveView("chat")}
          >
            Chat
          </button>
          <button
            type="button"
            aria-current={activeView === "quiz" ? "page" : undefined}
            onClick={() => setActiveView("quiz")}
          >
            Quiz Academy
          </button>
        </nav>

        <div hidden={activeView !== "chat"}>
          <div className="learning-controls">
            <TopicSelector
              selectedTopic={selectedTopic}
              onSelectTopic={handleTopicSelect}
            />

            <DeveloperModeSelector
              selectedMode={selectedMode}
              onSelectMode={setSelectedMode}
            />

            <ChatProviderSelector
              selectedProvider={selectedProvider}
              onSelectProvider={handleProviderSelect}
              disabled={isLoading}
            />
          </div>

        <section className={`chat-panel${messages.length === 0 ? " chat-panel--empty" : ""}`}>
          {messages.length === 0 && (
            <div className="welcome-section">
              <FlyingLogo isLoading={isLoading} />

              <h2>Welcome aboard the Development Flight</h2>

              <p>
                What would you like to learn today?
              </p>
            </div>
          )}

          {messages.length === 0 && (
            <SuggestedQuestions
              onSelectQuestion={handleQuestionSelect}
              selectedMode={selectedMode}
            />
          )}

          <div
            className="messages-container"
            role="log"
            aria-label="Conversation with DevPilot"
            aria-live="polite"
            aria-relevant="additions text"
          >
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

          </div>

          <div
            className={isLoading ? "thinking-message" : "sr-only"}
            role="status"
            aria-atomic="true"
          >
            {isLoading && (
              <>
                <FlyingLogo isLoading={isLoading} />

                <div className="thinking-message-content">
                  <span>DevPilot is thinking</span>

                  <span className="thinking-dots" aria-hidden="true">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </div>
              </>
            )}
          </div>

          {!isLoading && (
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
          )}
        </section>
        </div>

        <div hidden={activeView !== "quiz"}>
          <QuizAcademy />
        </div>
      </main>
    </div>
  );
}

export default App;

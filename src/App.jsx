import "./App.css";
import Header from "./components/Header";
import ChatMessage from "./components/ChatMessage";

function App() {
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
      </main>
    </div>
  );
}

export default App;
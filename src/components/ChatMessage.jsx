import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessage({ role, message }) {
  const isAssistant = role === "assistant";

  return (
    <div className={`message ${role}`}>
      <span className="sr-only">{isAssistant ? "DevPilot: " : "You: "}</span>
      {isAssistant ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message}
        </ReactMarkdown>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default ChatMessage;

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import CodeBlock from "./CodeBlock";

const markdownComponents = { pre: CodeBlock };

function ChatMessage({ role, message }) {
  const isAssistant = role === "assistant";

  return (
    <div className={`message ${role}`}>
      <span className="sr-only">{isAssistant ? "DevPilot: " : "You: "}</span>
      {isAssistant ? (
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={markdownComponents}
        >
          {message}
        </ReactMarkdown>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
}

export default ChatMessage;

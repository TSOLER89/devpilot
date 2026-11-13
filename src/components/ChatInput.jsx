function ChatInput({
  input,
  setInput,
  onSend,
  inputRef,
  isLoading,
  selectedMode,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoading) {
      onSend();
    }
  };

  const placeholders = {
  explain: "Ask DevPilot to explain something...",
  debug: "Paste your code or describe the bug...",
  improve: "Paste code you want to improve...",
  error: "Paste the error message here...",
  quiz: "Enter a topic you want to be quizzed on...",
  teach: "What would you like DevPilot to teach you?",
  plan: "What would you like to plan?",
};

const placeholder =
  placeholders[selectedMode] ?? "Ask DevPilot something...";

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="chat-message">
        Message to DevPilot
      </label>
      <input
        id="chat-message"
        ref={inputRef}
        type="text"
        placeholder={
          isLoading
            ? "DevPilot is preparing your response..."
            : placeholder
        }
        value={input}
        onChange={(event) => setInput(event.target.value)}
        disabled={isLoading}
      />

      <button
        type="submit"
        disabled={isLoading || input.trim() === ""}
      >
        {isLoading ? "Flying..." : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;

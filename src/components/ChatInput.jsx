function ChatInput({
  input,
  setInput,
  onSend,
  inputRef,
  isLoading,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isLoading) {
      onSend();
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder={
          isLoading
            ? "DevPilot is preparing your response..."
            : "Ask DevPilot something..."
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
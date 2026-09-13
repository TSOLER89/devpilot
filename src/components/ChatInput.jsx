function ChatInput({ 
  input, 
  setInput, 
  onSend,
  inputRef, 
  isLoading
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSend();
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask DevPilot something..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
        ref={inputRef}
      />

      <button type="submit"
        disabled={isLoading || input.trim() === ""}
      >
        {isLoading ? "Flying..." : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;
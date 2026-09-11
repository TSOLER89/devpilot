function ChatInput({ input, setInput, onSend }) {
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
      />

      <button type="submit">
        Send
      </button>
    </form>
  );
}

export default ChatInput;
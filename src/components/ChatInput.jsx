function ChatInput({ input, setInput, onSend }) {
  return (
    <div className="chat-input">
      <input
        type="text"
        placeholder="Ask DevPilot something..."
        value={input}
        onChange={(event) => setInput(event.target.value)}
      />

      <button onClick={onSend}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;
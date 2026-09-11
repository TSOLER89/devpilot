function ChatMessage({ role, message }) {
  return (
    <div className={`message ${role}`}>
      <p>{message}</p>
    </div>
  );
}

export default ChatMessage;
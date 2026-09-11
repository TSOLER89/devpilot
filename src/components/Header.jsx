function Header({ onNewChat }) {
  return (
    <header className="header">
      <div className="brand">
        <h1>
          DevPilot <span className="plane-icon">✈</span>
        </h1>

        <p>Welcome aboard the Development Flight</p>
      </div>

      <button
        className="new-chat-button"
        onClick={onNewChat}
      >
        + New Chat
      </button>
    </header>
  );
}

export default Header;
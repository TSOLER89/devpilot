function Header({ onNewChat, onHome }) {
  return (
    <header className="header">
      <div className="brand">
        <h1>
          <button
            className="brand-home-button"
            type="button"
            onClick={onHome}
            aria-label="DevPilot Home, go to Chat"
          >
          DevPilot <span className="plane-icon">✈</span>
          </button>
        </h1>

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

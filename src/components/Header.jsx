import { useEffect, useState } from "react";

const soundPreferenceKey = "devpilot.soundEnabled";

function Header({ onNewChat, onHome }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    try {
      return localStorage.getItem(soundPreferenceKey) === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(soundPreferenceKey, String(soundEnabled));
    } catch {
      // Keep the toggle usable when browser storage is unavailable.
    }
  }, [soundEnabled]);

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

      <div className="header-actions">
        <button
          className="sound-toggle-button"
          type="button"
          aria-label="Sound effects"
          aria-pressed={soundEnabled}
          title={soundEnabled ? "Turn sound off" : "Turn sound on"}
          onClick={() => setSoundEnabled((enabled) => !enabled)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            {soundEnabled ? (
              <>
                <path d="M15 8a6 6 0 0 1 0 8" />
                <path d="M18 5a10 10 0 0 1 0 14" />
              </>
            ) : (
              <path d="m16 9 6 6m0-6-6 6" />
            )}
          </svg>
        </button>

        <button
          className="new-chat-button"
          onClick={onNewChat}
        >
          + New Chat
        </button>
      </div>
    </header>
  );
}

export default Header;

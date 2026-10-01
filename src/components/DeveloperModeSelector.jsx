const modes = [
  { id: "explain", label: "Explain" },
  { id: "debug", label: "Debug" },
  { id: "improve", label: "Improve" },
  { id: "error", label: "Explain error" },
  { id: "quiz", label: "Quiz me" },
];

function DeveloperModeSelector({ selectedMode, onSelectMode }) {
  return (
    <section className="developer-modes">
      <p className="developer-modes-label">
        What would you like DevPilot to do?
      </p>

      <div className="developer-mode-buttons">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            className={
              selectedMode === mode.id
                ? "developer-mode-button active"
                : "developer-mode-button"
            }
            onClick={() => onSelectMode(mode.id)}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default DeveloperModeSelector;
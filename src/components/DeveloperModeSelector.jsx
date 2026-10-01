import { useRef } from "react";

const modes = [
  { id: "explain", label: "Explain" },
  { id: "debug", label: "Debug" },
  { id: "improve", label: "Improve" },
  { id: "error", label: "Explain error" },
  { id: "quiz", label: "Quiz me" },
];

function DeveloperModeSelector({
  selectedMode,
  onSelectMode,
}) {
  const detailsRef = useRef(null);

  const selectedModeLabel =
    modes.find((mode) => mode.id === selectedMode)?.label ??
    "Explain";

  const handleSelect = (mode) => {
    onSelectMode(mode.id);

    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details
      className="developer-mode-selector"
      ref={detailsRef}
    >
      <summary className="mode-button">
        Mode: {selectedModeLabel}
      </summary>

      <div className="mode-menu">
        {modes.map((mode) => (
          <button
            key={mode.id}
            type="button"
            onClick={() => handleSelect(mode)}
          >
            {mode.label}
          </button>
        ))}
      </div>
    </details>
  );
}

export default DeveloperModeSelector;
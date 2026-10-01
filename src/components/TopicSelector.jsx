import { useRef } from "react";

const topics = [
  ".NET",
  "React",
  "JavaScript",
  "C#",
  "API",
  "HTML",
  "CSS",
  "Git",
];

function TopicSelector({ 
  selectedTopic,
  onSelectTopic }) {
  const detailsRef = useRef(null);

  const handleSelect = (topic) => {
    onSelectTopic(topic);

    // Close the dropdown after choosing a topic
    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details className="topic-selector" ref={detailsRef}>
          <summary className="route-button">
        {selectedTopic
          ? `Route: ${selectedTopic}`
          : "Choose your route"}
      </summary>

      <div className="route-menu">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => handleSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </details>
  );
}

export default TopicSelector;
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

function TopicSelector({ onSelectTopic }) {
  const handleChange = (event) => {
    const selectedTopic = event.target.value;

    if (selectedTopic) {
      onSelectTopic(selectedTopic);
    }
  };

  return (
    <div className="topic-selector">
      <label htmlFor="topic-select">Choose your route</label>

      <select
        id="topic-select"
        defaultValue=""
        onChange={handleChange}
      >
        <option value="" disabled>
          Select a development topic
        </option>

        {topics.map((topic) => (
          <option key={topic} value={topic}>
            {topic}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TopicSelector;
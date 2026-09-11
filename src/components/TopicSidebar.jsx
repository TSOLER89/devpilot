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

function TopicSidebar({ onSelectTopic }) {
  return (
    <aside className="sidebar">
      <h2>Topics</h2>

      <div className="topic-list">
        {topics.map((topic) => (
          <button
            key={topic}
            className="topic-button"
            onClick={() => onSelectTopic(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </aside>
  );
}

export default TopicSidebar;
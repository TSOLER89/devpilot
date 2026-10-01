const questionsByMode = {
  explain: [
    "What is dependency injection?",
    "What is a REST API?",
    "Explain useEffect in React",
  ],

  debug: [
    "Why is my API returning 500?",
    "Why is this React component not updating?",
    "Help me debug a null reference error",
  ],

  improve: [
    "How can I improve this C# method?",
    "Can you simplify this React component?",
    "How can I make this API cleaner?",
  ],

  error: [
    "Explain NullReferenceException",
    "What does CORS error mean?",
    "Explain this build error",
  ],

  quiz: [
    "Quiz me on C#",
    "Quiz me on React",
    "Quiz me on REST APIs",
  ],
};

function SuggestedQuestions({
  onSelectQuestion,
  selectedMode,
}) {
  const questions =
    questionsByMode[selectedMode] ??
    questionsByMode.explain;

  return (
    <section className="suggested-questions">
      <h3>Try asking</h3>

      <div className="question-list">
        {questions.map((question) => (
          <button
            key={question}
            className="question-button"
            onClick={() => onSelectQuestion(question)}
          >
            {question}
          </button>
        ))}
      </div>
    </section>
  );
}

export default SuggestedQuestions;
const questions = [
  "What is React?",
  "What is useEffect?",
  "What is a REST API?",
  "What is dependency injection?",
  "Explain how useEffect works?"
];

function SuggestedQuestions({ onSelectQuestion }) {
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
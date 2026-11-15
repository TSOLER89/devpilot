import { getSuggestedQuestions } from "../Data/chatSuggestions";

function SuggestedQuestions({
  onSelectQuestion,
  selectedMode,
  selectedTopic,
}) {
  const questions = getSuggestedQuestions(selectedTopic, selectedMode);

  return (
    <section className="suggested-questions">
      <h3>Try asking</h3>

      <div className="question-list">
        {questions.map((question) => (
          <button
            type="button"
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

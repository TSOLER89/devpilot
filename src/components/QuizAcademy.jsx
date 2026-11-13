import { useState } from "react";
import { quizQuestions } from "../Data/quizQuestions";

function QuizAcademy() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [recordedAnswers, setRecordedAnswers] = useState({});
  const isCompleted = currentQuestionIndex >= quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const correctCount = quizQuestions.filter(
    (question) => recordedAnswers[question.id] === question.correctAnswer,
  ).length;
  const score = correctCount * 10;
  const accuracy = Math.round((correctCount / quizQuestions.length) * 100);

  const handleNextQuestion = (event) => {
    event.preventDefault();

    if (selectedAnswer === null || isCompleted) {
      return;
    }

    setRecordedAnswers((answers) => ({
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    }));
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setRecordedAnswers({});
    setSelectedAnswer(null);
  };

  return (
    <section className="quiz-academy" aria-labelledby="quiz-title">
      <h2 id="quiz-title">Quiz Academy</h2>
      <p className="quiz-introduction">Practice the basics of C#, one question at a time.</p>

      <div className="quiz-card">
        <p className="quiz-progress" role="status" aria-atomic="true">
          {isCompleted
            ? "Flight Completed!"
            : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
        </p>

        {isCompleted ? (
          <div className="quiz-results">
            <dl className="quiz-summary">
              <div>
                <dt>Total score</dt>
                <dd>{score} / {quizQuestions.length * 10} points</dd>
              </div>
              <div>
                <dt>Correct answers</dt>
                <dd>{correctCount} of {quizQuestions.length}</dd>
              </div>
              <div>
                <dt>Accuracy</dt>
                <dd>{accuracy}%</dd>
              </div>
            </dl>

            <h3>Question review</h3>
            <ol className="quiz-review">
              {quizQuestions.map((question) => {
                const userAnswer = recordedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <li className="quiz-review-item" key={question.id}>
                    <h4>{question.question}</h4>
                    <p className="quiz-review-verdict">
                      {isCorrect ? "Correct" : "Incorrect"}
                    </p>
                    <p><strong>Your answer:</strong> {userAnswer}</p>
                    {!isCorrect && (
                      <p><strong>Correct answer:</strong> {question.correctAnswer}</p>
                    )}
                    <p className="quiz-explanation">{question.explanation}</p>
                  </li>
                );
              })}
            </ol>

            <button className="quiz-next-button" type="button" onClick={handleRestart}>
              Try Again
            </button>
          </div>
        ) : (
          <form onSubmit={handleNextQuestion}>
            <fieldset className="quiz-question" key={currentQuestion.id}>
              <legend>{currentQuestion.question}</legend>
              <div className="quiz-answers">
                {currentQuestion.answers.map((answer) => (
                  <label className="quiz-answer" key={answer}>
                    <input
                      type="radio"
                      name="quiz-answer"
                      value={answer}
                      checked={selectedAnswer === answer}
                      onChange={() => setSelectedAnswer(answer)}
                    />
                    <span>{answer}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              className="quiz-next-button"
              type="submit"
              disabled={selectedAnswer === null}
            >
              Next Question
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default QuizAcademy;

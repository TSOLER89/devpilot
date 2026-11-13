import { useState } from "react";
import { quizQuestions } from "../Data/quizQuestions";

function QuizAcademy() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const isCompleted = currentQuestionIndex >= quizQuestions.length;
  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleNextQuestion = (event) => {
    event.preventDefault();

    if (selectedAnswer === null || isCompleted) {
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    setSelectedAnswer(null);
  };

  return (
    <section className="quiz-academy" aria-labelledby="quiz-title">
      <h2 id="quiz-title">Quiz Academy</h2>
      <p className="quiz-introduction">Practice the basics of C#, one question at a time.</p>

      <div className="quiz-card">
        <p className="quiz-progress" role="status" aria-atomic="true">
          {isCompleted
            ? "Quiz completed"
            : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
        </p>

        {isCompleted ? (
          <p>You have completed all five C# beginner questions.</p>
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

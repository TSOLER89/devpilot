import { useEffect, useRef, useState } from "react";
import { getQuizQuestions, quizRoutes, quizDifficulties } from "../Data/quizCatalog";
import { playQuizCompletionSound, stopQuizSounds } from "../services/quizSounds";
import AviatorCompanion from "./AviatorCompanion";

function QuizAcademy({ soundEnabled = false }) {
  const submittedQuestions = useRef(new Set());
  const advanceTimer = useRef(null);
  const soundEnabledRef = useRef(soundEnabled);
  const [hasStarted, setHasStarted] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("C#");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Beginner");
  const quizQuestions = getQuizQuestions(selectedRoute, selectedDifficulty);
  const canStartQuiz = quizQuestions.length > 0;
  const [isCelebrating, setIsCelebrating] = useState(false);
  const [isEncouraging, setIsEncouraging] = useState(false);
  const isReacting = isCelebrating || isEncouraging;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [recordedAnswers, setRecordedAnswers] = useState({});
  const [showReview, setShowReview] = useState(false);
  const isCompleted = hasStarted && currentQuestionIndex >= quizQuestions.length;
  const companionStage = !hasStarted ? "welcome" : isCompleted ? "completed" : "active";
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progressPercent = canStartQuiz ? Math.min(((currentQuestionIndex + 1) / quizQuestions.length) * 100, 100) : 0;
  const correctCount = quizQuestions.filter(
    (question) => recordedAnswers[question.id] === question.correctAnswer,
  ).length;
  const score = correctCount * 10;
  const accuracy = canStartQuiz ? Math.round((correctCount / quizQuestions.length) * 100) : 0;

  useEffect(() => {
    soundEnabledRef.current = soundEnabled;
    if (!soundEnabled) {
      stopQuizSounds();
    }

    return stopQuizSounds;
  }, [soundEnabled]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const handleNextQuestion = (event) => {
    event.preventDefault();

    if (!hasStarted || selectedAnswer === null || isCompleted) {
      return;
    }

    // Refs update immediately, even before React renders the next question.
    if (submittedQuestions.current.has(currentQuestion.id)) {
      return;
    }
    submittedQuestions.current.add(currentQuestion.id);

    setRecordedAnswers((answers) => ({
      ...answers,
      [currentQuestion.id]: selectedAnswer,
    }));
    const advanceQuestion = () => {
      setIsCelebrating(false);
      setIsEncouraging(false);
      if (currentQuestionIndex === quizQuestions.length - 1) {
        void playQuizCompletionSound(soundEnabledRef.current);
      }
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    };

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setIsCelebrating(true);
      advanceTimer.current = setTimeout(advanceQuestion, 650);
    } else {
      setIsEncouraging(true);
      advanceTimer.current = setTimeout(advanceQuestion, 650);
    }
  };

  const handleRestart = () => {
    setShowReview(false);
    clearTimeout(advanceTimer.current);
    setIsCelebrating(false);
    setIsEncouraging(false);
    stopQuizSounds();
    submittedQuestions.current.clear();
    setCurrentQuestionIndex(0);
    setRecordedAnswers({});
    setSelectedAnswer(null);
    setHasStarted(false);
  };

  return (
    <section className="quiz-academy" aria-labelledby="quiz-title">
      <h2 id="quiz-title">Put your seatbelt on and get ready to the test</h2>
      <p className="quiz-introduction">Practice {selectedDifficulty.toLowerCase()} {selectedRoute}, one question at a time.</p>

      <div className="quiz-companion-layout">
        <AviatorCompanion
          stage={companionStage}
          compact={isCompleted}
          isCelebrating={isCelebrating}
          isEncouraging={isEncouraging}
        />
        <div className="quiz-card">
        {hasStarted && (
          <button className="quiz-back-button" type="button" onClick={handleRestart}>
            ← Back to Routes
          </button>
        )}
        {hasStarted && <p className="quiz-progress" role="status" aria-atomic="true">
          {isCompleted
            ? "Flight Completed!"
            : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
        </p>}

        {hasStarted && (
          <div
            className="quiz-progress-bar"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progressPercent}
            aria-valuetext={isCompleted ? "Quiz completed" : `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`}
          >
            <div className="quiz-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        )}

        {!hasStarted ? (
          <div className="quiz-welcome">
            <h3>{selectedRoute} {selectedDifficulty.toLowerCase()} quiz</h3>
            <div className="quiz-route-selector">
              <label htmlFor="quiz-route">Choose your route</label>
              <select
                id="quiz-route"
                value={selectedRoute}
                onChange={(event) => setSelectedRoute(event.target.value)}
              >
                {quizRoutes.map((route) => (
                  <option key={route} value={route}>
                    {getQuizQuestions(route, selectedDifficulty).length > 0 ? route : `${route} — Coming soon`}
                  </option>
                ))}
              </select>
            </div>
            <div className="quiz-route-selector">
              <label htmlFor="quiz-difficulty">Difficulty</label>
              <select
                id="quiz-difficulty"
                value={selectedDifficulty}
                onChange={(event) => setSelectedDifficulty(event.target.value)}
              >
                {quizDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {getQuizQuestions(selectedRoute, difficulty).length > 0
                      ? difficulty
                      : `${difficulty} — Coming soon`}
                  </option>
                ))}
              </select>
            </div>
            <p>
              {canStartQuiz
                ? "Practice with five questions, then review your answers."
                : "This route and difficulty are coming soon. Choose an available combination to start a quiz."}
            </p>
            <button
              className="quiz-next-button"
              type="button"
              disabled={!canStartQuiz}
              onClick={() => {
                if (canStartQuiz) setHasStarted(true);
              }}
            >
              Start Quiz
            </button>
          </div>
        ) : isCompleted ? (
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

            <div className="quiz-results-actions">
              <button
                className="quiz-next-button"
                type="button"
                aria-expanded={showReview}
                aria-controls="quiz-answer-review"
                onClick={() => setShowReview((visible) => !visible)}
              >
                {showReview ? "Hide Answers" : "Review Answers"}
              </button>
              <button className="quiz-next-button" type="button" onClick={handleRestart}>
                Try Again
              </button>
            </div>

            <div id="quiz-answer-review" hidden={!showReview}>
            <h3>Question review</h3>
            <ol className="quiz-review">
              {quizQuestions.map((question) => {
                const userAnswer = recordedAnswers[question.id];
                const isCorrect = userAnswer === question.correctAnswer;

                return (
                  <li className="quiz-review-item" key={question.id}>
                    <h4>{question.question}</h4>
                    <p className={`quiz-review-verdict ${isCorrect ? "quiz-review-verdict--correct" : "quiz-review-verdict--incorrect"}`}>
                      <span aria-hidden="true">{isCorrect ? "✓" : "✕"}</span>{" "}
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
            </div>
          </div>
        ) : (
          <form onSubmit={handleNextQuestion}>
            <fieldset className="quiz-question" key={currentQuestion.id} disabled={isReacting}>
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
              disabled={selectedAnswer === null || isReacting}
            >
              Next Question
            </button>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}

export default QuizAcademy;

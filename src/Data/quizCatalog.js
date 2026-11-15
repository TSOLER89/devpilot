import { quizQuestions as cSharpQuestions } from "./quizQuestions.js";
import { javascriptQuestions } from "./javascriptQuestions.js";
import { reactQuestions } from "./reactQuestions.js";
import { sqlQuestions } from "./sqlQuestions.js";
import { dotnetQuestions } from "./dotnetQuestions.js";
import { cSharpIntermediateQuestions } from "./cSharpIntermediateQuestions.js";

const questionsByRoute = {
  "C#": { Beginner: cSharpQuestions, Intermediate: cSharpIntermediateQuestions },
  JavaScript: { Beginner: javascriptQuestions },
  React: { Beginner: reactQuestions },
  SQL: { Beginner: sqlQuestions },
  ".NET": { Beginner: dotnetQuestions },
};

export const quizRoutes = Object.keys(questionsByRoute);
export const quizDifficulties = ["Beginner", "Intermediate", "Advanced"];

export function getQuizQuestions(route, difficulty) {
  if (!Object.hasOwn(questionsByRoute, route)) return [];
  const levels = questionsByRoute[route];
  return Object.hasOwn(levels, difficulty) ? levels[difficulty] : [];
}

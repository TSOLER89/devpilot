import assert from "node:assert/strict";
import { test } from "node:test";
import { getQuizQuestions, quizRoutes, quizDifficulties } from "./quizCatalog.js";
import { quizQuestions } from "./quizQuestions.js";
import { javascriptQuestions } from "./javascriptQuestions.js";
import { reactQuestions } from "./reactQuestions.js";
import { sqlQuestions } from "./sqlQuestions.js";
import { dotnetQuestions } from "./dotnetQuestions.js";
import { cSharpIntermediateQuestions } from "./cSharpIntermediateQuestions.js";

test("every Beginner route keeps its original question set", () => {
  const expected = [quizQuestions, javascriptQuestions, reactQuestions, sqlQuestions, dotnetQuestions];
  quizRoutes.forEach((route, index) => {
    assert.equal(getQuizQuestions(route, "Beginner"), expected[index]);
  });
});

test("only C# Intermediate is available beyond Beginner", () => {
  assert.equal(getQuizQuestions("C#", "Intermediate"), cSharpIntermediateQuestions);
  for (const route of quizRoutes) {
    for (const difficulty of quizDifficulties.slice(1)) {
      if (route === "C#" && difficulty === "Intermediate") continue;
      assert.deepEqual(getQuizQuestions(route, difficulty), [], `${route}/${difficulty}`);
    }
  }
});

test("unknown routes or difficulties never fall back to another quiz", () => {
  assert.deepEqual(getQuizQuestions("Unknown", "Beginner"), []);
  assert.deepEqual(getQuizQuestions("C#", "Unknown"), []);
  assert.deepEqual(getQuizQuestions("__proto__", "Beginner"), []);
  assert.deepEqual(getQuizQuestions("C#", "toString"), []);
});

test("C# Intermediate has five complete questions with unique IDs and one valid answer each", () => {
  assert.equal(cSharpIntermediateQuestions.length, 5);
  const allIds = [...quizQuestions, ...cSharpIntermediateQuestions].map((question) => question.id);
  assert.equal(new Set(allIds).size, allIds.length);
  for (const question of cSharpIntermediateQuestions) {
    assert.ok(question.question.trim());
    assert.equal(question.answers.length, 4);
    assert.equal(new Set(question.answers).size, 4);
    assert.equal(question.answers.filter((answer) => answer === question.correctAnswer).length, 1);
    assert.ok(question.explanation.trim());
  }
});

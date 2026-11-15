import assert from "node:assert/strict";
import { test } from "node:test";
import { dotnetQuestions } from "./dotnetQuestions.js";

test(".NET route provides five complete questions with one valid answer each", () => {
  assert.equal(dotnetQuestions.length, 5);
  assert.equal(new Set(dotnetQuestions.map((question) => question.id)).size, 5);

  for (const question of dotnetQuestions) {
    assert.ok(question.question.trim());
    assert.equal(question.answers.length, 4);
    assert.equal(new Set(question.answers).size, 4);
    assert.equal(question.answers.filter((answer) => answer === question.correctAnswer).length, 1);
    assert.ok(question.explanation.trim());
  }
});

import assert from "node:assert/strict";
import { test } from "node:test";
import { reactQuestions } from "./reactQuestions.js";

test("React route provides five complete questions with one valid answer each", () => {
  assert.equal(reactQuestions.length, 5);
  assert.equal(new Set(reactQuestions.map((question) => question.id)).size, 5);

  for (const question of reactQuestions) {
    assert.ok(question.question.trim());
    assert.equal(question.answers.length, 4);
    assert.equal(new Set(question.answers).size, 4);
    assert.equal(question.answers.filter((answer) => answer === question.correctAnswer).length, 1);
    assert.ok(question.explanation.trim());
  }
});

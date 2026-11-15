import assert from "node:assert/strict";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { javascriptIntermediateQuestions } from "./javascriptIntermediateQuestions.js";
import { javascriptQuestions } from "./javascriptQuestions.js";

test("JavaScript Intermediate has five complete questions with unique IDs and one valid answer each", () => {
  assert.equal(javascriptIntermediateQuestions.length, 5);
  const ids = [...javascriptQuestions, ...javascriptIntermediateQuestions].map((question) => question.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const question of javascriptIntermediateQuestions) {
    assert.ok(question.question.trim());
    assert.equal(question.answers.length, 4);
    assert.equal(new Set(question.answers).size, 4);
    assert.equal(question.answers.filter((answer) => answer === question.correctAnswer).length, 1);
    assert.ok(question.explanation.trim());
  }
});

test("intermediate example answers agree with JavaScript execution", async () => {
  const answers = Object.fromEntries(javascriptIntermediateQuestions.map((question) => [question.id, question.correctAnswer]));
  const counterResult = runInNewContext(`
    function makeCounter() { let count = 0; return () => ++count; }
    const next = makeCounter(); next(); next();
  `);
  assert.equal(String(counterResult), answers["js-intermediate-closure"]);

  const rejection = runInNewContext(`
    async function load() { throw new Error('Failed'); }
    (async () => { try { await load(); return 'not caught'; } catch (error) { return error.message; } })();
  `);
  assert.equal(await rejection, "Failed");

  const arrayResult = [1, 2, 3, 4].filter((n) => n % 2 === 0).map((n) => n * 3).reduce((sum, n) => sum + n, 0);
  assert.equal(String(arrayResult), answers["js-intermediate-array-chain"]);

  const logs = await new Promise((resolve) => {
    const output = [];
    runInNewContext(`
      console.log('A');
      setTimeout(() => console.log('B'), 0);
      Promise.resolve().then(() => console.log('C'));
      console.log('D');
    `, {
      console: { log: (letter) => output.push(letter) },
      setTimeout: (callback) => setTimeout(() => { callback(); resolve(output); }, 0),
    });
  });
  assert.equal(logs.join(", "), answers["js-intermediate-event-loop"]);

  const original = { profile: { name: "Ada" }, level: 1 };
  const { level, ...rest } = original;
  const copy = { ...rest };
  copy.profile.name = "Grace";
  assert.equal(`'${original.profile.name}' and ${level}`, answers["js-intermediate-destructuring-spread"]);
});

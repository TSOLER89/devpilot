import assert from "node:assert/strict";
import { test } from "node:test";
import { getSuggestedQuestions } from "./chatSuggestions.js";

const topics = [".NET", "React", "JavaScript", "C#", "API", "HTML", "CSS", "Git"];
const modes = ["explain", "debug", "improve", "error", "quiz", "teach", "plan"];

test("all 56 route/mode combinations provide three distinct topic-specific prompts", () => {
  for (const topic of topics) {
    for (const mode of modes) {
      const questions = getSuggestedQuestions(topic, mode);
      assert.equal(questions.length, 3, `${topic}/${mode}`);
      assert.equal(new Set(questions).size, 3);
      assert.ok(questions.every((question) => question.trim() && question.includes(topic)));
    }
  }
});

test("changing route or mode changes suggestions without modifying earlier results", () => {
  const questions = getSuggestedQuestions("React", "debug");
  const original = [...questions];
  assert.notDeepEqual(getSuggestedQuestions("Git", "debug"), questions);
  assert.notDeepEqual(getSuggestedQuestions("React", "teach"), questions);
  assert.deepEqual(questions, original);
  assert.match(questions[0], /Help me debug/);
  assert.match(getSuggestedQuestions("React", "teach")[0], /Teach me/);
});

test("no route preserves the original mode-only suggestions", () => {
  const expected = {
    explain: ["What is dependency injection?", "What is a REST API?", "Explain useEffect in React"],
    debug: ["Why is my API returning 500?", "Why is this React component not updating?", "Help me debug a null reference error"],
    improve: ["How can I improve this C# method?", "Can you simplify this React component?", "How can I make this API cleaner?"],
    error: ["Explain NullReferenceException", "What does CORS error mean?", "Explain this build error"],
    quiz: ["Quiz me on C#", "Quiz me on React", "Quiz me on REST APIs"],
    teach: ["Teach me about dependency injection", "Teach me React hooks", "Teach me how REST APIs work"],
    plan: ["Help me plan a .NET API", "Help me plan a React app", "Help me plan a debugging strategy"],
  };
  for (const mode of modes) {
    assert.deepEqual(getSuggestedQuestions(null, mode), expected[mode]);
  }
});

test("unknown topics or modes use safe fallbacks", () => {
  assert.deepEqual(getSuggestedQuestions("unknown", "debug"), getSuggestedQuestions(null, "debug"));
  assert.deepEqual(getSuggestedQuestions("React", "unknown"), getSuggestedQuestions("React", "explain"));
  assert.deepEqual(getSuggestedQuestions(undefined, undefined), getSuggestedQuestions(null, "explain"));
});

import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { sendChatMessage } from "./chatApi.js";

const originalFetch = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("Ollama requests include conversation history and cancellation", async () => {
  const controller = new AbortController();
  let request;
  globalThis.fetch = async (url, options) => {
    request = { url, options };
    return {
      ok: true,
      json: async () => ({ answer: "Local answer", responseId: "" }),
    };
  };

  const result = await sendChatMessage({
    message: "What is dependency injection?",
    previousResponseId: null,
    mode: "explain",
    topic: ".NET",
    provider: "ollama",
    conversationHistory: [{ role: "user", content: "What is .NET?" }],
    signal: controller.signal,
  });

  assert.equal(request.url.endsWith("/api/chat"), true);
  assert.equal(request.options.signal, controller.signal);
  assert.deepEqual(JSON.parse(request.options.body), {
    message: "What is dependency injection?",
    previousResponseId: null,
    mode: "explain",
    topic: ".NET",
    provider: "ollama",
    conversationHistory: [{ role: "user", content: "What is .NET?" }],
  });
  assert.equal(result.answer, "Local answer");
});

test("OpenAI requests keep their response ID and omit Ollama history", async () => {
  let body;
  globalThis.fetch = async (_url, options) => {
    body = JSON.parse(options.body);
    return {
      ok: true,
      json: async () => ({ answer: "OpenAI answer", responseId: "response-123" }),
    };
  };

  const result = await sendChatMessage({
    message: "Explain async/await",
    previousResponseId: "response-previous",
    mode: "explain",
    topic: null,
    provider: "openai",
  });

  assert.equal(body.provider, "openai");
  assert.equal(body.previousResponseId, "response-previous");
  assert.equal("conversationHistory" in body, false);
  assert.equal(result.responseId, "response-123");
});

test("aborting a request cancels the underlying fetch", async () => {
  globalThis.fetch = (_url, { signal }) =>
    new Promise((_, reject) => {
      signal.addEventListener(
        "abort",
        () => reject(new DOMException("Request aborted", "AbortError")),
        { once: true },
      );
    });

  const controller = new AbortController();
  const pendingRequest = sendChatMessage({
    message: "Explain cancellation",
    previousResponseId: null,
    mode: "explain",
    topic: null,
    provider: "ollama",
    signal: controller.signal,
  });
  controller.abort();

  await assert.rejects(pendingRequest, { name: "AbortError" });
});

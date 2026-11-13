import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { playQuizCompletionSound, stopQuizSounds } from "./quizSounds.js";

const originalAudioContext = globalThis.AudioContext;
const originalWebkitAudioContext = globalThis.webkitAudioContext;
let contexts;

beforeEach(() => {
  contexts = [];
  globalThis.webkitAudioContext = undefined;
  globalThis.AudioContext = class {
    state = "suspended";
    currentTime = 10;
    destination = {};
    notes = [];
    levels = [];

    constructor() {
      contexts.push(this);
    }

    async resume() { this.state = "running"; }
    async close() { this.state = "closed"; }

    createOscillator() {
      const note = {
        frequency: { setValueAtTime: (value) => { note.pitch = value; } },
        connect() {},
        disconnect() {},
        start(time) { note.startTime = time; },
        stop(time) { note.stopTime = time; },
      };
      this.notes.push(note);
      return note;
    }

    createGain() {
      return {
        gain: {
          setValueAtTime() {},
          linearRampToValueAtTime: (value) => this.levels.push(value),
        },
        connect() {},
        disconnect() {},
      };
    }
  };
});

afterEach(() => {
  stopQuizSounds();
  globalThis.AudioContext = originalAudioContext;
  globalThis.webkitAudioContext = originalWebkitAudioContext;
});

test("muted quizzes never create an audio context", async () => {
  await playQuizCompletionSound(false);
  assert.equal(contexts.length, 0);
});

test("missing or blocked AudioContext does not reject playback", async () => {
  globalThis.AudioContext = undefined;
  await assert.doesNotReject(playQuizCompletionSound(true));
  globalThis.AudioContext = class {
    constructor() { throw new Error("Audio blocked"); }
  };
  await assert.doesNotReject(playQuizCompletionSound(true));
});

test("completion plays a short two-note chime at low gain and releases audio", async () => {
  await playQuizCompletionSound(true);
  const context = contexts[0];
  assert.deepEqual(context.notes.map((note) => note.pitch), [659.25, 523.25]);
  assert.ok(context.notes[1].startTime > context.notes[0].stopTime);
  assert.ok(context.notes[1].stopTime - context.notes[0].startTime < 0.6);
  assert.ok(context.levels.every((level) => level >= 0 && level <= 0.035));
  context.notes.at(-1).onended();
  assert.equal(context.state, "closed");
});

test("completion can play again after stopping for a new quiz", async () => {
  await playQuizCompletionSound(true);
  stopQuizSounds();
  await playQuizCompletionSound(true);
  assert.equal(contexts[0].state, "closed");
  assert.equal(contexts[1].notes.length, 2);
});

test("muting cancels playback even while browser resume is pending", async () => {
  let finishResume;
  globalThis.AudioContext.prototype.resume = function () {
    return new Promise((resolve) => {
      finishResume = () => { this.state = "running"; resolve(); };
    });
  };
  const pending = playQuizCompletionSound(true);
  stopQuizSounds();
  finishResume();
  await pending;
  assert.equal(contexts[0].notes.length, 0);
});

test("resume rejection is handled and releases the audio context", async () => {
  globalThis.AudioContext.prototype.resume = async () => { throw new Error("Not allowed"); };
  await assert.doesNotReject(playQuizCompletionSound(true));
  assert.equal(contexts[0].state, "closed");
});

test("a new completion chime closes the previous context", async () => {
  await playQuizCompletionSound(true);
  await playQuizCompletionSound(true);
  assert.equal(contexts[0].state, "closed");
  assert.equal(contexts[1].state, "running");
});

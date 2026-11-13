import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { playQuizSound, stopQuizSounds } from "./quizSounds.js";

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
  await playQuizSound(false, true, true);
  assert.equal(contexts.length, 0);
});

test("missing or blocked AudioContext does not reject playback", async () => {
  globalThis.AudioContext = undefined;
  await assert.doesNotReject(playQuizSound(true, true, false));
  globalThis.AudioContext = class {
    constructor() { throw new Error("Audio blocked"); }
  };
  await assert.doesNotReject(playQuizSound(true, true, false));
});

test("correct feedback uses rising notes at low gain and releases audio", async () => {
  await playQuizSound(true, true, false);
  const context = contexts[0];
  assert.deepEqual(context.notes.map((note) => note.pitch), [523.25, 659.25]);
  assert.ok(context.levels.every((level) => level >= 0 && level <= 0.035));
  context.notes.at(-1).onended();
  assert.equal(context.state, "closed");
});

test("incorrect feedback is a single low note", async () => {
  await playQuizSound(true, false, false);
  assert.deepEqual(contexts[0].notes.map((note) => note.pitch), [196]);
});

test("completion melody follows the final answer feedback without overlap", async () => {
  for (const correct of [true, false]) {
    await playQuizSound(true, correct, true);
    const notes = contexts.at(-1).notes;
    assert.deepEqual(notes.slice(-4).map((note) => note.pitch), [523.25, 659.25, 783.99, 1046.5]);
    assert.equal(notes.length, correct ? 6 : 5);
    assert.ok(notes.slice(1).every((note, index) => note.startTime > notes[index].stopTime));
  }
});

test("muting cancels playback even while browser resume is pending", async () => {
  let finishResume;
  globalThis.AudioContext.prototype.resume = function () {
    return new Promise((resolve) => {
      finishResume = () => { this.state = "running"; resolve(); };
    });
  };
  const pending = playQuizSound(true, true, true);
  stopQuizSounds();
  finishResume();
  await pending;
  assert.equal(contexts[0].notes.length, 0);
});

test("resume rejection is handled and releases the audio context", async () => {
  globalThis.AudioContext.prototype.resume = async () => { throw new Error("Not allowed"); };
  await assert.doesNotReject(playQuizSound(true, true, false));
  assert.equal(contexts[0].state, "closed");
});

test("a new feedback sequence closes the previous context", async () => {
  await playQuizSound(true, true, false);
  await playQuizSound(true, false, false);
  assert.equal(contexts[0].state, "closed");
  assert.equal(contexts[1].state, "running");
});

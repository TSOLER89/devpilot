import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { playQuizCompletionSound, stopQuizSounds } from "./quizSounds.js";

const originalAudio = globalThis.Audio;
let instances;

beforeEach(() => {
  instances = [];
  globalThis.Audio = class {
    currentTime = 0;
    paused = false;
    plays = 0;
    constructor(src) {
      this.src = src;
      instances.push(this);
    }
    async play() { this.plays += 1; }
    pause() { this.paused = true; }
  };
});

afterEach(() => {
  stopQuizSounds();
  globalThis.Audio = originalAudio;
});

test("sound stays silent while disabled", async () => {
  await playQuizCompletionSound(false);
  assert.equal(instances.length, 0);
});

test("quiz completion plays the WAV once at 25% volume without looping", async () => {
  await playQuizCompletionSound(true);
  assert.equal(instances[0].src, "/sounds/quiz-complete.wav");
  assert.equal(instances[0].volume, 0.25);
  assert.equal(instances[0].loop, false);
  assert.equal(instances[0].plays, 1);
});

test("starting again stops and rewinds previous playback", async () => {
  await playQuizCompletionSound(true);
  instances[0].currentTime = 3;
  await playQuizCompletionSound(true);
  assert.equal(instances[0].paused, true);
  assert.equal(instances[0].currentTime, 0);
  assert.equal(instances[1].plays, 1);
});

test("mute and Try Again cleanup stops even pending playback", async () => {
  let rejectPlay;
  globalThis.Audio.prototype.play = () => new Promise((_, reject) => { rejectPlay = reject; });
  const pending = playQuizCompletionSound(true);
  stopQuizSounds();
  assert.equal(instances[0].paused, true);
  rejectPlay(new Error("Playback interrupted"));
  await assert.doesNotReject(pending);
});

test("an older playback rejection cannot stop a newer sound", async () => {
  let rejectPlay;
  globalThis.Audio.prototype.play = () => new Promise((_, reject) => { rejectPlay = reject; });
  const pending = playQuizCompletionSound(true);
  globalThis.Audio.prototype.play = async function () { this.plays += 1; };
  await playQuizCompletionSound(true);
  rejectPlay(new Error("Old playback interrupted"));
  await pending;
  assert.equal(instances[1].paused, false);
});

test("ended and failed audio are released gracefully", async () => {
  for (const event of ["onended", "onerror"]) {
    await playQuizCompletionSound(true);
    const audio = instances.at(-1);
    audio[event]();
    assert.equal(audio.paused, true);
    assert.equal(audio.onended, null);
    assert.equal(audio.onerror, null);
  }
});

test("unsupported Audio and blocked playback do not reject", async () => {
  globalThis.Audio = undefined;
  await assert.doesNotReject(playQuizCompletionSound(true));
  globalThis.Audio = class {
    constructor() { throw new Error("Audio unavailable"); }
  };
  await assert.doesNotReject(playQuizCompletionSound(true));
});

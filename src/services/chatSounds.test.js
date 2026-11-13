import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { playChatTakeoff, stopChatSounds } from "./chatSounds.js";

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
  stopChatSounds();
  globalThis.Audio = originalAudio;
});

test("sound stays silent while disabled", async () => {
  await playChatTakeoff(false);
  assert.equal(instances.length, 0);
});

test("takeoff plays the WAV once at 25% volume without looping", async () => {
  await playChatTakeoff(true);
  assert.equal(instances[0].src, "/sounds/airplane-takeoff.wav");
  assert.equal(instances[0].volume, 0.25);
  assert.equal(instances[0].loop, false);
  assert.equal(instances[0].plays, 1);
});

test("starting again stops and rewinds previous playback", async () => {
  await playChatTakeoff(true);
  instances[0].currentTime = 3;
  await playChatTakeoff(true);
  assert.equal(instances[0].paused, true);
  assert.equal(instances[0].currentTime, 0);
  assert.equal(instances[1].plays, 1);
});

test("mute and New Chat cleanup stops even pending playback", async () => {
  let rejectPlay;
  globalThis.Audio.prototype.play = () => new Promise((_, reject) => { rejectPlay = reject; });
  const pending = playChatTakeoff(true);
  stopChatSounds();
  assert.equal(instances[0].paused, true);
  rejectPlay(new Error("Playback interrupted"));
  await assert.doesNotReject(pending);
});

test("an older playback rejection cannot stop a newer sound", async () => {
  let rejectPlay;
  globalThis.Audio.prototype.play = () => new Promise((_, reject) => { rejectPlay = reject; });
  const pending = playChatTakeoff(true);
  globalThis.Audio.prototype.play = async function () { this.plays += 1; };
  await playChatTakeoff(true);
  rejectPlay(new Error("Old playback interrupted"));
  await pending;
  assert.equal(instances[1].paused, false);
});

test("ended and failed audio are released gracefully", async () => {
  for (const event of ["onended", "onerror"]) {
    await playChatTakeoff(true);
    const audio = instances.at(-1);
    audio[event]();
    assert.equal(audio.paused, true);
    assert.equal(audio.onended, null);
    assert.equal(audio.onerror, null);
  }
});

test("unsupported Audio and blocked playback do not reject", async () => {
  globalThis.Audio = undefined;
  await assert.doesNotReject(playChatTakeoff(true));
  globalThis.Audio = class {
    constructor() { throw new Error("Audio unavailable"); }
  };
  await assert.doesNotReject(playChatTakeoff(true));
});

let activeAudio = null;

export function stopQuizSounds() {
  const audio = activeAudio;
  activeAudio = null;
  if (!audio) return;

  audio.onended = null;
  audio.onerror = null;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch {
    // Optional audio must not interrupt the quiz or navigation.
  }
}

export async function playQuizCompletionSound(soundEnabled) {
  stopQuizSounds();
  if (!soundEnabled || !globalThis.Audio) return;

  let audio;
  try {
    const baseUrl = import.meta.env?.BASE_URL ?? "/";
    audio = new Audio(`${baseUrl}sounds/quiz-complete.wav`);
    audio.volume = 0.25;
    audio.loop = false;
    activeAudio = audio;

    const release = () => {
      if (activeAudio === audio) stopQuizSounds();
    };
    audio.onended = release;
    audio.onerror = release;
    await audio.play();
  } catch {
    // Missing files, unsupported formats, or blocked playback leave the quiz usable.
    if (activeAudio === audio) stopQuizSounds();
  }
}

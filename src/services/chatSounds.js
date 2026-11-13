let activeAudio = null;

export function stopChatSounds() {
  const audio = activeAudio;
  activeAudio = null;
  if (!audio) return;

  audio.onended = null;
  audio.onerror = null;
  try {
    audio.pause();
    audio.currentTime = 0;
  } catch {
    // Optional audio must not interrupt chat or navigation.
  }
}

export async function playChatTakeoff(soundEnabled) {
  stopChatSounds();
  if (!soundEnabled || !globalThis.Audio) return;

  let audio;
  try {
    const baseUrl = import.meta.env?.BASE_URL ?? "/";
    audio = new Audio(`${baseUrl}sounds/airplane-takeoff.wav`);
    audio.volume = 0.25;
    audio.loop = false;
    activeAudio = audio;

    const release = () => {
      if (activeAudio === audio) stopChatSounds();
    };
    audio.onended = release;
    audio.onerror = release;
    await audio.play();
  } catch {
    // Ignore missing files, unsupported formats, and blocked playback.
    if (activeAudio === audio) stopChatSounds();
  }
}

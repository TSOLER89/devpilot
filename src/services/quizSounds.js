let activeContext = null;

export function stopQuizSounds() {
  const context = activeContext;
  activeContext = null;

  if (context && context.state !== "closed") {
    void context.close().catch(() => {
      // Audio is optional; closing it must not interrupt the quiz.
    });
  }
}

export async function playQuizSound(soundEnabled, isCorrect, isCompleted) {
  if (!soundEnabled) {
    return;
  }

  const AudioContext = globalThis.AudioContext || globalThis.webkitAudioContext;
  if (!AudioContext) {
    return;
  }

  stopQuizSounds();
  let context;

  try {
    // Created in the submission handler to respect browser autoplay rules.
    context = new AudioContext();
    activeContext = context;
    if (context.state === "suspended") {
      await context.resume();
    }

    // Muting or restarting may have cancelled playback while resume was pending.
    if (activeContext !== context || context.state !== "running") {
      if (activeContext === context) stopQuizSounds();
      return;
    }

    const notes = isCorrect ? [523.25, 659.25] : [196];
    if (isCompleted) {
      notes.push(null, 523.25, 659.25, 783.99, 1046.5);
    }

    let start = context.currentTime;
    notes.forEach((frequency, index) => {
      if (frequency === null) {
        start += 0.12;
        return;
      }

      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const isLastNote = index === notes.length - 1;
      const duration = isLastNote ? 0.22 : 0.12;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, start);
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.035, start + 0.015);
      gain.gain.linearRampToValueAtTime(0, start + duration);
      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.onended = () => {
        oscillator.disconnect();
        gain.disconnect();
        if (isLastNote && activeContext === context) stopQuizSounds();
      };
      oscillator.start(start);
      oscillator.stop(start + duration);
      start += duration + 0.02;
    });
  } catch {
    if (activeContext === context) stopQuizSounds();
    // Missing or blocked audio must never prevent answer submission.
  }
}

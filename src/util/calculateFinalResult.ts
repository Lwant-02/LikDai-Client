interface CalculateFinalResultProps {
  correctCharCount: number;
  totalTypedChars: number;
  durationInMs: number;
  wpmPerSecond: number[];
}

export const calculateFinalResult = ({
  correctCharCount,
  totalTypedChars,
  durationInMs,
  wpmPerSecond,
}: CalculateFinalResultProps) => {
  // Handle cases where essential data is missing or test didn't start/complete
  if (!durationInMs || totalTypedChars === 0) {
    return {
      wpm: 0,
      rawWpm: 0,
      accuracy: 0,
      consistency: 0,
      timeTaken: 0,
    };
  }

  // Calculate total duration in milliseconds and then minutes/seconds
  const durationInSeconds = durationInMs / 1000;
  const durationInMinutes = durationInSeconds / 60;

  // Prevent division by zero or near-zero for very short durations
  if (durationInMinutes <= 0) {
    return {
      wpm: 0,
      rawWpm: 0,
      accuracy: 0,
      consistency: 0,
      timeTaken: 0,
    };
  }

  // WPM (Net WPM): Correct characters divided by 5 (chars per word) and by minutes
  const wpm = correctCharCount / 5 / durationInMinutes;

  // Raw WPM (Gross WPM): Total characters typed (including errors and spaces)
  // divided by 5 and by minutes.
  const rawWpm = totalTypedChars / 5 / durationInMinutes;

  const accuracy = (correctCharCount / totalTypedChars) * 100;

  // Consistency: Standard deviation of WPM per second values.
  // Lower value indicates higher consistency.
  let consistency = 0;
  if (wpmPerSecond.length > 1) {
    // Need at least 2 points for variance
    const mean =
      wpmPerSecond.reduce((sum, val) => sum + val, 0) / wpmPerSecond.length;
    const variance =
      wpmPerSecond.reduce((sum, val) => sum + (val - mean) ** 2, 0) /
      wpmPerSecond.length; // Population variance
    consistency = Math.sqrt(variance);
  } else if (wpmPerSecond.length === 1) {
    // If only one WPM point, consistency is perfect (no deviation)
    consistency = 0;
  }

  return {
    wpm: Math.round(wpm),
    rawWpm: Math.round(rawWpm),
    accuracy: Math.round(accuracy),
    consistency: parseFloat(consistency.toFixed(2)),
    timeTaken: Math.round(durationInSeconds),
  };
};

interface CalculateTypingStatsProps {
  correctCharCount: number;
  totalTypedChars: number;
  startTime: number | null;
  endTime: number | null;
  wpmPerSecond: number[];
}

export const calculateTypingStats = ({
  correctCharCount,
  totalTypedChars,
  startTime,
  endTime,
  wpmPerSecond,
}: CalculateTypingStatsProps) => {
  console.log(
    "calculateTypingStats:",
    correctCharCount,
    totalTypedChars,
    startTime,
    endTime,
    wpmPerSecond
  );
  if (!startTime || !endTime || totalTypedChars === 0) {
    return {
      wpm: 0,
      rawWpm: 0,
      accuracy: 0,
      consistency: 0,
    };
  }

  const durationInMinutes = (endTime - startTime) / 1000 / 60;

  const wpm = correctCharCount / 5 / durationInMinutes;
  const rawWpm = totalTypedChars / 5 / durationInMinutes;
  const accuracy = (correctCharCount / totalTypedChars) * 100;

  // Consistency = standard deviation of wpmPerSecond
  let consistency = 0;
  if (wpmPerSecond.length > 0) {
    const mean =
      wpmPerSecond.reduce((sum, val) => sum + val, 0) / wpmPerSecond.length;
    const variance =
      wpmPerSecond.reduce((sum, val) => sum + (val - mean) ** 2, 0) /
      wpmPerSecond.length;
    consistency = Math.sqrt(variance);
  }

  return {
    wpm: Math.round(wpm),
    rawWpm: Math.round(rawWpm),
    accuracy: Math.round(accuracy),
    consistency: Math.round(consistency),
  };
};

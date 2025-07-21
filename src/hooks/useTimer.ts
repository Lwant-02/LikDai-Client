import { useEffect } from "react";
import { useRef, useState } from "react";

interface UseTimerProps {
  value: string;
  targetText: string;
}

export const useTimer = ({ value, targetText }: UseTimerProps) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  if (!startTime && value.length === 1) {
    const now = Date.now();
    setStartTime(now);
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - now) / 1000));
    }, 1000);
  }

  useEffect(() => {
    if (
      value.trim().split(" ").length === targetText.trim().split(" ").length &&
      value.trim() === targetText.trim()
    ) {
      setFinished(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  }, [value, targetText]);

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, []);

  return { elapsedTime, finished };
};

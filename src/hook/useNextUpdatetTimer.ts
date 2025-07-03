import { addMinutes } from "date-fns";
import { useEffect, useState } from "react";

const TIMER_KEY = "nextUpdateTime";

export const useNextUpdateTimer = () => {
  const [timeRemaining, setTimeRemaining] = useState("");

  useEffect(() => {
    const getOrSetNextUpdate = () => {
      const stored = localStorage.getItem(TIMER_KEY);
      const now = new Date();

      if (stored) {
        const storedTime = new Date(stored);

        // If expired, calculate the next valid 10-minute block
        if (storedTime <= now) {
          const diffMs = now.getTime() - storedTime.getTime();
          const blocks = Math.floor(diffMs / (10 * 60 * 1000)) + 1; // how many 10-min blocks have passed
          const newNext = addMinutes(storedTime, blocks * 10);
          localStorage.setItem(TIMER_KEY, newNext.toISOString());
          return newNext;
        }

        return storedTime;
      }

      const newNext = addMinutes(now, 10);
      localStorage.setItem(TIMER_KEY, newNext.toISOString());
      return newNext;
    };

    let nextUpdate = getOrSetNextUpdate();

    const updateRemainingTime = () => {
      const now = new Date();
      let diffMs = nextUpdate.getTime() - now.getTime();

      if (diffMs <= 0) {
        // Set the next 10-minute interval
        nextUpdate = addMinutes(nextUpdate, 10);
        localStorage.setItem(TIMER_KEY, nextUpdate.toISOString());
        diffMs = nextUpdate.getTime() - now.getTime(); // Recalculate after resetting
      }

      const mins = Math.floor(diffMs / 60000);
      const secs = Math.floor((diffMs % 60000) / 1000);

      setTimeRemaining(
        `${Math.max(0, mins)}:${secs.toString().padStart(2, "0")}`
      );
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return { timeRemaining };
};

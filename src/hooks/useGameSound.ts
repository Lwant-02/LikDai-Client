import { useEffect, useRef, useCallback } from "react";
import { useSettingStore } from "@/store/settingStore";

interface GameSoundOptions {
  backgroundPath: string;
  gameOverPath: string;
}

export const useGameSound = ({
  backgroundPath,
  gameOverPath,
}: GameSoundOptions) => {
  const { soundEnabled } = useSettingStore();
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const gameOverAudioRef = useRef<HTMLAudioElement | null>(null);
  const isBgPlayingRef = useRef(false);

  // Initialize background audio
  useEffect(() => {
    const audio = new Audio(backgroundPath);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.2;
    bgAudioRef.current = audio;

    return () => {
      audio.pause();
      bgAudioRef.current = null;
    };
  }, [backgroundPath]);

  // Initialize game over audio
  useEffect(() => {
    const audio = new Audio(gameOverPath);
    audio.preload = "auto";
    audio.volume = 0.4;
    gameOverAudioRef.current = audio;

    return () => {
      audio.pause();
      gameOverAudioRef.current = null;
    };
  }, [gameOverPath]);

  // Handle soundEnabled changes
  useEffect(() => {
    if (bgAudioRef.current) {
      if (!soundEnabled) {
        bgAudioRef.current.pause();
      } else if (isBgPlayingRef.current) {
        bgAudioRef.current.play().catch((error) => {
          console.log("Background audio auto-resume failed:", error);
        });
      }
    }
  }, [soundEnabled]);

  const playBackground = useCallback(() => {
    isBgPlayingRef.current = true;
    if (!soundEnabled || !bgAudioRef.current) return;
    
    bgAudioRef.current.play().catch((error) => {
      console.log("Background audio play failed:", error);
    });
  }, [soundEnabled]);

  const stopBackground = useCallback(() => {
    isBgPlayingRef.current = false;
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current.currentTime = 0;
    }
  }, []);

  const pauseBackground = useCallback(() => {
    isBgPlayingRef.current = false;
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
    }
  }, []);

  const resumeBackground = useCallback(() => {
    isBgPlayingRef.current = true;
    if (soundEnabled && bgAudioRef.current && bgAudioRef.current.paused) {
      bgAudioRef.current.play().catch((error) => {
        console.log("Background audio resume failed:", error);
      });
    }
  }, [soundEnabled]);

  const playGameOver = useCallback(() => {
    if (!soundEnabled || !gameOverAudioRef.current) return;

    // Stop background music first
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
    }

    gameOverAudioRef.current.currentTime = 0;
    gameOverAudioRef.current.play().catch((error) => {
      console.log("Game over audio play failed:", error);
    });
  }, [soundEnabled]);

  return {
    playBackground,
    stopBackground,
    pauseBackground,
    resumeBackground,
    playGameOver,
  };
};

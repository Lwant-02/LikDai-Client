import { useRef, useCallback } from "react";
import { settingStore } from "@/store/settingStore";

export const useKeySound = () => {
  const { soundEnabled } = settingStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on first use
  const initializeAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/key_sound.MP3");
      audioRef.current.preload = "auto";
      audioRef.current.volume = 0.3; // Set volume to 30% to avoid being too loud
    }
  }, []);

  // Play key sound
  const playKeySound = useCallback(() => {
    if (!soundEnabled) return;

    initializeAudio();

    if (audioRef.current) {
      // Reset audio to beginning and play
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        // Handle autoplay restrictions gracefully
        console.log("Audio play failed:", error);
      });
    }
  }, [soundEnabled, initializeAudio]);

  return { playKeySound };
};

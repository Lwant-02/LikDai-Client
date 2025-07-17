import React, { useEffect, useRef } from "react";
import GraphemeSplitter from "grapheme-splitter";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
// import { KeyMaps } from "@/keymaps";

interface TypingTestProps {
  isRunning: boolean;
  startTimer: () => void;
  targetText: string;
}

export const TypingTest = ({
  isRunning,
  startTimer,
  targetText,
}: TypingTestProps) => {
  const { selectedSetting, mode, userInput, setUserInput } = settingStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const splitter = new GraphemeSplitter();
  const units = splitter.splitGraphemes(targetText);
  const typedUnits = splitter.splitGraphemes(userInput);

  // Handle typing input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const key = e.key;
    if (key === "Backspace") {
      // Use GraphemeSplitter to properly remove the last grapheme cluster
      const currentUnits = splitter.splitGraphemes(userInput);
      if (currentUnits.length > 0) {
        const newUnits = currentUnits.slice(0, -1);
        setUserInput(newUnits.join(""));
      }
    } else if (key.length === 1) {
      setUserInput(userInput + key);
    }
  };

  // Global keyboard focus logic
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      inputRef.current?.focus();
      if (!isRunning && selectedSetting === "time") {
        startTimer();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isRunning, selectedSetting, startTimer]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Style helpers
  const getTextClasses = () => {
    const baseClasses = "relative md:text-4xl text-2xl";
    return mode === "eng" ? baseClasses : cn(baseClasses, "font-secondary");
  };

  const getContainerClasses = () => {
    const baseClasses = "flex leading-relaxed";
    return mode === "shan"
      ? cn(baseClasses, "flex-wrap whitespace-pre-wrap")
      : cn(baseClasses, "flex-wrap whitespace-pre-wrap");
  };

  return (
    <div className="cursor-text select-none px-3 w-full h-full">
      <div className={getContainerClasses()}>
        {units.map((unit, i) => {
          const typedUnit = typedUnits[i];
          const isCurrent = i === typedUnits.length;
          const isCorrect = typedUnit === unit;

          let colorClass = "text-primary/50";
          if (typedUnit !== undefined) {
            colorClass = isCorrect ? "text-primary" : "text-red underline";
          }

          return (
            <span
              key={i}
              className={cn(getTextClasses(), colorClass)}
              lang={mode === "shan" ? "shn" : "en"}
            >
              {unit}
              {isCurrent && (
                <span className="absolute -left-0.5 rounded-md top-0 h-full w-[3px] bg-yellow animate-[pulse_1.5s_ease-in-out_infinite]" />
              )}
            </span>
          );
        })}
      </div>

      <input
        ref={inputRef}
        type="text"
        id="typing-input"
        onKeyDown={handleKeyDown}
        className="opacity-0 absolute pointer-events-none"
        aria-label="Typing input"
      />
    </div>
  );
};

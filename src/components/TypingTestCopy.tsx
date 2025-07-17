import React, { useEffect, useRef, useState, useCallback } from "react";
import GraphemeSplitter from "grapheme-splitter";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { KeyMaps } from "@/keymaps";

interface TypingTestProps {
  isRunning: boolean;
  startTimer: () => void;
  targetText: string;
}
// Mock GraphemeSplitter for demonstration
class MockGraphemeSplitter {
  splitGraphemes(text: string) {
    // Simple fallback - you should use the actual GraphemeSplitter
    return [...text];
  }
}

export const TypingTestCopy = ({
  isRunning,
  startTimer,
  targetText,
}: TypingTestProps) => {
  const { selectedSetting, mode, userInput, setUserInput, selectedKeyMap } =
    settingStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  const splitter = new MockGraphemeSplitter();
  const units = splitter.splitGraphemes(targetText);
  const typedUnits = splitter.splitGraphemes(userInput);

  // Calculate scroll position based on current character position
  const updateScrollPosition = useCallback(() => {
    if (!textContainerRef.current || !currentCharRef.current) return;

    const container = textContainerRef.current;
    const currentChar = currentCharRef.current;
    const containerHeight = container.clientHeight;
    const currentCharTop = currentChar.offsetTop;
    const currentCharHeight = currentChar.offsetHeight;

    // Check if current character is near the bottom of visible area
    const visibleBottom = scrollOffset + containerHeight;
    const charBottom = currentCharTop + currentCharHeight;

    // If character is below visible area, scroll down
    if (charBottom > visibleBottom - 60) {
      // 60px buffer from bottom
      const newScrollOffset = currentCharTop - containerHeight + 120; // 120px from top
      setScrollOffset(Math.max(0, newScrollOffset));
    }
    // If character is above visible area (when backspacing), scroll up
    else if (currentCharTop < scrollOffset + 60) {
      // 60px buffer from top
      const newScrollOffset = Math.max(0, currentCharTop - 60);
      setScrollOffset(newScrollOffset);
    }
  }, [scrollOffset]);

  // Update scroll position when user input changes
  useEffect(() => {
    updateScrollPosition();
  }, [userInput, updateScrollPosition]);

  // Handle typing input
  const handleEngKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (key === "Backspace") {
      setUserInput(userInput.slice(0, -1));
    } else if (key.length === 1) {
      setUserInput(userInput + key);
    }

    e.preventDefault();
  };

  //Handle Shan typing
  const handleShanKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    const keyMap = KeyMaps[selectedKeyMap];
    const mappedKey = key === " " ? " " : keyMap.map[key];
    if (key === "Backspace") {
      setUserInput(userInput.slice(0, -1));
    } else if (key.length === 1) {
      setUserInput(userInput + mappedKey);
    }
    e.preventDefault();
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
    <div className="cursor-text select-none px-3 w-full h-full relative">
      {/* Scrollable text container with fixed height and hidden overflow */}
      <div
        ref={textContainerRef}
        className="h-full overflow-hidden relative transition-transform duration-200 ease-out"
      >
        <div
          className="transition-transform duration-200 ease-out"
          {...({
            style: { transform: `translateY(-${scrollOffset}px)` },
          } as any)}
        >
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
                  ref={isCurrent ? currentCharRef : null}
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
        </div>
      </div>

      {/* Hidden input for capturing keystrokes */}
      <input
        ref={inputRef}
        type="text"
        id="typing-input"
        onKeyDown={mode === "eng" ? handleEngKeyDown : handleShanKeyDown}
        className="opacity-0 absolute pointer-events-none"
        aria-label="Typing input"
      />
    </div>
  );
};

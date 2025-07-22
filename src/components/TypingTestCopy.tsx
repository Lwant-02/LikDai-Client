import React, { useEffect, useRef, useState, useCallback } from "react";
import GraphemeSplitter from "grapheme-splitter";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { KeyMaps } from "@/keymaps/KeyMaps";
import { useKeySound } from "@/hooks/useKeySound";

interface TypingTestProps {
  isRunning: boolean;
  startTimer: () => void;
  targetText: string;
}

export const TypingTestCopy = ({
  isRunning,
  startTimer,
  targetText,
}: TypingTestProps) => {
  const { selectedSetting, mode, userInput, setUserInput, selectedKeyMap } =
    settingStore();
  const { playKeySound } = useKeySound();
  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [inputScrollOffset, setInputScrollOffset] = useState(0);

  const splitter = new GraphemeSplitter();
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
    if (charBottom > visibleBottom - 20) {
      // 20px buffer from bottom
      const newScrollOffset =
        currentCharTop - containerHeight / 2 + currentCharHeight / 2;
      setScrollOffset(Math.max(0, newScrollOffset));
    }
    // If character is above visible area (when backspacing), scroll up
    else if (currentCharTop < scrollOffset + 20) {
      // 20px buffer from top
      const newScrollOffset = Math.max(
        0,
        currentCharTop - containerHeight / 2 + currentCharHeight / 2
      );
      setScrollOffset(newScrollOffset);
    }
  }, [scrollOffset]);

  // Update scroll position when user input changes
  useEffect(() => {
    updateScrollPosition();
  }, [userInput, updateScrollPosition]);

  // Calculate input scroll position
  const updateInputScrollPosition = useCallback(() => {
    if (!inputContainerRef.current) return;

    const container = inputContainerRef.current;
    const containerHeight = container.clientHeight;
    const inputHeight = container.scrollHeight;

    if (inputHeight > containerHeight) {
      const newScrollOffset = inputHeight - containerHeight;
      setInputScrollOffset(newScrollOffset);
    } else {
      setInputScrollOffset(0);
    }
  }, [inputScrollOffset]);

  // Update input scroll position when user input changes
  useEffect(() => {
    updateInputScrollPosition();
  }, [userInput, updateInputScrollPosition]);

  //Handle Eng typing
  const handleEngKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // Play key sound for any valid key press
    if (key === "Backspace" || key.length === 1) {
      playKeySound();
    }

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

    // Play key sound for any valid key press
    if (key === "Backspace" || key.length === 1) {
      playKeySound();
    }

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
    return mode === "eng"
      ? baseClasses
      : cn(baseClasses, "font-secondary leading-relaxed");
  };

  return (
    <div className="cursor-text select-none px-3 w-full h-full relative md:flex hidden justify-center items-start flex-col gap-2">
      {/* Scrollable text container with fixed height and hidden overflow */}
      <div
        ref={textContainerRef}
        className="h-[70px] overflow-hidden relative transition-transform duration-200 ease-out px-2"
      >
        <div
          className="transition-transform duration-200 ease-out"
          {...({
            style: { transform: `translateY(-${scrollOffset}px)` },
          } as any)}
        >
          <div className="block break-words whitespace-pre-wrap items-center justify-center">
            {units.map((unit, i) => {
              const isCurrent = i === typedUnits.length;

              return (
                <span
                  key={i}
                  ref={isCurrent ? currentCharRef : null}
                  className={cn(
                    getTextClasses(),
                    "leading-loose transition-all duration-300 ease-in-out ",
                    isCurrent &&
                      "bg-gradient-to-r from-yellow/30 via-yellow/20 to-yellow/30 animate-pulse shadow-sm rounded-xs  ring-1 ring-yellow/40"
                  )}
                  lang={mode === "shan" ? "shn" : "en"}
                >
                  {unit}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {/* User Input Display - Bottom Half */}
      <div
        ref={inputContainerRef}
        className="h-[70px] w-full overflow-hidden relative transition-transform duration-200 ease-out px-2 border border-foreground  items-center flex rounded-md"
      >
        <div
          className="transition-transform duration-200 ease-out"
          {...({
            style: { transform: `translateY(-${inputScrollOffset}px)` },
          } as any)}
        >
          <div className="block break-words whitespace-pre-wrap items-center justify-center">
            {typedUnits.map((typedUnit, i) => {
              const isCorrect = i < units.length && typedUnit === units[i];
              const isIncorrect = i < units.length && typedUnit !== units[i];

              let colorClass = "";
              if (isIncorrect) {
                colorClass = "text-red-400 underline";
              } else if (isCorrect) {
                colorClass = "text-green-400";
              } else {
                colorClass = "text-foreground";
              }

              return (
                <span
                  key={i}
                  className={cn(
                    "relative md:text-3xl text-2xl",
                    mode === "shan" ? "font-secondary" : "",
                    colorClass,
                    "leading-loose transition-all duration-300 ease-in-out"
                  )}
                  lang={mode === "shan" ? "shn" : "en"}
                >
                  {typedUnit}
                </span>
              );
            })}
            <span className="animate-pulse text-yellow md:text-2xl text-lg ">
              |
            </span>
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

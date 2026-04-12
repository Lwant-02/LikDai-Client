import { useEffect, useRef, useState, useCallback } from "react";
import GraphemeSplitter from "grapheme-splitter";

import { cn } from "@/lib/utils";
import { useSettingStore } from "@/store/settingStore";
import { useKeySound } from "@/hooks/useKeySound";
import { AlertDialog } from "./AlertDialog";
import { handleEngKeyDown, handleShanKeyDown } from "@/util/handleKeydown";

interface TypingTestProps {
  targetText: string;
  isRunning: boolean;
  setStartTime: (time: number | null) => void;
  startTimer: () => void;
}

export const TypingTest = ({
  targetText,
  isRunning,
  startTimer,
  setStartTime,
}: TypingTestProps) => {
  const { mode, userInput, setUserInput, selectedKeyMap } = useSettingStore();
  const { playKeySound } = useKeySound();
  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const currentCharRef = useRef<HTMLSpanElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [inputScrollOffset, setInputScrollOffset] = useState(0);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const UNICODE_REGEX = /[\u1000-\u109F\uAA60-\uAA7F\uA9E0-\uA9FF]/;

  const normalizeQuotes = (text: string): string =>
    text
      .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // curly single → '
      .replace(/[\u201C\u201D\u201E]/g, '"'); // curly double → "

  const splitter = new GraphemeSplitter();
  const normalizedTarget =
    mode === "shan" ? targetText : normalizeQuotes(targetText);
  const units =
    mode === "shan"
      ? normalizedTarget.split("")
      : splitter.splitGraphemes(normalizedTarget);
  const typedUnits =
    mode === "shan" ? userInput.split("") : splitter.splitGraphemes(userInput);

  // Calculate scroll position based on current character position
  const updateScrollPosition = useCallback(() => {
    if (!textContainerRef.current || !currentCharRef.current) return;

    const container = textContainerRef.current;
    const currentChar = currentCharRef.current;
    const containerHeight = container.clientHeight;
    const currentCharTop = currentChar.offsetTop;
    const currentCharHeight = currentChar.offsetHeight;

    const visibleBottom = scrollOffset + containerHeight;
    const charBottom = currentCharTop + currentCharHeight;

    if (charBottom > visibleBottom - 20) {
      const newScrollOffset =
        currentCharTop - containerHeight / 2 + currentCharHeight / 2;
      setScrollOffset(Math.max(0, newScrollOffset));
    } else if (currentCharTop < scrollOffset + 20) {
      const newScrollOffset = Math.max(
        0,
        currentCharTop - containerHeight / 2 + currentCharHeight / 2,
      );
      setScrollOffset(newScrollOffset);
    }
  }, [scrollOffset]);

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

  // Update scroll position when target text changes
  useEffect(() => {
    updateScrollPosition();
  }, [userInput, updateScrollPosition]);

  // Update input scroll position when user input changes
  useEffect(() => {
    updateInputScrollPosition();
  }, [userInput, updateInputScrollPosition]);

  // Global keyboard focus logic
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (UNICODE_REGEX.test(e.key)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        setIsAlertDialogOpen(true);
        return;
      }
      if (e.ctrlKey || e.metaKey || e.altKey) {
        console.log("control key get pressed!");
        return;
      } else {
        inputRef.current?.focus();
        if (!isRunning) {
          startTimer();
          setStartTime(Date.now());
        }
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown, true);
    return () =>
      window.removeEventListener("keydown", handleGlobalKeyDown, true);
  }, [isRunning, startTimer]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Style helpers
  const getTextClasses = () => {
    const baseClasses = "relative md:text-4xl text-2xl";
    return mode === "eng" ? baseClasses : cn(baseClasses, "leading-loose");
  };

  return (
    <div className="cursor-text select-none px-3 w-full h-full relative xl:flex hidden justify-center items-start flex-col gap-2">
      {/* Scrollable text container with fixed height and hidden overflow */}
      <div
        ref={textContainerRef}
        className="h-[70px] overflow-hidden relative transition-transform duration-200 ease-out px-2 "
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
                    "transition-all duration-300 ease-in-out",
                    isCurrent &&
                      "bg-gradient-to-r from-yellow/30 via-yellow/20 to-yellow/30 animate-pulse shadow-sm rounded-xs ring-1 ring-yellow/40",
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
        className="h-[70px] w-full  overflow-hidden relative transition-transform duration-200 ease-out px-2 border border-foreground  items-center flex rounded-md"
      >
        <div
          className="transition-transform duration-200 ease-out"
          {...({
            style: { transform: `translateY(-${inputScrollOffset}px)` },
          } as any)}
        >
          <div className="block break-words whitespace-pre-wrap items-center justify-center">
            {typedUnits.map((typedUnit, i) => {
              const targetUnit = units[i];

              // Simple character comparison
              const isCorrect = i < units.length && typedUnit === targetUnit;

              let colorClass = "";
              if (!isCorrect) {
                colorClass = "bg-red-500/30! text-red-400! rounded-sm"; // More visible error highlighting
              } else if (isCorrect) {
                colorClass = "text-green-400";
              } else {
                // Fallback: if we have more typed characters than target, mark as incorrect
                if (i >= units.length) {
                  colorClass = "bg-red-500/30 text-red-400 rounded-sm";
                } else {
                  colorClass = "text-foreground";
                }
              }

              const finalClassName = cn(
                "leading-loose relative md:text-3xl text-2xl transition-all duration-300 ease-in-out",
                colorClass,
              );

              return (
                <span
                  key={i}
                  className={finalClassName}
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
        onKeyDown={(e) =>
          mode === "eng"
            ? handleEngKeyDown(e, playKeySound, setUserInput, userInput)
            : handleShanKeyDown(
                e,
                playKeySound,
                setUserInput,
                userInput,
                selectedKeyMap,
              )
        }
        className="opacity-0 absolute pointer-events-none"
        aria-label="Typing input"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <AlertDialog
        isOpen={isAlertDialogOpen}
        setIsOpen={setIsAlertDialogOpen}
      />
    </div>
  );
};

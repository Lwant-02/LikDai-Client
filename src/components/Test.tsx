import React, { useEffect, useRef, useState, useCallback } from "react"; // Added useCallback
import GraphemeSplitter from "grapheme-splitter"; // Use the actual GraphemeSplitter
import { cn } from "@/lib/utils"; // Assuming this utility function is correct

// REMOVED: MockGraphemeSplitter class as it's not needed with the real GraphemeSplitter

export const TypingGame = () => {
  const [typedText, setTypedText] = useState("");
  // Use a sample Shan text with combinations that might break without proper shaping
  const targetText = "မ်ႂႇသုင်ၶႃႈ ၵူႊၵေႃႉ ၼႆႉပဵၼ် ဢၼ်ၸၢမ်းတူၺ်းၶႃႈ";

  // IMPORTANT: Use the actual GraphemeSplitter for correct segmentation of complex scripts
  const splitter = new GraphemeSplitter();
  const units = splitter.splitGraphemes(targetText);
  const typedUnits = splitter.splitGraphemes(typedText);

  // Refs for elements needed for cursor positioning
  const textContainerRef = useRef<HTMLDivElement>(null); // Reference to the div wrapping the text spans
  const currentCharRef = useRef<HTMLSpanElement>(null); // Reference to the span of the current character
  const cursorRef = useRef<HTMLSpanElement>(null); // Reference to the separate cursor element

  // const isFinished =
  //   typedUnits.length === units.length &&
  //   typedUnits.every((g, i) => g === units[i]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTypedText(e.target.value);
  };

  // Callback to update cursor position
  const updateCursorPosition = useCallback(() => {
    if (
      currentCharRef.current &&
      cursorRef.current &&
      textContainerRef.current
    ) {
      const charSpan = currentCharRef.current;
      const cursor = cursorRef.current;
      const container = textContainerRef.current;

      const charRect = charSpan.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate position relative to the text container
      const top = charRect.top - containerRect.top;
      const left = charRect.left - containerRect.left;
      const height = charRect.height;
      const width = 3; // Fixed width for the cursor

      cursor.style.top = `${top}px`;
      cursor.style.left = `${left}px`;
      cursor.style.height = `${height}px`;
      cursor.style.width = `${width}px`; // Explicitly set width
      cursor.style.opacity = "1"; // Make sure it's visible
    } else if (cursorRef.current) {
      // If no current character (e.g., at the very start of the text)
      // Position cursor at the beginning of the text container
      const cursor = cursorRef.current;
      const container = textContainerRef.current;

      if (typedUnits.length === 0 && container) {
        const firstCharPlaceholder = container.querySelector(
          ".first-char-placeholder"
        );
        if (firstCharPlaceholder) {
          const placeholderRect = firstCharPlaceholder.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();

          cursor.style.top = `${placeholderRect.top - containerRect.top}px`;
          cursor.style.left = `${placeholderRect.left - containerRect.left}px`;
          cursor.style.height = `${placeholderRect.height}px`;
          cursor.style.width = `3px`;
          cursor.style.opacity = "1";
          return;
        }
      }
      // Hide cursor if no current character and not at start of text
      cursor.style.opacity = "0";
    }
  }, [typedText, units.length, typedUnits.length]); // Depend on relevant state changes

  // Effect to call the cursor position update
  useEffect(() => {
    updateCursorPosition();
  }, [typedText, updateCursorPosition]); // Rerun when typedText changes or updateCursorPosition memoization changes

  // Optional: Focus the textarea on component mount
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 border rounded shadow">
      {/* Main text container must be 'relative' for absolute cursor positioning */}
      <div
        ref={textContainerRef}
        className="relative block whitespace-pre-wrap leading-snug" /* Added 'relative' and 'leading-snug' */
      >
        {/* Placeholder for cursor at the very beginning if no characters typed yet */}
        {typedUnits.length === 0 && (
          <span
            className={cn(
              "md:text-4xl text-2xl font-secondary font-shan-correct-shaping first-char-placeholder",
              "inline-block w-0.5 h-full opacity-0" // Small, invisible placeholder
            )}
          >
            {/* A non-breaking space or similar to ensure it takes up some minimal space */}
            &nbsp;
          </span>
        )}

        {units.map((unit, i) => {
          const typedUnit = typedUnits[i];
          const isCurrent = i === typedUnits.length; // This is the char *after* what's typed
          const isCorrect = typedUnit === unit;

          let colorClass = "text-primary/50";
          if (typedUnit !== undefined) {
            colorClass = isCorrect ? "text-primary" : "text-red underline";
          }

          return (
            <span
              key={i}
              ref={isCurrent ? currentCharRef : null} // Assign ref to the next character to be typed
              className={cn(
                "md:text-4xl text-2xl font-secondary font-shan-correct-shaping", // Apply the crucial Shan shaping class
                colorClass
              )}
              lang="shn" // Good practice for accessibility and language hints
            >
              {unit}
              {/* REMOVED THE INLINE CURSOR FROM HERE */}
            </span>
          );
        })}

        {/* The single, absolutely positioned cursor element */}
        <span
          ref={cursorRef}
          className="absolute rounded-md bg-yellow animate-[pulse_1.5s_ease-in-out_infinite] pointer-events-none"
          // style={{
          //   // Initial styles, will be overridden by useEffect
          //   top: 0,
          //   left: 0,
          //   opacity: 0, // Start hidden, will be made visible when positioned
          //   width: '3px',
          //   height: '1em'
          // }}
        />
      </div>

      <textarea
        ref={textareaRef} // Assign ref to textarea for focus
        placeholder="Start typing..."
        value={typedText}
        onChange={handleChange}
        rows={1}
        className="block w-full mt-4 p-2 border rounded resize-none"
      />
    </div>
  );
};

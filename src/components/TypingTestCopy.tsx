// import React, { useEffect, useRef } from "react";
// import { cn } from "@/lib/utils";
// import { settingStore } from "@/store/settingStore";

// interface TypingTestProps {
//   isRunning: boolean;
//   startTimer: () => void;
//   targetText: string;
//   userInput: string;
//   setUserInput: React.Dispatch<React.SetStateAction<string>>;
// }

// export const TypingTest = ({
//   isRunning,
//   startTimer,
//   targetText,
//   userInput,
//   setUserInput,
// }: TypingTestProps) => {
//   const { selectedSetting, mode } = settingStore();
//   const inputRef = useRef<HTMLInputElement>(null);

//   const segmenter = new Intl.Segmenter("my", { granularity: "word" });
//   const segments = [...segmenter.segment("မႂ်ႇသုင်ၶႃႈ")].map((s) => s.segment);
//   console.log(segments);

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     const key = e.key;

//     // Don't allow typing beyond the target text length
//     if (userInput.length >= targetText.length && key !== "Backspace") {
//       e.preventDefault();
//       return;
//     }

//     if (key === "Backspace") {
//       setUserInput((prev) => prev.slice(0, -1));
//     } else if (key.length === 1) {
//       setUserInput((prev) => prev + key);
//     }

//     e.preventDefault();
//   };

//   // Focus the input on any key press
//   useEffect(() => {
//     const handleGlobalKeyDown = (e: KeyboardEvent) => {
//       // Don't interfere with system shortcuts
//       if (e.ctrlKey || e.metaKey || e.altKey) return;

//       inputRef.current?.focus();
//       if (!isRunning && selectedSetting === "time") {
//         startTimer();
//       }
//     };

//     window.addEventListener("keydown", handleGlobalKeyDown);
//     return () => window.removeEventListener("keydown", handleGlobalKeyDown);
//   }, [isRunning, selectedSetting, startTimer]);

//   // Focus the input on load
//   useEffect(() => {
//     inputRef.current?.focus();
//   }, []);

//   // Get appropriate CSS classes based on script type
//   const getTextClasses = () => {
//     const baseClasses = "relative md:text-3xl text-xl";

//     if (mode === "eng") {
//       return baseClasses;
//     }
//     return cn(baseClasses, "font-secondary!");
//   };

//   // Get container classes based on script type
//   const getContainerClasses = () => {
//     const baseClasses = "flex leading-relaxed";

//     if (mode === "shan") {
//       return cn(baseClasses, "flex-wrap whitespace-pre-line");
//     }

//     return cn(baseClasses, "flex-wrap whitespace-pre-wrap");
//   };

//   return (
//     <div className="cursor-text select-none px-3 w-full h-full">
//       <div className={getContainerClasses()}>
//         {targetText.split("").map((char, i) => {
//           const typedChar = userInput[i];
//           const isCurrent = i === userInput.length;
//           const isCorrect = typedChar === char;

//           let colorClass = "text-primary/50";
//           if (typedChar !== undefined) {
//             colorClass = isCorrect ? "text-primary" : "text-red";
//           }
//           return (
//             <span
//               key={i}
//               className={cn(getTextClasses(), colorClass)}
//               lang={mode === "shan" ? "shn" : "en"}
//             >
//               {String(char)}
//               {isCurrent && (
//                 <span className="absolute -left-0.5 rounded-md top-0 h-full w-[3px] bg-yellow animate-[pulse_1.5s_ease-in-out_infinite]" />
//               )}
//             </span>
//           );
//         })}
//       </div>

//       <input
//         ref={inputRef}
//         onKeyDown={handleKeyDown}
//         className="opacity-0 absolute pointer-events-none"
//         aria-label="Typing input"
//       />
//     </div>
//   );
// };

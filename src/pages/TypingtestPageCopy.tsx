import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { RotateCcw } from "lucide-react";

import { DesktopTestSetting } from "@/components/DesktopTestSetting";
import { MobileTestSetting } from "@/components/MobileTestSetting";
import { useTitle } from "@/hook/useTitle";
import { useCountdownTimer } from "@/hook/useCountdownTimer";
import { settingStore } from "@/store/settingStore";
import { resultStore } from "@/store/resultStore"; // Import the new resultStore
import { TypingTest } from "@/components/TypingTest";
import { getRandomParagraph } from "@/util/getRandomParagraph.util";
import { getRandomWords } from "@/util/getRandomWord.util";
import { getRandomQuote } from "@/util/getRandomQuote.util";
import { getShanRandomParagraph } from "@/util/getShanRandomParagraph";
import { getShanRandomWords } from "@/util/getShanRandomWord";
import { calculateTypingStats } from "@/util/calculateTypingStats";

export const TypingtestPageCopy = () => {
  // Destructure state and setters from settingStore (active test state)
  const {
    selectedSetting,
    selectedTimer,
    selectedWords,
    mode,
    customText,
    setIncorrectChar,
    setTotalChar,
    incorrectChar,
    userInput,
    setUserInput,
    startTime,
    endTime,
    wpmPerSecond,
    totalChar, // Get totalChar from store
    setStartTime,
    setEndTime,
    setWpmPerSecond,
  } = settingStore();

  // Destructure setters from resultStore (final results)
  const {
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalTotalCharacters,
    setFinalCorrectCharacters,
    setFinalTestType,
    setFinalWordCount,
  } = resultStore();

  const { secondsLeft, resetTimer, startTimer, isRunning } =
    useCountdownTimer(selectedTimer);
  const [targetText, setTargetText] = useState<string>("");
  const [completedWordsCount, setCompletedWordsCount] = useState<number>(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Correct characters count for Net WPM and accuracy calculations
  // It's crucial `totalChar` here is `userInput.length` as defined in the `useEffect` below
  const correctCharCount = totalChar - incorrectChar;

  useTitle({ pathName: pathname });

  // Memoized function to generate test text
  const generateText = useCallback(() => {
    let newText = "";
    switch (selectedSetting) {
      case "time":
        newText =
          mode === "eng" ? getRandomParagraph() : getShanRandomParagraph();
        break;
      case "words":
        newText =
          mode === "eng"
            ? getRandomWords(selectedWords)
            : getShanRandomWords(selectedWords);
        break;
      case "quote":
        // Assuming getRandomQuote handles the appropriate language or only English
        newText = getRandomQuote();
        break;
      case "custom":
        newText = customText;
        break;
      default:
        newText = getRandomParagraph(); // Fallback
    }
    setTargetText(newText);
  }, [selectedSetting, selectedWords, mode, customText]);

  // Effect to count completed words, incorrect characters, and total typed characters
  useEffect(() => {
    const input = userInput;
    const target = targetText;

    // Word Counting Logic: A word is completed when a space is typed after it.
    const inputTrimmed = input.trim();
    const inputSegments = inputTrimmed.split(/\s+/).filter((s) => s.length > 0);

    const currentWordCount = input.endsWith(" ")
      ? inputSegments.length // If input ends with space, count all segments
      : Math.max(0, inputSegments.length - (inputTrimmed.length > 0 ? 1 : 0)); // Exclude the last incomplete word unless input is empty

    setCompletedWordsCount(currentWordCount);

    // Character Counting Logic:
    let currentIncorrectCharCount = 0;
    // Compare characters within the overlapping length of userInput and targetText
    for (let i = 0; i < Math.min(input.length, target.length); i++) {
      if (input[i] !== target[i]) {
        currentIncorrectCharCount++;
      }
    }
    // Count all characters typed *beyond* the target text length as incorrect
    if (input.length > target.length) {
      currentIncorrectCharCount += input.length - target.length;
    }
    setIncorrectChar(currentIncorrectCharCount);

    // totalChar always represents the total raw characters typed by the user
    setTotalChar(input.length);
  }, [userInput, targetText, setIncorrectChar, setTotalChar]);

  // Effect to regenerate text and reset ALL relevant states when settings change
  useEffect(() => {
    generateText();
    resetTimer(); // Resets countdown timer
    setUserInput("");
    setCompletedWordsCount(0);
    setIncorrectChar(0);
    setTotalChar(0);
    setStartTime(null);
    setEndTime(null);
    setWpmPerSecond([]); // Clear WPM history
    // Reset all final results
  }, [
    selectedSetting,
    selectedWords,
    mode,
    customText,
    selectedTimer, // Dependencies for regeneration
    generateText,
    resetTimer,
    setUserInput,
    setCompletedWordsCount,
    setIncorrectChar,
    setTotalChar,
    setStartTime,
    setEndTime,
    setWpmPerSecond, // Setters and reset function
  ]);

  // Effect to track start time and start countdown timer
  useEffect(() => {
    // Start time is recorded on the very first character typed
    if (!startTime && userInput.length === 1) {
      setStartTime(Date.now());
      // Only start the countdown timer if it's a 'time' based test
      if (selectedSetting === "time") {
        startTimer();
      }
    }
  }, [selectedSetting, userInput.length, startTime, setStartTime, startTimer]);

  // Effect to track WPM per second for consistency calculation
  useEffect(() => {
    // Stop tracking if test hasn't started or has already ended
    if (!startTime || endTime) {
      // Clear wpmPerSecond array when test is not active
      setWpmPerSecond([]);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const minutesElapsed = (now - startTime) / 1000 / 60;
      if (minutesElapsed <= 0) return; // Prevent division by zero

      const netWpm = correctCharCount / 5 / minutesElapsed;
      // Use direct update since setWpmPerSecond does not accept a function
      setWpmPerSecond([...wpmPerSecond, Math.round(netWpm)]);
    }, 1000); // Update every second

    // Cleanup function: clear interval when component unmounts or dependencies change
    return () => clearInterval(interval);
  }, [startTime, endTime, correctCharCount, setWpmPerSecond]);

  // Effect for test completion and navigation to results page
  useEffect(() => {
    let shouldNavigate = false;
    let finalWordsForDisplay = 0; // To pass to results for 'Test Type' display

    switch (selectedSetting) {
      case "time":
        finalWordsForDisplay = targetText.split(" ").length; // Max words in the target paragraph
        // Test ends if time runs out OR if user completes the entire target text
        if (
          secondsLeft === 0 ||
          (completedWordsCount >= finalWordsForDisplay && targetText.length > 0)
        ) {
          shouldNavigate = true;
        }
        break;
      case "words":
        finalWordsForDisplay = selectedWords;
        // Test ends when user completes the target number of words
        if (completedWordsCount >= selectedWords) {
          shouldNavigate = true;
        }
        break;
      case "quote":
      case "custom":
        finalWordsForDisplay = targetText.split(" ").length; // Total words in quote/custom text
        // Test ends when user completes all words in the target text
        if (
          completedWordsCount >= finalWordsForDisplay &&
          targetText.length > 0
        ) {
          shouldNavigate = true;
        }
        break;
    }

    if (shouldNavigate) {
      const actualEndTime = Date.now();
      setEndTime(actualEndTime); // Set the final end time in the store

      // Ensure startTime is available. If somehow null, fall back to current time.
      // This case should ideally not happen if startTime is set on first input.
      const safeStartTime = startTime || actualEndTime;

      // Calculate final typing statistics
      const stats = calculateTypingStats({
        correctCharCount: correctCharCount,
        totalTypedChars: totalChar, // This is userInput.length
        startTime: safeStartTime,
        endTime: actualEndTime,
        wpmPerSecond: wpmPerSecond,
      });

      // Store calculated stats in the resultStore
      setFinalWpm(stats.wpm);
      setFinalAccuracy(stats.accuracy);
      setFinalRawWpm(stats.rawWpm);
      setFinalConsistency(stats.consistency);
      setFinalTimeTaken(stats.timeTaken);
      setFinalTotalCharacters(totalChar);
      setFinalCorrectCharacters(correctCharCount);
      setFinalTestType(selectedSetting);
      setFinalWordCount(finalWordsForDisplay); // Pass the relevant word count for test type

      navigate("/results"); // Navigate to the results page
    }
  }, [
    secondsLeft,
    completedWordsCount,
    selectedSetting,
    selectedWords,
    targetText,
    navigate,
    startTime,
    totalChar,
    incorrectChar,
    wpmPerSecond,
    correctCharCount,
    setEndTime, // This setter is stable, so it's fine in dependencies or out.
    // Leaving it out helps avoid the infinite loop issue we had.
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalTotalCharacters,
    setFinalCorrectCharacters,
    setFinalTestType,
    setFinalWordCount, // All result setters
  ]);

  // Handler for the "Restart Test" button
  const handleRestartTest = () => {
    generateText(); // Generate new text
    resetTimer(); // Reset countdown timer (from useCountdownTimer hook)
    setUserInput(""); // Clear user input
    setCompletedWordsCount(0); // Reset word count
    setIncorrectChar(0); // Reset incorrect characters
    setTotalChar(0); // Reset total typed characters
    setStartTime(null); // Reset start time
    setEndTime(null); // Reset end time
    setWpmPerSecond([]); // Clear WPM history
  };

  // Ensure timer is reset if selectedTimer setting changes (e.g., from 30s to 60s)
  useEffect(() => {
    resetTimer();
  }, [selectedTimer, resetTimer]);

  return (
    <article className="w-full h-full flex flex-col gap-14 items-center">
      <div className="w-auto mt-7 h-auto">
        <DesktopTestSetting />
        <MobileTestSetting />
      </div>
      <div className="w-full h-auto flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-4"
        >
          {selectedSetting === "time" ? (
            <h3 className="md:text-3xl text-xl text-yellow">
              Time : {secondsLeft} s
            </h3>
          ) : (
            <h3 className="md:text-3xl text-xl text-yellow">
              Words : {completedWordsCount}/
              {selectedSetting === "words"
                ? selectedWords
                : targetText.split(" ").length}{" "}
              words
            </h3>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 h-96 w-full"
        >
          <TypingTest
            isRunning={isRunning}
            startTimer={startTimer}
            targetText={targetText}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full flex justify-center items-center "
        >
          <button
            type="button"
            onClick={handleRestartTest}
            className="mt-10 opacity-70 border border-foreground py-1 px-2 rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer flex gap-2 justify-center items-center"
          >
            <RotateCcw className="size-5 " />
          </button>
        </motion.div>
      </div>
    </article>
  );
};

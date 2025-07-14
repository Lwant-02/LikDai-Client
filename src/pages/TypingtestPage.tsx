import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

import { DesktopTestSetting } from "@/components/DesktopTestSetting";
import { MobileTestSetting } from "@/components/MobileTestSetting";
import { useTitle } from "@/hook/useTitle";
import { useCountdownTimer } from "@/hook/useCountdownTimer";
import { settingStore } from "@/store/settingStore";
import { TypingTest } from "@/components/TypingTest";
import { getRandomParagraph } from "@/util/getRandomParagraph.util";
import { getRandomWords } from "@/util/getRandomWord.util";
import { getRandomQuote } from "@/util/getRandomQuote.util";
import { getShanRandomParagraph } from "@/util/getShanRandomParagraph";
import { getShanRandomWords } from "@/util/getShanRandomWord";
import { resultStore } from "@/store/resultStore";
import { calculateFinalResult } from "@/util/calculateFinalResult";

export const TypingtestPage = () => {
  const {
    selectedSetting,
    selectedTimer,
    selectedWords,
    mode,
    customText,
    setIncorrectChar,
    setTotalChar,
    totalChar,
    incorrectChar,
    userInput,
    setUserInput,
    startTime,
    endTime,
    wpmPerSecond,
    setStartTime,
    setEndTime,
    setWpmPerSecond,
  } = settingStore();
  const {
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalTotalCharacters,
    setFinalCorrectCharacters,
    setFinalTestType,
    setFinalMode,
  } = resultStore();

  const { secondsLeft, resetTimer, startTimer, isRunning } =
    useCountdownTimer(selectedTimer);
  const [targetText, setTargetText] = useState<string>("");
  const [totalTypedWords, setTotalTypedWords] = useState<number>(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hasSetEndTimeRef = useRef(false);
  const correctCharCount = totalChar - incorrectChar;
  useTitle({ pathName: pathname });

  //Generate random text based on selected setting
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
        if (mode === "shan") return;
        newText = getRandomQuote();
        break;
      case "custom":
        newText = customText;
        break;
      default:
        newText =
          mode === "eng" ? getRandomParagraph() : getShanRandomParagraph();
    }
    setTargetText(newText);
  }, [selectedSetting, selectedWords, mode, customText]);

  //Count total typed words and incorrect characters and total characters
  useEffect(() => {
    const input = userInput;
    const target = targetText;

    let currentWordCount = 0;
    const inputSegments = input
      .split(" ")
      .filter((segment) => segment.length > 0);

    if (input.trim() === "") {
      currentWordCount = 0;
    } else {
      if (input.endsWith(" ")) {
        currentWordCount = inputSegments.length;
      } else {
        currentWordCount = Math.max(0, inputSegments.length - 1);
      }
    }
    setTotalTypedWords(currentWordCount);

    let currentIncorrectCharCount = 0;

    // Compare characters within the overlapping length of userInput and targetText.
    for (let i = 0; i < Math.min(input.length, target.length); i++) {
      if (input[i] !== target[i]) {
        currentIncorrectCharCount++;
      }
    }
    // Only count these extra characters as incorrect if they are NOT spaces.
    if (input.length > target.length) {
      for (let i = target.length; i < input.length; i++) {
        if (input[i] !== " ") {
          currentIncorrectCharCount++;
        }
      }
    }
    setIncorrectChar(currentIncorrectCharCount);

    // Count only non-space characters from the user input.
    setTotalChar(input.replace(/\s/g, "").length);
  }, [userInput, targetText]);

  // Regenerate new text
  useEffect(() => {
    generateText();
    resetTimer();
    setUserInput("");
    setTotalTypedWords(0);
    setIncorrectChar(0);
    setTotalChar(0);
    setStartTime(null);
    setEndTime(null);
    setWpmPerSecond([]);
  }, [
    selectedSetting,
    selectedWords,
    mode,
    customText,
    selectedTimer,
    generateText,
    resetTimer,
    setUserInput,
    setTotalTypedWords,
    setIncorrectChar,
    setTotalChar,
    setStartTime,
    setEndTime,
    setWpmPerSecond,
  ]);

  //Track wpm per second
  useEffect(() => {
    if (!startTime || endTime) {
      setWpmPerSecond([]);
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const minutesElapsed = (now - startTime) / 1000 / 60;
      if (minutesElapsed <= 0) return;

      const netWpm = correctCharCount / 5 / minutesElapsed;

      // ✅ FIXED: use functional update to prevent stale closure and rerender loops
      setWpmPerSecond([...wpmPerSecond, Math.round(netWpm)]);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime, correctCharCount, setWpmPerSecond]);

  //Track start and end time only if the mode is not time
  useEffect(() => {
    if (!startTime && userInput.length === 1) {
      setStartTime(Date.now());
      if (selectedSetting === "time") {
        startTimer();
      }
    }
  }, [selectedSetting, userInput.length, startTime, setStartTime, startTimer]);

  //Navigate to result page
  useEffect(() => {
    if (hasSetEndTimeRef.current) return;

    let shouldNavigate = false;
    let finalWordsForDisplay = 0;

    switch (selectedSetting) {
      case "time":
        finalWordsForDisplay = targetText.split(" ").length;
        if (
          secondsLeft === 0 ||
          (totalTypedWords >= finalWordsForDisplay && targetText.length > 0)
        ) {
          shouldNavigate = true;
        }
        break;
      case "words":
        finalWordsForDisplay = selectedWords;
        if (totalTypedWords >= selectedWords) {
          shouldNavigate = true;
        }
        break;
      case "quote":
      case "custom":
        finalWordsForDisplay = targetText.split(" ").length;
        if (totalTypedWords >= finalWordsForDisplay && targetText.length > 0) {
          shouldNavigate = true;
        }
        break;
    }

    if (shouldNavigate) {
      hasSetEndTimeRef.current = true;

      const actualEndTime = Date.now();
      setEndTime(actualEndTime);

      const safeStartTime = startTime || actualEndTime;

      const stats = calculateFinalResult({
        correctCharCount,
        totalTypedChars: totalChar,
        startTime: safeStartTime,
        endTime: actualEndTime,
        wpmPerSecond,
      });

      setFinalWpm(stats.wpm);
      setFinalAccuracy(stats.accuracy);
      setFinalRawWpm(stats.rawWpm);
      setFinalConsistency(stats.consistency);
      setFinalTimeTaken(
        selectedSetting === "time" ? stats.timeTaken + 1 : stats.timeTaken
      );
      setFinalTotalCharacters(totalChar);
      setFinalCorrectCharacters(correctCharCount);
      setFinalTestType(selectedSetting);
      setFinalMode(mode);

      navigate("/results");
    }
  }, [
    secondsLeft,
    totalTypedWords,
    selectedSetting,
    selectedWords,
    targetText,
    navigate,
    startTime,
    totalChar,
    incorrectChar,
    wpmPerSecond,
    correctCharCount,
    setEndTime,
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalTotalCharacters,
    setFinalCorrectCharacters,
    setFinalTestType,
  ]);

  //Restart test
  const handleRestartTest = () => {
    generateText();
    resetTimer();
    setUserInput("");
    setTotalTypedWords(0);
    setIncorrectChar(0);
    setTotalChar(0);
    setStartTime(null);
    setEndTime(null);
    setWpmPerSecond([]);
  };

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
              Characters : {totalTypedWords}/
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

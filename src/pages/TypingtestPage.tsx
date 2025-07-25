import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

import { DesktopTestSetting } from "@/components/DesktopTestSetting";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { settingStore } from "@/store/settingStore";
import { getRandomParagraph } from "@/util/getRandomParagraph.util";
import { getRandomWords } from "@/util/getRandomWord.util";
import { getRandomQuote } from "@/util/getRandomQuote.util";
import { getShanRandomParagraph } from "@/util/getShanRandomParagraph";
import { getShanRandomWords } from "@/util/getShanRandomWord";
import { resultStore } from "@/store/resultStore";
import { calculateFinalResult } from "@/util/calculateFinalResult";
import { calculateCorrectChars } from "@/util/calculateCorrectChars";
import { KeyboardLayout } from "@/components/KeyboardLayout";
import { getShanRandomQuote } from "@/util/getShanRandomQuote";
import { TypingTest } from "@/components/TypingTest";
import GraphemeSplitter from "grapheme-splitter";
import { MobileMessage } from "@/components/MobileMessage";
import { LanguageMode } from "@/components/LanguageMode";
import { TimeWords } from "@/components/TimeWords";
import { TypingToggleButtons } from "@/components/TypingToggleButtons";
// import { MobileTestSetting } from "@/components/MobileTestSetting"; //Remove in small screen
// import { TypingTestCopy } from "@/components/TypingTestCopy"; //Use to test

export const TypingtestPage = () => {
  const {
    selectedSetting,
    selectedTimer,
    selectedWords,
    mode,
    customText,
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
    setFinalCorrectCharacters,
    setFinalTestType,
    setFinalMode,
    setFinalTypedCharacters,
  } = resultStore();

  const { secondsLeft, resetTimer, startTimer, isRunning } =
    useCountdownTimer(selectedTimer);
  const [targetText, setTargetText] = useState<string>("");
  const [totalTypedWords, setTotalTypedWords] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(true);
  const navigate = useNavigate();
  const hasSetEndTimeRef = useRef(false);
  const correctCharCount = calculateCorrectChars(
    userInput.replace(/\s/g, ""),
    targetText.replace(/\s/g, "")
  );

  // Calculate current and next characters for keyboard highlighting
  const splitter = new GraphemeSplitter();
  // For keyboard highlighting, we need to use GraphemeSplitter to get proper graphemes
  // But for text display consistency, we use simple character splitting
  const targetUnitsForKeyboard =
    mode === "shan"
      ? targetText.split("")
      : splitter.splitGraphemes(targetText);
  const typedUnitsForKeyboard =
    mode === "shan" ? userInput.split("") : splitter.splitGraphemes(userInput);

  // Current character is the one at the current typing position
  const currentCharIndex = typedUnitsForKeyboard.length;
  const currentGrapheme = targetUnitsForKeyboard[currentCharIndex] || "";

  // Extract the base character for keyboard highlighting
  // For complex graphemes, we want to highlight the first/base character
  const getBaseCharForKeyboard = (grapheme: string): string => {
    if (!grapheme) return "";

    // For space, return space
    if (grapheme === " ") return " ";

    // For Shan mode, extract the first character from the grapheme
    // This handles cases like "ၵွ" where we want to highlight "ၵ"
    if (mode === "shan") {
      return grapheme.charAt(0);
    }

    // For English mode, return the grapheme as is
    return grapheme;
  };

  const currentChar = getBaseCharForKeyboard(currentGrapheme);

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
        newText = mode === "eng" ? getRandomQuote() : getShanRandomQuote();
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

  //Count total typed words
  useEffect(() => {
    const input = userInput;

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
  }, [userInput, targetText]);

  // Regenerate new text
  useEffect(() => {
    generateText();
    resetTimer();
    setUserInput("");
    setTotalTypedWords(0);
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
      const totalTypedChars = userInput.replace(/\s/g, "").length;

      const stats = calculateFinalResult({
        correctCharCount,
        totalTypedChars,
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
      setFinalCorrectCharacters(correctCharCount);
      setFinalTestType(selectedSetting);
      setFinalMode(mode);
      setFinalTypedCharacters(totalTypedChars);

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
    wpmPerSecond,
    correctCharCount,
    setEndTime,
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalCorrectCharacters,
    setFinalTestType,
  ]);

  //Restart test
  const handleRestartTest = () => {
    generateText();
    resetTimer();
    setUserInput("");
    setTotalTypedWords(0);
    setStartTime(null);
    setEndTime(null);
    setWpmPerSecond([]);
  };

  return (
    <>
      <Helmet>
        <title>Typing Test | LikDai - Pro</title>
        <meta
          name="description"
          content="Test your typing speed and accuracy with LikDai - Pro."
        />
      </Helmet>
      <article className="w-full h-full flex flex-col gap-4 items-center ">
        <div className="w-auto mt-5 h-auto flex justify-center flex-col items-center">
          <LanguageMode />
          <DesktopTestSetting />
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-center ">
          <TimeWords
            secondsLeft={secondsLeft}
            totalTypedWords={totalTypedWords}
            targetText={targetText}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:h-[140px] h-auto w-full xl:overflow-hidden  flex justify-center items-center "
          >
            <TypingTest
              isRunning={isRunning}
              startTimer={startTimer}
              targetText={targetText}
            />
            {/* Mobile Message */}
            <MobileMessage />
          </motion.div>

          {/* Restart and Keyboard Toggle Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex justify-center items-center flex-col absolute md:bottom-8 bottom-16  gap-1"
          >
            {isKeyboardVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="transform scale-50 md:scale-75 lg:scale-90 origin-bottom  xl:block hidden"
              >
                <KeyboardLayout currentChar={currentChar} />
              </motion.div>
            )}
            <TypingToggleButtons
              handleRestartTest={handleRestartTest}
              isKeyboardVisible={isKeyboardVisible}
              setIsKeyboardVisible={setIsKeyboardVisible}
            />
          </motion.div>
        </div>
      </article>
    </>
  );
};

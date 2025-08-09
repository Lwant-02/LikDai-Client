import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

import { settingStore } from "@/store/settingStore";
import { resultStore } from "@/store/resultStore";
import { calculateFinalResult } from "@/util/calculateFinalResult";
import { calculateCorrectChars } from "@/util/calculateCorrectChars";
import { KeyboardLayout } from "@/features/typing/components/KeyboardLayout";
import { TypingTest } from "@/components/TypingTest";
import GraphemeSplitter from "grapheme-splitter";
import { MobileMessage } from "@/features/typing/components/MobileMessage";
import { TypingToggleButtons } from "@/features/typing/components/TypingToggleButtons";
import { Information } from "@/components/Information";
import { LessonGuide } from "@/features/typing/components/LessonGuide";
import { useTimer } from "@/hooks/useTimer";
import { DesktopTestSetting } from "@/features/typing/components/DesktopTestSetting";
import { TimeWords } from "@/features/typing/components/TimeWords";

export const TypingtestPage = () => {
  const {
    mode,
    userInput,
    wpmPerSecond,
    setWpmPerSecond,
    lessonLevel,
    targetText,
    setUserInput,
  } = settingStore();
  const {
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalCorrectCharacters,
    setFinalLevel,
    setFinalMode,
    setFinalTypedCharacters,
  } = resultStore();

  const { isRunning, startTimer, seconds, stopTimer } = useTimer();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTypedWords, setTotalTypedWords] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(true);
  const navigate = useNavigate();
  const correctCharCount = calculateCorrectChars(
    userInput.replace(/\s/g, ""),
    targetText.replace(/\s/g, "")
  );

  // Calculate current and next characters for keyboard highlighting
  const splitter = new GraphemeSplitter();
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

  //Track wpm per second
  useEffect(() => {
    if (!seconds || !startTime) {
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
  }, [seconds, correctCharCount, setWpmPerSecond]);

  //Navigate to result page
  useEffect(() => {
    if (
      targetText.length > 0 &&
      totalTypedWords >= targetText.split(" ").length
    ) {
      stopTimer();
      const totalTypedChars = userInput.replace(/\s/g, "").length;
      const stats = calculateFinalResult({
        correctCharCount,
        totalTypedChars,
        wpmPerSecond,
        durationInMs: seconds * 1000,
      });

      setFinalWpm(stats.wpm);
      setFinalAccuracy(stats.accuracy);
      setFinalRawWpm(stats.rawWpm);
      setFinalConsistency(stats.consistency);
      setFinalTimeTaken(stats.timeTaken);
      setFinalCorrectCharacters(correctCharCount);
      setFinalLevel(lessonLevel);
      setFinalMode(mode);
      setFinalTypedCharacters(totalTypedChars);

      navigate("/results");

      setUserInput("");
      setTotalTypedWords(0);
    }
  }, [
    totalTypedWords,
    targetText,
    navigate,
    wpmPerSecond,
    correctCharCount,
    setFinalWpm,
    setFinalAccuracy,
    setFinalRawWpm,
    setFinalConsistency,
    setFinalTimeTaken,
    setFinalCorrectCharacters,
    setFinalLevel,
  ]);

  useEffect(() => {
    if (!targetText) {
      navigate("/lessons");
    }
  }, [targetText, navigate]);

  return (
    <>
      <Helmet>
        <title>Typing Test | LikDai</title>
        <meta
          name="description"
          content="Test your typing speed and accuracy with LikDai"
        />
      </Helmet>
      <article className="w-full h-full flex flex-col gap-4 items-center ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-auto mt-5 h-auto flex justify-center gap-16 items-center "
        >
          <div className="hidden xl:flex gap-5">
            <h3 className="text-base capitalize text-yellow">
              Level - {lessonLevel}
            </h3>
            <p className="text-base capitalize text-yellow">
              Language - {mode === "eng" ? "English" : "Shan"}
            </p>
          </div>
          <DesktopTestSetting />
          <LessonGuide />
        </motion.div>
        <div className="w-full h-auto flex flex-col justify-center items-center ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:h-[140px] h-auto w-full xl:overflow-hidden mb-1 flex justify-center items-center "
          >
            <TypingTest
              setStartTime={setStartTime}
              targetText={targetText}
              isRunning={isRunning}
              startTimer={startTimer}
            />
            {/* Mobile Message */}
            <MobileMessage />
          </motion.div>
          <TimeWords
            seconds={seconds}
            totalTypedWords={totalTypedWords}
            targetText={targetText}
          />

          {/* Keyboard Toggle Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex justify-center items-center flex-col absolute md:bottom-8 bottom-16  gap-2"
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
              isKeyboardVisible={isKeyboardVisible}
              setIsKeyboardVisible={setIsKeyboardVisible}
            />
          </motion.div>
        </div>
      </article>
      <Information />
    </>
  );
};

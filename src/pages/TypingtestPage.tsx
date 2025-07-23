import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw, Keyboard, EyeOff } from "lucide-react";
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
import { TooltipHover } from "@/components/TooltipHover";
import { cn } from "@/lib/utils";
// import { MobileTestSetting } from "@/components/MobileTestSetting"; //Remove in small screen
// import { TypingTestCopy } from "@/components/TypingTestCopy";

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
    setMode,
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
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const hasSetEndTimeRef = useRef(false);
  const correctCharCount = calculateCorrectChars(
    userInput.replace(/\s/g, ""),
    targetText.replace(/\s/g, "")
  );

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

  //Change mode
  const handleChangeMode = () => {
    if (mode === "eng") {
      setMode("shan");
      setUserInput("");
    } else {
      setMode("eng");
      setUserInput("");
    }
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
      <article className="w-full h-full flex flex-col gap-4 items-center">
        <div className="w-auto mt-5 h-auto flex justify-center flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:flex hidden gap-3 mb-2 w-full justify-center items-center"
          >
            <button
              onClick={handleChangeMode}
              className={cn(
                "w-auto flex justify-center items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
                mode === "shan" && "opacity-100 text-yellow"
              )}
            >
              <img
                src="/svg/Shan-Flag.svg"
                alt="shan-flag"
                className="size-5 rounded-full object-cover border border-foreground"
              />
              <p className="text-md font-secondary">လိၵ်ႈတႆး</p>
            </button>
            <button
              onClick={handleChangeMode}
              className={cn(
                "w-auto opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center gap-1",
                mode === "eng" && "opacity-100 text-yellow"
              )}
            >
              <img
                src="/images/UK-Flag.jpg"
                alt="uk-flag"
                className="size-5 rounded-full object-cover border border-foreground"
              />
              <p className="text-md font-secondary">လိၵ်ႈဢိင်းၵလဵတ်ႈ</p>
            </button>
          </motion.div>
          <DesktopTestSetting />
        </div>
        <div className="w-full h-auto flex flex-col justify-center items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="xl:flex hidden justify-center items-center gap-4 "
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
            className="xl:h-[140px] h-auto w-full xl:overflow-hidden  flex justify-center items-center"
          >
            <TypingTest
              isRunning={isRunning}
              startTimer={startTimer}
              targetText={targetText}
            />
            {/* Mobile Message */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="xl:hidden flex flex-col items-center justify-center p-6 mx-4 bg-gradient-to-br from-foreground/20 to-foreground/10 rounded-2xl border border-primary/20 backdrop-blur-sm h-full w-full "
            >
              <motion.div
                className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 bg-gradient-to-br from-yellow/20 to-orange/20 rounded-full"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-8 h-8 text-yellow "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </motion.div>

              <h3 className="text-xl font-semibold text-center mb-2 bg-gradient-to-r from-yellow to-orange bg-clip-text text-transparent">
                Desktop Experience Required
              </h3>

              <p className="text-center text-sm opacity-80 leading-relaxed max-w-xs">
                LikDai Pro is optimized for desktop and laptop screens to
                provide the best typing experience with full keyboard support.
              </p>

              <div className="flex items-center mt-4 px-4 py-2 bg-primary/10 rounded-full">
                <svg
                  className="w-4 h-4 text-blue mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-xs text-blue font-medium">
                  Switch to desktop for full access
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Restart and Keyboard Toggle Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full flex justify-center items-center flex-col absolute md:bottom-8 bottom-16"
          >
            {isKeyboardVisible && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="transform scale-50 md:scale-75 lg:scale-90 origin-top "
              >
                <KeyboardLayout />
              </motion.div>
            )}
            <div className="flex gap-3">
              <TooltipHover tooltipText="ၶိုၼ်းတေႇမႂ်ႇ">
                <span
                  onClick={handleRestartTest}
                  title="Restart Test"
                  className=" opacity-70 border border-foreground py-1 px-2 rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer flex gap-2 justify-center items-center"
                >
                  <RotateCcw className="size-5 " />
                </span>
              </TooltipHover>

              {/* Keyboard Toggle Button */}
              <TooltipHover
                tooltipText={
                  isKeyboardVisible ? "လပ်ႉလွၵ်းမိုဝ်း" : "ၼႄလွၵ်းမိုဝ်း"
                }
              >
                <span
                  onClick={() => setIsKeyboardVisible(!isKeyboardVisible)}
                  className=" opacity-70 border border-foreground py-1 px-2 md:flex hidden rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer gap-2 justify-center items-center"
                  title={isKeyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
                >
                  {isKeyboardVisible ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Keyboard className="size-5" />
                  )}
                </span>
              </TooltipHover>
            </div>
          </motion.div>
        </div>
      </article>
    </>
  );
};

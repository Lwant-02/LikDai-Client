import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";

import { useSettingStore } from "@/store/settingStore";
import { useResultStore } from "@/store/resultStore";
import { calculateFinalResult } from "@/util/calculateFinalResult";
import { calculateCorrectChars } from "@/util/calculateCorrectChars";
import { KeyboardLayout } from "@/features/typing/components/KeyboardLayout";
import { TypingTest } from "@/components/TypingTest";
import GraphemeSplitter from "grapheme-splitter";
import { TypingToggleButtons } from "@/features/typing/components/TypingToggleButtons";
import { Information } from "@/components/Information";
import { LessonGuide } from "@/features/typing/components/LessonGuide";
import { useTimer } from "@/hooks/useTimer";
import { DesktopTestSetting } from "@/features/typing/components/DesktopTestSetting";
import { TimeWords } from "@/features/typing/components/TimeWords";
import { TYPING_TEST_CONTENT } from "@/content/typing-test.content";
import { NORMAL_CONTENT } from "@/content/normal.content";

export const TypingtestPage = () => {
  const {
    mode,
    userInput,
    wpmPerSecond,
    setWpmPerSecond,
    lessonLevel,
    targetText,
    setUserInput,
  } = useSettingStore();
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
  } = useResultStore();

  const { isRunning, startTimer, seconds, stopTimer, resetTimer } = useTimer();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [totalTypedWords, setTotalTypedWords] = useState<number>(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState<boolean>(true);
  const navigate = useNavigate();
  const correctCharCount = calculateCorrectChars(
    userInput.replace(/\s/g, ""),
    targetText.replace(/\s/g, ""),
  );

  //Get search params
  const [searchParams] = useSearchParams();
  const lessonNumber = Number(searchParams.get("lesson")) || 1;
  const level = searchParams.get("level") || "beginner";

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

    // Normalize typographic/curly quotes to their plain ASCII equivalents
    // so keyboard highlighting works when target text contains smart quotes.
    const smartQuoteMap: Record<string, string> = {
      "\u2018": "'", // LEFT  SINGLE QUOTATION MARK  '
      "\u2019": "'", // RIGHT SINGLE QUOTATION MARK  '
      "\u201A": "'", // SINGLE LOW-9 QUOTATION MARK
      "\u201B": "'", // SINGLE HIGH-REVERSED-9 MARK
      "\u201C": '"', // LEFT  DOUBLE QUOTATION MARK
      "\u201D": '"', // RIGHT DOUBLE QUOTATION MARK
      "\u201E": '"', // DOUBLE LOW-9 QUOTATION MARK
      "\u2032": "'", // PRIME
      "\u2035": "'", // REVERSED PRIME
    };
    const normalized = smartQuoteMap[grapheme] ?? grapheme;

    // For Shan mode, extract the first character from the grapheme
    // This handles cases like "ၵွ" where we want to highlight "ၵ"
    if (mode === "shan") {
      return normalized.charAt(0);
    }

    // For English mode, return the normalized grapheme as is
    return normalized;
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

      navigate(`/results?lesson=${lessonNumber}&level=${level}`);

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

  //Reset timer and user input when lesson number changes
  useEffect(() => {
    resetTimer();
    setUserInput("");
  }, [lessonNumber]);

  useEffect(() => {
    if (!targetText) {
      navigate("/lessons");
    }
  }, [targetText, navigate]);

  return (
    <>
      <Helmet>
        <title>{TYPING_TEST_CONTENT.metatitle}</title>
        <meta name="description" content={TYPING_TEST_CONTENT.description} />
      </Helmet>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/normal-typing")}
        className="absolute top-10 left-[90px] hidden xl:flex items-center gap-2 text-primary/70 hover:text-primary transition-colors z-50 px-4 py-2 hover:bg-foreground/10 rounded-full cursor-pointer"
      >
        <ArrowLeft className="size-5" />
        <span className="font-semibold hidden sm:inline">
          {TYPING_TEST_CONTENT.backBtn}
        </span>
      </motion.button>

      <article className="w-full layout h-full flex flex-col gap-4 items-center pt-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-auto mt-5 h-auto flex justify-center gap-16 items-center"
        >
          <div className="hidden xl:flex gap-5">
            <h3 className="text-base capitalize text-yellow">
              {TYPING_TEST_CONTENT.level} - {NORMAL_CONTENT.type[lessonLevel]}
            </h3>
            <p className="text-base capitalize text-yellow">
              {TYPING_TEST_CONTENT.language} -{" "}
              {mode === "eng" ? NORMAL_CONTENT.eng : NORMAL_CONTENT.shn}
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

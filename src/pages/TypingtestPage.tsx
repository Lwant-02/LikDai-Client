import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
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
  } = settingStore();

  const { secondsLeft, resetTimer, startTimer, isRunning } =
    useCountdownTimer(selectedTimer);
  const [targetText, setTargetText] = useState<string>("");
  const [totalTypedWords, setTotalTypedWords] = useState<number>(0);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useTitle({ pathName: pathname });

  //Generate random text based on selected setting
  const generateText = () => {
    switch (selectedSetting) {
      case "time":
        if (mode === "eng") {
          const newText = getRandomParagraph();
          setTargetText(newText);
        } else {
          const newText = "မႂ်ႇသုင်ၶႃႈ";
          setTargetText(newText);
        }
        break;
      case "words":
        if (mode === "eng") {
          const newWords = getRandomWords(selectedWords);
          setTargetText(newWords);
        } else {
          const newWords = "မႂ်ႇသုင်ၶႃႈ";
          setTargetText(newWords);
        }
        break;
      case "quote":
        if (mode === "shan") return;
        const newQuote = getRandomQuote();
        setTargetText(newQuote);
        break;
      case "custom":
        if (mode === "eng") {
          setTargetText(customText);
        } else {
          setTargetText(customText);
        }
        break;
    }
  };

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
    setUserInput("");
    setTotalTypedWords(0);
  }, [selectedSetting, selectedWords, mode, customText, selectedTimer]);

  //Navigate to result page
  useEffect(() => {
    switch (selectedSetting) {
      case "time":
        if (
          secondsLeft === 0 ||
          totalTypedWords === targetText.split(" ").length
        ) {
          navigate("/results");
        }
        break;
      case "words":
        if (totalTypedWords === selectedWords) {
          navigate("/results");
        }
        break;
      case "quote":
        if (totalTypedWords === targetText.split(" ").length) {
          navigate("/results");
        }
        break;
      case "custom":
        if (totalTypedWords === targetText.split(" ").length) {
          navigate("/results");
        }
        break;
    }
  }, [secondsLeft, totalTypedWords, targetText]);

  //Restart test
  const handleRestartTest = () => {
    generateText();
    resetTimer();
    setUserInput("");
    setTotalTypedWords(0);
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

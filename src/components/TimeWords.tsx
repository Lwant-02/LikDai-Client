import { motion } from "framer-motion";
import { settingStore } from "@/store/settingStore";

interface TimeWordsProps {
  secondsLeft: number;
  totalTypedWords: number;
  targetText: string;
}

export const TimeWords = ({
  secondsLeft,
  totalTypedWords,
  targetText,
}: TimeWordsProps) => {
  const { selectedSetting, selectedWords } = settingStore();

  return (
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
          Words : {totalTypedWords}/
          {selectedSetting === "words"
            ? selectedWords
            : targetText.split(" ").length}
        </h3>
      )}
    </motion.div>
  );
};

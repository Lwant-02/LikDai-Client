import { motion } from "framer-motion";

interface TimeWordsProps {
  seconds: number;
  totalTypedWords: number;
  targetText: string;
}

export const TimeWords = ({
  totalTypedWords,
  targetText,
  seconds,
}: TimeWordsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="xl:flex hidden justify-center items-center gap-4 "
    >
      <h3 className="text-xl text-yellow">
        Words : {totalTypedWords}/{targetText.split(" ").length}
      </h3>
      <h3 className="text-xl text-yellow">Time : {seconds} s</h3>
    </motion.div>
  );
};

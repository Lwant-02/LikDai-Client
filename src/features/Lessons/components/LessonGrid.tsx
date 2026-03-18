import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { useNavigate } from "react-router-dom";
import { getWordNumber } from "@/util/getWordNumber";

interface LessonGridProps {
  content: string;
  index: number;
}

export const LessonGrid = ({ content, index }: LessonGridProps) => {
  const { lessonLevel, setTargetText } = settingStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const getlevelColor = (level: LessonLevel) => {
    switch (level) {
      case "beginner":
        return "bg-green/10 text-green border-green/20";
      case "intermediate":
        return "bg-blue/10 text-blue border-blue/20";
      case "advanced":
        return "bg-purple/10 text-purple border-purple/20";
      case "quotes":
        return "bg-orange/10 text-orange border-orange/20";
      case "music":
        return "bg-yellow/10 text-yellow border-yellow/20";
      default:
        return "bg-gray/10 text-gray border-gray/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: 0.1 * index }}
      onClick={() => {
        navigate(`/typing-test?lesson=${index + 1}&level=${lessonLevel}`);
        setTargetText(content);
      }}
      className="bg-white cursor-pointer dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center xl:w-32 w-10 bg-gradient-to-br from-yellow to-orange rounded-xl text-white font-bold text-lg">
              <span className={cn("xl:flex hidden")}>
                {t("lesson_page.lessons")}-
              </span>{" "}
              {index + 1}
            </div>
          </div>
          <div className="flex items-end gap-2">
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border capitalize opacity-70",
              )}
            >
              {getWordNumber(content)} {t("lesson_page.word")}
            </span>
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border capitalize ",
                getlevelColor(lessonLevel),
              )}
            >
              {t(`lesson_page.${lessonLevel}.title`)}
            </span>
          </div>
        </div>
        <h3 className={cn("text-xl font-bold w-full line-clamp-1")}>
          {content}
        </h3>
      </div>
    </motion.div>
  );
};

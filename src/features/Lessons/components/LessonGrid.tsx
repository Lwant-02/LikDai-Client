import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

interface LessonGridProps {
  content: string;
  index: number;
}

export const LessonGrid = ({ content, index }: LessonGridProps) => {
  const { mode, lessonLevel } = settingStore();

  const getlevelColor = (level: string) => {
    switch (level) {
      case "easy":
        return "bg-green/10 text-green border-green/20";
      case "medium":
        return "bg-yellow/10 text-yellow border-yellow/20";
      case "hard":
        return "bg-red/10 text-red border-red/20";
      default:
        return "bg-gray/10 text-gray border-gray/20";
    }
  };

  const getlevelText = (level: string) => {
    if (mode === "shan") {
      switch (level) {
        case "easy":
          return "ငၢႆႈ";
        case "medium":
          return "ပၢႆ";
        case "hard":
          return "ယၢပ်ႇ";
        default:
          return level;
      }
    }
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: 0.1 * index }}
      className="bg-white cursor-pointer dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-32 bg-gradient-to-br from-yellow to-orange rounded-xl text-white font-bold text-lg">
              Lesson {index + 1}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1 rounded-full border capitalize",
                getlevelColor(lessonLevel)
              )}
            >
              {getlevelText(lessonLevel)}
            </span>
          </div>
        </div>
        <h3
          className={cn(
            "text-xl font-bold w-full line-clamp-1",
            mode === "shan" && "font-secondary"
          )}
        >
          {content}
        </h3>
      </div>
    </motion.div>
  );
};

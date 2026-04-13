import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useSettingStore } from "@/store/settingStore";
import { useNavigate } from "react-router-dom";
import { getWordNumber } from "@/util/getWordNumber";
import { NORMAL_CONTENT } from "@/content/normal.content";

interface LessonGridProps {
  content: string;
  index: number;
}

export const LessonCard = ({ content, index }: LessonGridProps) => {
  const { lessonLevel, setTargetText } = useSettingStore();
  const navigate = useNavigate();

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
      default:
        return "bg-gray/10 text-gray border-gray/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, delay: 0.05 * index }}
      onClick={() => {
        navigate(`/typing-test?lesson=${index + 1}&level=${lessonLevel}`);
        setTargetText(content);
      }}
      className="group relative cursor-pointer overflow-hidden bg-background/80 backdrop-blur-xl border border-primary/20 hover:border-yellow/50 transition-all duration-500 shadow-xl hover:shadow-yellow/10 rounded-3xl p-6"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-yellow/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 shadow-inner bg-gradient-to-br from-yellow/20 to-orange/20 border border-yellow/30 rounded-xl text-yellow font-bold text-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              {index + 1}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-full border bg-foreground/10 border-white/10 text-primary/80 group-hover:text-primary transition-colors duration-300",
              )}
            >
              {getWordNumber(content)} {NORMAL_CONTENT.word}
            </span>
            <span
              className={cn(
                "text-xs font-semibold px-3 py-1.5 rounded-full border capitalize",
                getlevelColor(lessonLevel),
              )}
            >
              {NORMAL_CONTENT.type[lessonLevel]}
            </span>
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold leading-relaxed line-clamp-1 text-primary/80 group-hover:text-primary transition-colors duration-300 px-1 mb-1">
          {content}
        </h3>

        <div className="flex items-center justify-between">
          {/* Animated decorative line */}
          <div className="h-[1px] flex-1 bg-gradient-to-r from-yellow/50 to-transparent mr-4 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />

          {/* Hover Arrow Icon */}
          <div className="flex items-center justify-center size-8 rounded-full border border-yellow/50 text-yellow opacity-0 -translate-x-4 bg-yellow/10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
            <ArrowRight className="size-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

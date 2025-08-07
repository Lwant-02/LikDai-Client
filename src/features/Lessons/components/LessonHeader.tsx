import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const LessonHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mb-5 h-auto"
    >
      <div className="flex items-center justify-center gap-2 mb-4 ">
        <h1
          className={cn(
            "text-5xl font-bold bg-gradient-to-r from-yellow to-orange bg-clip-text text-transparent"
          )}
        >
          Typing Lessons
        </h1>
      </div>
      <p className="text-xl opacity-80 max-w-2xl mx-auto">
        Choose your level and start improving your typing skills with structured
        lessons
      </p>
    </motion.div>
  );
};

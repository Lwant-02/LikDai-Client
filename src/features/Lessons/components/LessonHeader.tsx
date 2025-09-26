import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";

export const LessonHeader = () => {
  const { t } = useTranslation();
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
            "text-5xl font-bold bg-gradient-to-r py-3 from-yellow to-orange bg-clip-text text-transparent"
          )}
        >
          {t("lesson_page.title")}
        </h1>
      </div>
      <p className="text-xl opacity-80 max-w-2xl mx-auto">
        {t("lesson_page.description")}
      </p>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

export const LessonLanguageSelector = () => {
  const { t } = useTranslation();
  const { mode, setMode } = settingStore();
  const handleLanguageChange = () => {
    setMode(mode === "eng" ? "shan" : "eng");
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="flex justify-center mb-8"
    >
      <div className="bg-foreground backdrop-blur-sm py-2 px-6 rounded-2xl border border-white/20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Globe className="size-6 text-yellow" />
            <span className="text-lg font-semibold">
              {t("lesson_page.lang_mode.title")}
            </span>
          </div>
          <div className="flex gap-3">
            <span
              onClick={handleLanguageChange}
              className={cn(
                "w-auto flex justify-center items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
                mode === "shan" && "opacity-100 text-yellow"
              )}
            >
              <img
                src="/svg/Shan-Flag.svg"
                alt="Shan"
                className="size-5 rounded-full object-cover border border-foreground"
              />
              <span className="font-semibold">
                {t("lesson_page.lang_mode.1")}
              </span>
            </span>
            <span
              onClick={handleLanguageChange}
              className={cn(
                "w-auto flex justify-center items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
                mode === "eng" && "opacity-100 text-yellow"
              )}
            >
              <img
                src="/images/UK-Flag.jpg"
                alt="English"
                className="size-5 rounded-full object-cover border border-foreground"
              />
              <span className="font-semibold">
                {t("lesson_page.lang_mode.0")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { Languages } from "lucide-react";
import { useTranslation } from "react-i18next";

interface LeaderboardFilterProps {
  languageFilter: LanguageFilter;
  setLanguageFilter: (filter: LanguageFilter) => void;
}

export const LeaderboardFilter = ({
  languageFilter,
  setLanguageFilter,
}: LeaderboardFilterProps) => {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-6 sm:mb-8 flex flex-wrap xl:gap-7 gap-3 flex-col justify-start items-start"
    >
      <div className="flex justify-between items-center gap-3">
        <div className="xl:flex hidden items-center gap-2">
          <Languages className="size-5 opacity-70" />
          <span className="text-sm opacity-70">
            {t("lesson_page.lang_mode.title")}:
          </span>
        </div>

        <div className="flex bg-foreground/50 rounded-md overflow-hidden">
          {(["shan", "eng"] as LanguageFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setLanguageFilter(filter)}
              className={`cursor-pointer px-3 py-1 text-sm capitalize ${
                languageFilter === filter
                  ? "bg-blue/50 text-primary"
                  : "hover:bg-foreground/20"
              }`}
            >
              {t(`lesson_page.lang_mode.${filter === "eng" ? 0 : 1}`)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

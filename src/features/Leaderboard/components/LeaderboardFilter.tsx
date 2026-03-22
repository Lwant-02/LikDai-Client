import { motion } from "framer-motion";
import { Languages } from "lucide-react";

import { LEADERBOARD_CONTENT } from "@/content/leaderboard.content";

interface LeaderboardFilterProps {
  languageFilter: LanguageFilter;
  setLanguageFilter: (filter: LanguageFilter) => void;
}

export const LeaderboardFilter = ({
  languageFilter,
  setLanguageFilter,
}: LeaderboardFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-6 sm:mb-8 flex flex-wrap xl:gap-7 gap-3 flex-col justify-start items-start"
    >
      <div className="flex justify-between items-center gap-3">
        <div className="xl:flex hidden items-center gap-2">
          <Languages className="size-6 opacity-70" />
          <span className="text-base opacity-70">
            {LEADERBOARD_CONTENT.language.lng} :
          </span>
        </div>

        <div className="flex bg-foreground border border-primary/20 rounded-full overflow-hidden w-52 ">
          {(["shan", "eng"] as LanguageFilter[]).map((filter) => (
            <button
              key={filter}
              onClick={() => setLanguageFilter(filter)}
              className={`cursor-pointer px-3 py-2 w-full text-sm capitalize ${
                languageFilter === filter
                  ? "bg-blue/50 text-primary"
                  : "hover:bg-foreground/20"
              }`}
            >
              {filter === "eng"
                ? LEADERBOARD_CONTENT.language.eng
                : LEADERBOARD_CONTENT.language.shan}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

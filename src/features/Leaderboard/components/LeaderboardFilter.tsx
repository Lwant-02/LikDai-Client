import { motion } from "framer-motion";
import { Languages } from "lucide-react";

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
          <Languages className="size-5 opacity-70" />
          <span className="text-sm opacity-70">Language:</span>
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
              {filter === "eng" ? "English" : "Shan"}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

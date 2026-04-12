import { motion } from "framer-motion";
import { WORD_FALLING_CONTENT } from "@/content/word-falling.content";
import { ArrowRight, Play } from "lucide-react";

export const PauseOverlay = ({ togglePause }: { togglePause: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-background/80 z-50"
    >
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl font-bold font-tachileik">
          {WORD_FALLING_CONTENT.pause}
        </h2>
        <div className="flex flex-col items-center gap-4 mt-10">
          <button
            onClick={togglePause}
            className="group relative w-60 bg-yellow cursor-pointer text-background btn h-11! transition-all hover:shadow-xl hover:shadow-secondary/20"
          >
            <span className="relative z-10 text-base">တႄႇၶိုၼ်း</span>
            <Play className="size-4 relative z-10 transition-transform duration-300" />
          </button>
          <button
            onClick={togglePause}
            className="group relative w-60 bg-primary cursor-pointer text-background btn h-11! transition-all hover:shadow-xl hover:shadow-secondary/20"
          >
            <span className="relative z-10 text-base">မိူဝ်းၼႃႈႁိူၼ်း</span>
            <ArrowRight className="size-4 relative z-10 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

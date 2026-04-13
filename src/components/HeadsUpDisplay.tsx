import { motion } from "framer-motion";
import { Heart, Trophy, Play, Pause, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeadsUpDisplayProps {
  score: number;
  lives: number;
  level: number;
  isPaused: boolean;
  isGameOver: boolean;
  togglePause: () => void;
}

export const HeadsUpDisplay = ({
  score,
  lives,
  level,
  isPaused,
  isGameOver,
  togglePause,
}: HeadsUpDisplayProps) => {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 px-10 py-1 backdrop-blur-md bg-background/10"
    >
      <div className="layout">
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <Trophy className="size-4 text-yellow" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-yellow">
                {score.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-purple" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-purple">{level}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  "size-4 transition-all duration-300",
                  i < lives ? "fill-red-500 text-red-500" : "text-primary/20",
                )}
              />
            ))}
          </div>

          <button
            onClick={togglePause}
            disabled={isGameOver}
            className="p-2 rounded-full cursor-pointer hover:bg-primary/10 transition-colors disabled:opacity-50"
          >
            {isPaused ? (
              <Play className="size-4" />
            ) : (
              <Pause className="size-4" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

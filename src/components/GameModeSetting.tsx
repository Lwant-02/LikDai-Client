import { WORD_FALLING_CONTENT } from "@/content/word-falling.content";
import { cn } from "@/lib/utils";
import { useSettingStore } from "@/store/settingStore";
import { motion } from "framer-motion";
import { Gamepad2, Languages, Timer, Zap } from "lucide-react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LEVEL_CONFIG: Record<
  Exclude<LessonLevel, "quotes">,
  {
    label: string;
    labelEn: string;
    color: string;
    glowColor: string;
    borderColor: string;
    icon: string;
    description: string;
  }
> = {
  beginner: {
    label: WORD_FALLING_CONTENT.easy,
    labelEn: "Beginner",
    color: "text-emerald-400",
    glowColor: "shadow-emerald-500/50",
    borderColor: "border-emerald-500/50",
    icon: "🌱",
    description: "Slow speed, simple words",
  },
  intermediate: {
    label: WORD_FALLING_CONTENT.medium,
    labelEn: "Medium",
    color: "text-amber-400",
    glowColor: "shadow-amber-500/50",
    borderColor: "border-amber-500/50",
    icon: "⚡",
    description: "Moderate speed, mixed words",
  },
  advanced: {
    label: WORD_FALLING_CONTENT.hard,
    labelEn: "Advanced",
    color: "text-rose-500",
    glowColor: "shadow-rose-500/50",
    borderColor: "border-rose-500/50",
    icon: "🔥",
    description: "Fast speed, complex words",
  },
};

const MODE_CONFIG: Record<
  LanguageFilter,
  {
    label: string;
    flag: string;
    color: string;
    glowColor: string;
    borderColor: string;
  }
> = {
  shan: {
    label: WORD_FALLING_CONTENT.shn,
    flag: "/svg/Shan-Flag.svg",
    color: "text-amber-400",
    glowColor: "shadow-amber-500/30",
    borderColor: "border-amber-500/50",
  },
  eng: {
    label: WORD_FALLING_CONTENT.eng,
    flag: "/images/UK-Flag.jpg",
    color: "text-sky-400",
    glowColor: "shadow-sky-500/30",
    borderColor: "border-sky-500/50",
  },
};

const TIME_CONFIG: Record<
  Timer,
  {
    label: string;
    labelEn: string;
    color: string;
    glowColor: string;
    borderColor: string;
  }
> = {
  60: {
    label: "1 ၼႃးထီး",
    labelEn: "1 min",
    color: "text-blue-400",
    glowColor: "shadow-blue-500/30",
    borderColor: "border-blue-500/50",
  },
  120: {
    label: "2 ၼႃးထီး",
    labelEn: "2 min",
    color: "text-indigo-400",
    glowColor: "shadow-indigo-500/30",
    borderColor: "border-indigo-500/50",
  },
  180: {
    label: "3 ၼႃးထီး",
    labelEn: "3 min",
    color: "text-purple-400",
    glowColor: "shadow-purple-500/30",
    borderColor: "border-purple-500/50",
  },
};

interface GameModeSettingProps {
  handleStartPlay: () => void;
}

export const GameModeSetting = ({ handleStartPlay }: GameModeSettingProps) => {
  const { timer, setTimer, mode, setMode, lessonLevel, setLessonLevel } =
    useSettingStore();
  return (
    <>
      <motion.div variants={itemVariants} className="w-full mx-auto">
        <div className="grid grid-cols-1 max-w-lg mx-auto gap-6">
          <div className="w-full flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Languages className="size-4 text-blue" />
              <span className="text-sm font-bold tracking-widest opacity-60 uppercase ">
                {WORD_FALLING_CONTENT.selectLanguage}
              </span>
            </div>
            <div className="flex bg-background rounded-full p-1 border border-primary/10 relative">
              {(
                Object.entries(MODE_CONFIG) as [
                  LanguageFilter,
                  (typeof MODE_CONFIG)[LanguageFilter],
                ][]
              ).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className={cn(
                    "relative flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-full transition-all duration-300 font-bold  text-sm md:text-base z-10 cursor-pointer overflow-hidden",
                    mode === key
                      ? config.color
                      : "text-primary/50 hover:text-primary/80",
                  )}
                >
                  {mode === key && (
                    <motion.div
                      layoutId="mode-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md z-[-1]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <img
                    src={config.flag}
                    alt={config.label}
                    className="w-5 h-5 object-cover rounded-full border border-primary/20 block"
                  />
                  <span className="z-10">{config.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex-[1.5]">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Zap className="size-4 text-yellow" />
              <span className="text-sm font-bold tracking-widest opacity-60 uppercase ">
                {WORD_FALLING_CONTENT.selectDifficulty}
              </span>
            </div>
            <div className="flex bg-background rounded-full p-1 border border-primary/10 relative">
              {(
                Object.entries(LEVEL_CONFIG) as [
                  Exclude<LessonLevel, "quotes">,
                  (typeof LEVEL_CONFIG)[Exclude<LessonLevel, "quotes">],
                ][]
              ).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setLessonLevel(key)}
                  className={cn(
                    "relative flex-1 flex items-center justify-center gap-2 py-2 px-2 rounded-full transition-all duration-300 font-bold  text-xs sm:text-sm z-10 cursor-pointer overflow-hidden",
                    lessonLevel === key
                      ? config.color
                      : "text-primary/50 hover:text-primary/80",
                  )}
                >
                  {lessonLevel === key && (
                    <motion.div
                      layoutId="level-pill"
                      className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md z-[-1]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="z-10 text-lg hidden sm:block">
                    {config.icon}
                  </span>
                  <span className="z-10">{config.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full flex-1 mt-4 lg:mt-0">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <Timer className="size-4 text-blue/70" />
              <span className="text-sm font-bold tracking-widest opacity-60 uppercase ">
                ၶၢဝ်းယၢမ်း
              </span>
            </div>
            <div className="flex bg-background rounded-full p-1 border border-primary/10 relative">
              {Object.entries(TIME_CONFIG).map(([rawKey, config]) => {
                const key = Number(rawKey) as Timer;
                return (
                  <button
                    key={key}
                    onClick={() => setTimer(key)}
                    className={cn(
                      "relative flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-full transition-all duration-300 font-bold  text-xs sm:text-sm z-10 cursor-pointer overflow-hidden",
                      timer === key
                        ? config.color
                        : "text-primary/50 hover:text-primary/80",
                    )}
                  >
                    {timer === key && (
                      <motion.div
                        layoutId="time-pill"
                        className="absolute inset-0 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-md z-[-1]"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="z-10">{config.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="flex justify-center items-center mt-10">
        <button
          onClick={handleStartPlay}
          className="group relative bg-primary cursor-pointer text-background btn h-11! transition-all hover:scale-105 hover:shadow-xl hover:shadow-secondary/20"
        >
          <span className="relative z-10 text-base">တႄႇလဵၼ်ႈတေႃႈလဵဝ်</span>
          <Gamepad2 className="size-5 relative z-10 transition-transform duration-300" />
          <div className="absolute inset-0 bg-yellow translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
        </button>
      </motion.div>
    </>
  );
};

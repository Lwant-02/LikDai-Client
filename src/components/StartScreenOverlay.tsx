import { motion } from "framer-motion";
import { ArrowRight, Gamepad2 } from "lucide-react";
import { WORD_FALLING_CONTENT } from "@/content/word-falling.content";
import { useSettingStore } from "@/store/settingStore";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { KeyBoardSelector } from "@/features/typing/components/KeyBoardSelector";
import { NORMAL_CONTENT } from "@/content/normal.content";

const MODE_CONFIG = [
  {
    lng: "shan",
    title: NORMAL_CONTENT.shn,
  },
  {
    lng: "eng",
    title: NORMAL_CONTENT.eng,
  },
];

export const StartScreenOverlay = ({
  startGame,
}: {
  startGame: () => void;
}) => {
  const { mode, setMode } = useSettingStore();
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center rounded-xl z-30"
    >
      <div className="text-center space-y-6 w-96 flex justify-center items-center flex-col">
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-tachileik">
            {WORD_FALLING_CONTENT.title}
          </h1>
        </motion.div>

        <div className="w-full flex flex-col items-center gap-6 my-10">
          <div className="flex items-center justify-center gap-6">
            {MODE_CONFIG.map((m) => (
              <button
                key={m.lng}
                onClick={() => setMode(m.lng as any)}
                className={cn(
                  "w-auto opacity-50 text-base hover:opacity-100 transition-opacity duration-200 cursor-pointer",
                  m.lng === "shan" ? "text-yellow" : "text-blue",
                  mode === m.lng && "opacity-100",
                )}
              >
                {m.title}
              </button>
            ))}
          </div>
          {mode === "shan" && <KeyBoardSelector />}
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={startGame}
            className="group relative w-52 bg-primary cursor-pointer text-background btn h-11! transition-all hover:shadow-xl hover:shadow-secondary/20"
          >
            <span className="relative z-10 text-base">တႄႇလဵၼ်ႈ</span>
            <Gamepad2 className="size-4 relative z-10 transition-transform duration-300" />
            <div className="absolute inset-0 bg-yellow translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
          </button>
          <button
            onClick={() => navigate("/lessons")}
            className="relative w-52 border border-primary/30 hover:bg-primary/10 transition-colors cursor-pointer btn h-11!"
          >
            <span className="relative z-10 text-base">မိူဝ်းၼႃႈႁိူၼ်း</span>
            <ArrowRight className="size-4 relative z-10 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

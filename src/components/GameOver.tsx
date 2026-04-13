import { motion } from "framer-motion";
import {
  Trophy,
  Sparkles,
  Target,
  Clock,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const GameOver = ({
  score,
  level,
  wordsCaught,
  maxCombo,
  restartGame,
}: {
  score: number;
  level: number;
  wordsCaught: number;
  maxCombo: number;
  restartGame: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm z-30"
    >
      <div className="text-center space-y-6 max-w-md mx-auto p-6">
        <motion.div
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-red-500 font-tachileik">
            ၵဵမ်းယဝ်ႉတူဝ်ႈ
          </h2>

          <div className="grid grid-cols-2 gap-4 py-6">
            <div className="bg-primary/5 rounded-full p-4">
              <Trophy className="w-6 h-6 text-yellow mx-auto mb-2" />
              <div className="text-sm opacity-60">Score</div>
              <div className="text-2xl font-bold text-yellow">
                {score.toLocaleString()}
              </div>
            </div>
            <div className="bg-primary/5 rounded-full p-4">
              <Sparkles className="w-6 h-6 text-purple mx-auto mb-2" />
              <div className="text-sm opacity-60">Level</div>
              <div className="text-2xl font-bold text-purple">{level}</div>
            </div>
            <div className="bg-primary/5 rounded-full p-4">
              <Target className="w-6 h-6 text-green mx-auto mb-2" />
              <div className="text-sm opacity-60">Caught</div>
              <div className="text-2xl font-bold text-green">{wordsCaught}</div>
            </div>
            <div className="bg-primary/5 rounded-full p-4">
              <Clock className="w-6 h-6 text-blue mx-auto mb-2" />
              <div className="text-sm opacity-60">Best Combo</div>
              <div className="text-2xl font-bold text-blue">{maxCombo}x</div>
            </div>
          </div>
        </motion.div>

        <div className="gap-2 grid grid-cols-2">
          <button
            onClick={restartGame}
            className="group relative bg-primary cursor-pointer text-background btn h-11! transition-all hover:shadow-xl hover:shadow-secondary/20"
          >
            <span className="relative z-10 text-base">ၶိုၼ်းလဵၼ်ႈ</span>
            <Gamepad2 className="size-4 relative z-10 transition-transform duration-300" />
            <div className="absolute inset-0 bg-yellow translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
          </button>
          <button
            onClick={() => navigate("/lessons")}
            className="relative border border-primary/30 hover:bg-primary/10 transition-colors cursor-pointer btn h-11!"
          >
            <span className="relative z-10 text-base">မိူဝ်းၼႃႈႁိူၼ်း</span>
            <ArrowRight className="size-4 relative z-10 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

import { AnimatePresence, motion } from "framer-motion";

interface LevelUpProps {
  showLevelUp: boolean;
}

export const LevelUp = ({ showLevelUp }: LevelUpProps) => {
  return (
    <AnimatePresence>
      {showLevelUp && (
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
        >
          <div className="text-4xl md:text-6xl font-bold text-yellow text-center font-tachileik">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              ၶိုၼ်ႈၸၼ်ႉထႅင်ႈယဝ်ႉ!
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

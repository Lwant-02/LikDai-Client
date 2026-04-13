import { AnimatePresence, motion } from "framer-motion";

export const ComboDisplay = ({
  combo,
  maxCombo,
}: {
  combo: number;
  maxCombo: number;
}) => {
  return (
    <AnimatePresence>
      {combo > 1 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="absolute top-24 right-4 md:right-8 z-40"
        >
          <div className="text-right font-tachileik opacity-85">
            <div className="text-3xl md:text-4xl font-bold text-orange">
              {combo}x COMBO
            </div>
            <div className="text-sm opacity-60">Max: {maxCombo}x</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

import { motion } from "framer-motion";

export const MobileMessage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="xl:hidden flex flex-col items-center justify-center p-6 mx-4 bg-gradient-to-br from-foreground/20 to-foreground/10 rounded-2xl border border-primary/20 backdrop-blur-sm h-full w-full "
    >
      <motion.div
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 mb-4 bg-gradient-to-br from-yellow/20 to-orange/20 rounded-full"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          className="w-8 h-8 text-yellow "
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      </motion.div>

      <h3 className="text-xl font-semibold text-center mb-2 bg-gradient-to-r from-yellow to-orange bg-clip-text text-transparent">
        Desktop Experience Required
      </h3>

      <p className="text-center text-sm opacity-80 leading-relaxed max-w-xs">
        LikDai Pro is optimized for desktop and laptop screens to provide the
        best typing experience with full keyboard support.
      </p>

      <div className="flex items-center mt-4 px-4 py-2 bg-primary/10 rounded-full">
        <svg
          className="w-4 h-4 text-blue mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xs text-blue font-medium">
          Switch to desktop for full access
        </span>
      </div>
    </motion.div>
  );
};

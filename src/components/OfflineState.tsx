import { motion, type Variants } from "framer-motion";
import { WifiOff, CloudOff } from "lucide-react";

interface OfflineStateProps {
  title?: string;
  message?: string;
  variant?: "default" | "leaderboard" | "login";
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const floatingIconVariants: Variants = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function OfflineState({
  title = "You're Offline",
  message = "Please check your internet connection and try again.",
  variant = "default",
}: OfflineStateProps) {
  const isLeaderboard = variant === "leaderboard";
  const isLogin = variant === "login";

  return (
    <motion.div
      className="w-full min-h-[60vh] flex flex-col justify-center items-center px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        variants={floatingIconVariants}
        animate="float"
        className="mb-8 relative"
      >
        <div
          className={`w-24 h-24 rounded-full flex items-center justify-center ${
            isLeaderboard
              ? "bg-gradient-to-br from-yellow/20 to-yellow/10 border-yellow/30"
              : isLogin
                ? "bg-gradient-to-br from-blue/20 to-blue/10 border-blue/30"
                : "bg-gradient-to-br from-foreground/10 to-foreground/5 border-foreground/20"
          } border-2 backdrop-blur-sm shadow-xl`}
        >
          {isLeaderboard ? (
            <CloudOff className="w-12 h-12 text-yellow opacity-80" />
          ) : (
            <WifiOff
              className={`w-12 h-12 ${isLogin ? "text-blue" : "text-foreground"} opacity-80`}
            />
          )}
        </div>

        <div
          className={`absolute inset-0 rounded-full border ${isLeaderboard ? "border-yellow/20" : "border-foreground/10"} animate-ping`}
          style={{ animationDuration: "2s" }}
        />
      </motion.div>

      <motion.h2
        variants={itemVariants}
        className="text-2xl md:text-3xl py-2 font-bold mb-3 text-center text-yellow"
      >
        {title}
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className="text-base md:text-lg text-center opacity-40 max-w-md mb-8"
      >
        {message}
      </motion.p>

      <motion.div variants={itemVariants} className="flex gap-2 mt-4">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`w-1 h-8 rounded-full ${
              isLeaderboard
                ? "bg-yellow/40"
                : isLogin
                  ? "bg-blue/40"
                  : "bg-foreground/30"
            }`}
            animate={{
              scaleY: [0.5, 1, 0.5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Keyboard, Home } from "lucide-react";

import { Button } from "@/components/ui/button";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Keyboard key animation
  const keyVariants = {
    initial: { y: 0 },
    animate: (i: number) => ({
      y: [0, -15, 0],
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        repeat: Infinity,
        repeatDelay: 2 + Math.random() * 3,
      },
    }),
  };

  // Keys that will animate
  const keys = ["4", "0", "4"];

  return (
    <article className="min-h-screen w-full flex flex-col items-center justify-center px-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full text-center"
      >
        {/* 404 with animated keyboard keys */}
        <motion.div
          className="flex justify-center items-center gap-2 mb-8"
          variants={itemVariants}
        >
          {keys.map((key, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="initial"
              animate="animate"
              variants={keyVariants}
              className={`size-16 sm:size-20 flex items-center justify-center rounded-lg border-2 border-foreground/30 ${
                i === 1 ? "bg-yellow/20 text-yellow" : "bg-foreground/10"
              }`}
            >
              <span className="text-4xl sm:text-5xl font-bold">{key}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Error message */}
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-4xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg opacity-70 mb-8">
          Oops! It seems you've typed your way to a page that doesn't exist.
        </motion.p>

        {/* Animated keyboard illustration */}
        <motion.div
          variants={itemVariants}
          className="relative w-full h-32 mb-8"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Keyboard className="size-20 text-foreground" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="absolute size-32 rounded-full bg-blue/10"
            />
          </div>

          {/* Random floating letters */}
          {["W", "P", "M", "?", "!", "404"].map((letter, i) => (
            <motion.div
              key={i}
              initial={{
                x: Math.random() * 300 - 150,
                y: Math.random() * 100 - 50,
                opacity: 0,
                rotate: Math.random() * 20 - 10,
              }}
              animate={{
                y: [0, -40],
                opacity: [0, 0.7, 0],
                rotate: Math.random() * 20 - 10,
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                repeatDelay: Math.random() * 2,
              }}
              className="absolute text-sm font-mono text-white inset-0"
            >
              {letter}
            </motion.div>
          ))}
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => navigate("/")}
            className="bg-yellow hover:bg-yellow/80 text-background flex items-center gap-2 cursor-pointer"
          >
            <Home className="size-4" />
            Return Home
          </Button>
        </motion.div>
      </motion.div>
    </article>
  );
};

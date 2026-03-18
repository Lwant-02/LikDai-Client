import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SHAN_CHAR = [
  { char: "ၵ" },
  { char: "ၶ" },
  { char: "င" },
  { char: "ၸ" },
  { char: "သ" },
  { char: "ၺ" },
  { char: "တ" },
  { char: "ထ" },
  { char: "ၼ" },
  { char: "ပ" },
  { char: "ၽ" },
  { char: "ၾ" },
  { char: "မ" },
  { char: "ယ" },
  { char: "ရ" },
  { char: "လ" },
  { char: "ဝ" },
  { char: "ႁ" },
  { char: "ဢ" },
];

interface CharInstance {
  id: number;
  char: string;
  color: string;
  top: string;
  left: string;
  fontSize: string;
  delay: number;
  duration: number;
}

export const ShanCharFloat = () => {
  const [chars, setChars] = useState<CharInstance[]>([]);

  useEffect(() => {
    const instances = SHAN_CHAR.map((item, index) => {
      const charStr = typeof item === "string" ? item : item.char;

      return {
        id: index,
        char: charStr,
        color: "text-yellow",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * (4 - 1.5) + 1.5}rem`,
        delay: Math.random() * 5,
        duration: Math.random() * (10 - 5) + 5,
      };
    });
    setChars(instances);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {chars.map((item) => (
        <motion.div
          key={item.id}
          className={`absolute ${item.color}`}
          initial={{ opacity: 0, scale: 0.5, y: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: "easeInOut",
          }}
          style={{
            top: item.top,
            left: item.left,
            fontSize: item.fontSize,
          }}
        >
          {item.char}
        </motion.div>
      ))}
    </div>
  );
};

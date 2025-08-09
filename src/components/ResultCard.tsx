import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  color?: "blue" | "yellow" | "green" | "red" | "orange" | "purple";
  className?: string;
}

export const ResultCard = ({
  title = "WPM",
  value = 100,
  subtitle = "Accuracy",
  color = "blue",
  className,
}: ResultCardProps) => {
  const colorVariants = {
    blue: "border-blue/70 from-blue/20 to-transparent",
    yellow: "border-yellow/70 from-yellow/20 to-transparent",
    green: "border-green/70 from-green/20 to-transparent",
    red: "border-red/70 from-red/20 to-transparent",
    orange: "border-orange/70 from-orange/20 to-transparent",
    purple: "border-purple/70 from-purple/20 to-transparent",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "w-full border rounded-lg md:h-44 h-28 flex py-3 px-4 items-center flex-col relative overflow-hidden",
        "bg-gradient-to-b shadow-sm",
        colorVariants[color],
        className
      )}
    >
      <div className="absolute -right-10 -top-10 w-24 h-24 rounded-full bg-foreground/5 blur-xl" />

      <h3 className="text-sm font-bold text-primary/80 mb-1">{title}</h3>

      <div className="flex justify-center items-center flex-col gap-2 w-full h-full">
        <p className="text-3xl font-bold capitalize">{value}</p>
        {subtitle && <p className="text-sm text-primary/70">{subtitle}</p>}
      </div>
    </motion.div>
  );
};

import { motion } from "framer-motion";
import { itemVariants } from "@/pages/AboutPage";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}
export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <motion.div
      variants={itemVariants}
      key={title}
      className="bg-foreground/40 backdrop-blur-sm rounded-xl p-6 hover:bg-foreground/20 transition-colors"
    >
      <div className="bg-yellow/10 size-14 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="opacity-80">{description}</p>
    </motion.div>
  );
};

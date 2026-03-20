import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { ShanCharFloat } from "@/components/ShanCharFloat";
import { LESSONS_CONTENT } from "@/content/lessons.content";
import { cn } from "@/lib/utils";

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

interface LessonCardProps {
  category: {
    id: string;
    title: string;
    description: string;
    category: string;
    englishDescription: string;
    image: string;
    link: string;
    type: string;
  };
}

const LessonCard = ({ category }: LessonCardProps) => {
  const liveType = category.type === "ၸႂ်ႉလႆႈယဝ်ႉ";
  return (
    <motion.div
      key={category.id}
      variants={itemVariants}
      className="group relative h-96 cursor-pointer overflow-hidden bg-background/80 backdrop-blur-xl border border-primary/20 hover:border-yellow/80 transition-colors duration-300 shadow-2xl rounded-3xl"
    >
      <div className="absolute top-4 right-4 z-20">
        <span className="inline-block px-3 py-1 rounded-full bg-yellow text-background text-sm font-bold uppercase tracking-wider mb-2 border border-yellow/30">
          {category.type}
        </span>
      </div>
      <div className="absolute inset-0 z-0">
        <img
          src={category.image}
          alt={category.category}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue text-background text-sm font-bold uppercase tracking-wider mb-3 border border-blue/30">
            {category.category}
          </span>
          <h2 className="text-3xl font-bold mb-2">{category.title}</h2>
          <p className="text-sm opacity-90 line-clamp-1 mb-4 group-hover:line-clamp-none transition-all duration-300">
            {category.description}
          </p>
        </div>

        <Link
          to={category.link}
          className={cn(
            "flex items-center gap-1 text-yellow font-bold hover:text-yellow/80",
            !liveType && "cursor-not-allowed opacity-50",
          )}
        >
          <span>
            {category.id === "normal"
              ? LESSONS_CONTENT.normalType
              : LESSONS_CONTENT.otherType}
          </span>
          <ArrowRight className="size-5" />
        </Link>
      </div>
    </motion.div>
  );
};

export const LessonsPage = () => {
  return (
    <>
      <Helmet>
        <title>{LESSONS_CONTENT.metaTitle}</title>
        <meta name="description" content={LESSONS_CONTENT.metaDescription} />
      </Helmet>

      <div className="min-h-screen py-8 relative overflow-hidden">
        <ShanCharFloat />

        <motion.div
          className="layout relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="flex justify-center items-start flex-col mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary">
              {LESSONS_CONTENT.title}
            </h1>
            <p className="text-xl opacity-80">{LESSONS_CONTENT.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LESSONS_CONTENT.categories.map((category) => (
              <LessonCard key={category.id} category={category} />
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
};

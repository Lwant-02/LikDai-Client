import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { LESSONS_CONTENT } from "@/content/lessons.content";
import { WORD_FALLING_CONTENT } from "@/content/word-falling.content";

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

export const WordFallingPage = () => {
  return (
    <>
      <Helmet>
        <title>{WORD_FALLING_CONTENT.metaTitle}</title>
        <meta
          name="description"
          content={WORD_FALLING_CONTENT.metaDescription}
        />
      </Helmet>

      <div className="min-h-screen pt-8 relative overflow-hidden pb-32">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-primary font-tachileik">
              {LESSONS_CONTENT.categories[1].title}
            </h1>
            <p className="text-xl opacity-80">
              {LESSONS_CONTENT.categories[1].description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

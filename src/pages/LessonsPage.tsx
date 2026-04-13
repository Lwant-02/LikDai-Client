import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LESSONS_CONTENT } from "@/content/lessons.content";
import { cn } from "@/lib/utils";
import { LoginPromptDialog } from "@/components/LoginPromptDialog";
import { useAuthStore } from "@/store/authStore";
import { MobileMessage } from "@/features/typing/components/MobileMessage";

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
    image: string;
    link: string;
    type: string;
  };
  onClick: (link: string) => void;
}

const LessonCard = ({ category, onClick }: LessonCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const liveType = category.type === "ၸႂ်ႉလႆႈယဝ်ႉ";
  return (
    <div
      key={category.id}
      className="group relative h-96 cursor-pointer overflow-hidden bg-background/80 backdrop-blur-xl border border-primary/20 hover:border-yellow/80 transition-all duration-300 shadow-2xl rounded-3xl"
    >
      <div className="absolute top-4 right-4 z-20">
        <span className="inline-block px-3 py-1 rounded-full bg-yellow text-white text-sm font-bold uppercase tracking-wider mb-2 border border-yellow/30">
          {category.type}
        </span>
      </div>
      <div className="absolute inset-0 z-0 bg-foreground/20">
        <img
          src={category.image}
          alt={category.category}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-all duration-700 ease-out",
            isImageLoaded
              ? "opacity-100 blur-0 scale-100"
              : "opacity-0 blur-md scale-100",
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
        <div className="mb-4">
          <span
            className={cn(
              "inline-block px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-3 border",
              category.id === "normal"
                ? "bg-blue text-white border-blue/30"
                : "bg-green text-white border-green/30",
            )}
          >
            {category.category}
          </span>
          <h2 className="text-3xl font-bold mb-2 font-tachileik">
            {category.title}
          </h2>
          <p className="opacity-90 line-clamp-1 mb-4 group-hover:line-clamp-none transition-all duration-300">
            {category.description}
          </p>
        </div>

        <button
          disabled={!liveType}
          onClick={() => onClick(category.link)}
          className={cn(
            "flex items-center gap-1 text-yellow font-bold hover:text-yellow/80 cursor-pointer",
            !liveType && "cursor-not-allowed opacity-50",
          )}
        >
          <span>
            {category.id === "normal"
              ? LESSONS_CONTENT.normalType
              : LESSONS_CONTENT.otherType}
          </span>
          <ArrowRight className="size-5" />
        </button>
      </div>
    </div>
  );
};

export const LessonsPage = () => {
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();
  const [isLoginPromptOpen, setIsLoginPromptOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState<string>("");

  const handleLessonClickWithNoAuth = (link: string) => {
    setSelectedLink(link);
    setIsLoginPromptOpen(true);
  };

  const handleLessonClickWithAuth = (link: string) => {
    navigate(link);
  };

  return (
    <>
      <Helmet>
        <title>{LESSONS_CONTENT.metaTitle}</title>
        <meta name="description" content={LESSONS_CONTENT.metaDescription} />
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
              {LESSONS_CONTENT.title}
            </h1>
            <p className="text-xl opacity-80">{LESSONS_CONTENT.subtitle}</p>
          </motion.div>

          <MobileMessage />
          <div className="hidden xl:grid grid-cols-1 md:grid-cols-3 gap-8">
            {LESSONS_CONTENT.categories.map((category) => (
              <motion.div key={category.id} variants={itemVariants}>
                <LessonCard
                  category={category}
                  onClick={
                    accessToken
                      ? handleLessonClickWithAuth
                      : handleLessonClickWithNoAuth
                  }
                />
              </motion.div>
            ))}
          </div>

          <LoginPromptDialog
            isOpen={isLoginPromptOpen}
            setIsOpen={setIsLoginPromptOpen}
            pageLink={selectedLink}
          />
        </motion.div>
      </div>
    </>
  );
};

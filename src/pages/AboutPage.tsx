import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronsUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { AllInformation } from "@/components/AllInformation";
import { useSettingStore } from "@/store/settingStore";
import { ABOUT_CONTENT } from "@/content/about.content";
import { HOME_CONTENT } from "@/content/home.content";

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const AboutPage = () => {
  const { isFromHome, setInstallPromptEvent, installPromptEvent } =
    useSettingStore();
  const [isUserScrolled, setIsUserScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsUserScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    if (isFromHome) {
      const downloadSection = document.getElementById("download");
      if (downloadSection) {
        downloadSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [isFromHome]);

  const handleInstallClick = async () => {
    const prompt = installPromptEvent;
    if (!prompt) return;
    prompt.prompt();
    try {
      const choice = await prompt.userChoice;
      console.log("PWA install:", choice.outcome);
    } finally {
      setInstallPromptEvent(null);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>{ABOUT_CONTENT.metaTitle}</title>
        <meta name="description" content={ABOUT_CONTENT.metaDescription} />
      </Helmet>

      <main className="min-h-screen py-8 relative overflow-hidden">
        <motion.div
          className="layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AllInformation handleInstallClick={handleInstallClick} />

          <motion.section
            variants={itemVariants}
            className="pt-10 pb-6 text-center mt-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {ABOUT_CONTENT.cta.title}
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              {ABOUT_CONTENT.cta.descOne}
              <span className="font-bold text-yellow">
                {ABOUT_CONTENT.cta.likdai}
              </span>
              {ABOUT_CONTENT.cta.descTwo}
            </p>
            <button
              className="bg-yellow hover:bg-yellow/80 text-background btn cursor-pointer"
              onClick={() => navigate("/lessons")}
            >
              {HOME_CONTENT.buttonLabel}
            </button>
          </motion.section>
        </motion.div>

        {isUserScrolled && (
          <button
            onClick={scrollToTop}
            className="fixed animate-bounce bottom-10 md:right-10 right-4 z-50 p-3 rounded-full bg-yellow text-primary hover:bg-yellow/80 transition-colors cursor-pointer shadow-lg"
          >
            <ChevronsUp className="size-6" />
          </button>
        )}
      </main>
    </>
  );
};

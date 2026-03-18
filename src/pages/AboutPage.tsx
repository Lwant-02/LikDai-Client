import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronsUp } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { AllInformation } from "@/components/AllInformation";
import { settingStore } from "@/store/settingStore";

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
  const { t } = useTranslation();
  const { isFromHome, setInstallPromptEvent, installPromptEvent } =
    settingStore();
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
        <title>About LikDai | လွင်ႈလိၵ်ႈတႆး</title>
        <meta
          name="description"
          content="Learn more about LikDai, the dedicated platform for learning and practicing the Shan / Dai / Tai keyboard and language (ၽိုၵ်းပေႃႉလိၵ်ႈတႆး)."
        />
      </Helmet>

      <main className="min-h-screen py-20 relative overflow-hidden">
        <motion.div
          className="layout"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* English Section */}
          <AllInformation handleInstallClick={handleInstallClick} />

          {/* CTA Section */}
          <motion.section
            variants={itemVariants}
            className="pt-10 pb-6 text-center mt-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ၽွမ်ႉတႃႇတေ ယုၵ်ႉမုၼ်းၼမ်ႉၵတ်ႉ ပေႃႉလိၵ်ႈယဝ်ႉႁႃႉ?
            </h2>
            <p className="text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              ၶဝ်ႈႁူမ်ႈၸွမ်း ၽူႈၸႂ်ႉတိုဝ်း ဢၼ်မေႃပေႃႉလိၵ်ႈတႆး ၼပ်ႉႁူဝ်ႁဵင်တီႈ{" "}
              <span className="font-bold text-yellow">လိၵ်ႈတႆး </span> ၶႃႈ။
              မၼ်းဢမ်ႇလႆႈသဵင်ႈငိုၼ်းသင်သေ ႁဵတ်းဝႆႉ တႃႇၸွၺ်ႈထႅမ် ႁႂ်ႈၸဝ်ႈၵဝ်ႇ
              ပေႃႉလိၵ်ႈလႆႈဝႆးဝႆး လႄႈ တႅတ်ႈတေႃးလိူဝ်ၵဝ်ႇ။
            </p>
            <button
              className="bg-yellow hover:bg-yellow/80 text-background btn cursor-pointer"
              onClick={() => navigate("/lessons")}
            >
              {t("home_page.button")}
            </button>
          </motion.section>
        </motion.div>

        {/* Back to top button */}
        {isUserScrolled && (
          <button
            onClick={scrollToTop}
            className="fixed animate-bounce bottom-10 md:right-10 right-2 z-50 p-3 rounded-full bg-yellow text-primary hover:bg-yellow/80 transition-colors cursor-pointer shadow-lg"
          >
            <ChevronsUp className="size-6" />
          </button>
        )}
      </main>
    </>
  );
};

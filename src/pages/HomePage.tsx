import { ArrowRight, MoveRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeams";
import Logomarquee from "@/components/MarqueeScroller";
import { settingStore } from "@/store/settingStore";

export const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const item: Variants = {
  hidden: { opacity: 0, y: 90 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" as const },
  },
};

export function HomePage() {
  const { setIsFromHome } = settingStore();
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="DWNWIz0ofitUjEfvUzzeCg_bVdWMoly52XEYSxFDsAg"
        />
      </Helmet>
      <BackgroundBeamsWithCollision className="h-screen w-full overflow-hidden flex flex-col items-center justify-center gap-5 relative">
        {/* Main content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="z-10 flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="flex gap-2 justify-center items-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold ">
              {t("home_page.title")}
            </h1>
          </motion.div>

          <motion.div variants={item} className="mt-2 mb-4">
            <TypeAnimation
              sequence={[
                t("home_page.type_animation.0"),
                1000,
                t("home_page.type_animation.1"),
                1000,
                t("home_page.type_animation.2"),
                1000,
                t("home_page.type_animation.3"),
                1000,
                t("home_page.type_animation.4"),
                1000,
              ]}
              speed={50}
              style={{ fontSize: "20px", fontWeight: "bold", color: "#ff7601" }}
              repeat={Infinity}
              className="md:text-4xl text-[20px]"
            />
          </motion.div>

          {/* Marquee */}
          <Logomarquee />

          {/* CTA Button */}
          <motion.div variants={item} className="relative">
            <Link
              to="/lessons"
              className="flex gap-3 justify-center items-center  border border-yellow/50 rounded-lg py-2 hover:border-yellow transition-colors duration-200 cursor-pointer px-6"
            >
              <p className="text-sm md:text-base ">{t("home_page.button")}</p>
              <MoveRight className="size-4" />
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            variants={item}
            className="mt-8 text-xs md:text-sm flex gap-8 items-center"
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-yellow">1000+</span>
              <span>{t("home_page.lesson")}</span>
            </div>
            <div className="h-8 w-px bg-primary/20" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-green">2</span>
              <span>{t("home_page.language")}</span>
            </div>
            <div className="h-8 w-px bg-primary/20" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-blue">
                {t("home_page.free.title")}
              </span>
              <span>{t("home_page.free.description")}</span>
            </div>
          </motion.div>
          <motion.div
            variants={item}
            className="flex justify-center items-center mt-7"
          >
            <Link
              onClick={() => setIsFromHome(true)}
              to="/about"
              className="text-sm text-yellow hover:text-yellow/80 transition-colors duration-300 flex justify-center items-center bounce-x "
            >
              {t("home_page.download")} <ArrowRight className="size-4 ml-2 " />
            </Link>
          </motion.div>
        </motion.div>
      </BackgroundBeamsWithCollision>
    </>
  );
}

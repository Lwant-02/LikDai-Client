import { MoveRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeams";
import Logomarquee from "@/components/MarqueeScroller";

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
  return (
    <>
      <Helmet>
        <title>LikDai | Master Shan Typing</title>
        <meta
          name="description"
          content="Start mastering Shan typing with LikDai."
        />
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
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">LikDai</h1>
          </motion.div>

          <motion.div variants={item} className="mt-2 mb-4">
            <TypeAnimation
              sequence={[
                "Master Shan Typing with LikDai",
                1000,
                "Practice Fast. Type Smart.",
                1000,
                "Challenge Yourself. Improve Every Day.",
                1000,
                "Track Your Speed and Accuracy",
                1000,
                "Become a Shan Typing Pro!",
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
              <p className="text-sm md:text-base ">Start Typing Now</p>
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
              <span>Lessons</span>
            </div>
            <div className="h-8 w-px bg-primary/20" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-green">2</span>
              <span>Languages</span>
            </div>
            <div className="h-8 w-px bg-primary/20" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-blue">Free</span>
              <span>Forever</span>
            </div>
          </motion.div>
        </motion.div>
      </BackgroundBeamsWithCollision>
    </>
  );
}

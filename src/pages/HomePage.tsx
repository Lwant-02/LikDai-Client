import { MoveRight } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { BackgroundBeamsWithCollision } from "@/components/BackgroundBeams";
import Logomarquee from "@/components/MarqueeScroller";

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
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="z-10 flex flex-col items-center"
        >
          <div className="flex gap-2 justify-center items-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">LikDai</h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-2 mb-4"
          >
            <TypeAnimation
              sequence={[
                "Master Shan Typing with LikDai-Pro",
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <Link
              to="/lessons"
              className="flex gap-3 justify-center items-center  border border-yellow/70 rounded-full py-2 hover:bg-yellow/10 transition-colors duration-200 cursor-pointer px-6"
            >
              <p className="text-sm md:text-base ">Start Typing Now</p>
              <MoveRight className="size-4" />
            </Link>
          </motion.div>

          {/* Quick stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 text-xs md:text-sm flex gap-8 items-center"
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-yellow">1000+</span>
              <span>Words</span>
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

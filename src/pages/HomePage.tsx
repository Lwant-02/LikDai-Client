import { ArrowRight, Dot, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { settingStore } from "@/store/settingStore";
import { ShanCharFloat } from "@/components/ShanCharFloat";

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

  return (
    <>
      <Helmet>
        <meta
          name="google-site-verification"
          content="DWNWIz0ofitUjEfvUzzeCg_bVdWMoly52XEYSxFDsAg"
        />
        <title>LikDai - Shan Typing Tutor | ၽိုၵ်းပေႃႉလိၵ်ႈတႆး</title>
        <meta
          name="description"
          content="The ultimate Shan / Dai / Tai typing app to learn and practice typing in the Shan language (ၽိုၵ်းပေႃႉလိၵ်ႈတႆး). Improve your skills with LikDai."
        />
      </Helmet>
      <div className="h-screen w-full overflow-hidden flex bg-background flex-col items-center justify-center xl:px-0 px-2">
        <ShanCharFloat />
        <motion.div
          variants={item}
          className="absolute top-5 left-1/2 -translate-x-1/2 z-5"
        >
          <div className="flex justify-center items-center px-4 py-1 rounded-full sm:w-fit w-[345px] text-sm font-medium border border-foreground/20">
            <Dot className="size-6 text-green animate-pulse" />
            ၶိုၼ်းမႄး ႁၢင်ႊၽၢင်ဝႅပ်ႉသၢႆႉ (UI) ဢၼ်မႂ်ႇဝႆႉ တႃႇႁႂ်ႈ
            လွင်ႈၸႂ်ႉတိုဝ်းသူၸဝ်ႈ ၶႅမ်ႉလိူဝ်ၵဝ်ႇ
          </div>
        </motion.div>
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 60% at 50% 0%, #dcb743, transparent 70%)",
          }}
        />

        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="z-50 flex flex-col items-center"
        >
          <motion.div
            variants={item}
            className="flex gap-3 justify-center items-center"
          >
            <img
              src="/icons/favicon.svg"
              alt="Logo"
              className="xl:size-[100px] size-16 object-cover flex"
            />
            <h1 className="text-5xl sm:text-8xl pt-5">လိၵ်ႈတႆး</h1>
          </motion.div>

          <motion.div variants={item}>
            <p className="sm:text-3xl text-lg text-center my-7 leading-relaxed">
              <span className="text-yellow">လိၵ်ႈတႆး</span> ၼႆႉ ပဵၼ်ဢွင်ႈတီႈ
              တွၼ်ႈတႃႇၽိုၵ်းပေႃႉလိၵ်ႈတႆး ႁႂ်ႈမိုတ်ႈမိုဝ်းလႄႈ ဝႆးမႃး။ <br />{" "}
              ၸွၺ်ႈပၼ်လႆႈ ၵူၼ်းႁဵၼ်းမႂ်ႇလႄႈ ၵူၼ်းၶႂ်ႈၽိုၵ်းပေႃႉလိၵ်ႈ ႁႂ်ႈပေႃး
              ပေႃႉလႆႈဝႆး
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 text-xs md:text-sm flex gap-8 items-center"
          >
            <div className="flex flex-col items-center">
              <span className="font-bold text-yellow text-base">1000+</span>
              <span className="text-base">ၵၢၼ်ၽိုၵ်း</span>
            </div>
            <div className="h-8 w-px bg-primary/20" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-green text-base">2</span>
              <span className="text-base">ၽႃႇသႃႇ</span>
            </div>
            <div className="h-8 w-px bg-primary/20" />
            <div className="flex flex-col items-center">
              <span className="font-bold text-blue text-base">ၾရီႊ</span>
              <span className="text-base">တႃႇၵူႊၵေႃႉ</span>
            </div>
          </motion.div>
          <motion.div variants={item} className="relative mt-10 mb-5">
            <Link
              to="/lessons"
              className="group relative bg-primary text-background btn transition-all hover:scale-105 hover:shadow-xl hover:shadow-secondary/20"
            >
              <span className="relative z-10 text-base">တႄႇပေႃႉတေႃႈလဵဝ်</span>
              <Rocket className="size-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              <div className="absolute inset-0 bg-yellow translate-y-full group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
            </Link>
          </motion.div>
          <motion.div
            variants={item}
            className="flex justify-center items-center mt-7"
          >
            <Link
              onClick={() => setIsFromHome(true)}
              to="/about"
              className="text-base text-yellow hover:text-yellow/80 transition-colors duration-300 flex justify-center items-center bounce-x "
            >
              ၸၼ်ဢဝ်ဢႅပ်ႉ <ArrowRight className="size-4 ml-2 " />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

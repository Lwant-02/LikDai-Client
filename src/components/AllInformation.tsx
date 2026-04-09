import { motion } from "framer-motion";
import {
  Keyboard,
  Award,
  UserCog,
  Globe,
  CloudDownload,
  Code,
  Trophy,
  MonitorDown,
  WifiOff,
} from "lucide-react";

import {
  anotherSupporterContacts,
  developerContacts,
  supporterContacts,
} from "@/constant";
import { itemVariants } from "@/pages/AboutPage";
import { FeatureCard } from "./FeatureCard";
import { ABOUT_CONTENT } from "@/content/about.content";

export const AllInformation = ({
  handleInstallClick,
}: {
  handleInstallClick: () => void;
}) => {
  const keyfeatures = [
    {
      ...ABOUT_CONTENT.section2.features[0],
      icon: <Globe className="size-7 text-yellow" />,
    },
    {
      ...ABOUT_CONTENT.section2.features[1],
      icon: <Award className="size-7 text-blue" />,
    },
    {
      ...ABOUT_CONTENT.section2.features[2],
      icon: <Code className="size-7 text-green" />,
    },
    {
      ...ABOUT_CONTENT.section2.features[3],
      icon: <Trophy className="size-7 text-purple" />,
    },
    {
      ...ABOUT_CONTENT.section2.features[4],
      icon: <Keyboard className="size-7 text-orange" />,
    },
    {
      ...ABOUT_CONTENT.section2.features[5],
      icon: <CloudDownload className="size-7 text-red" />,
    },
  ];

  return (
    <>
      <motion.div variants={itemVariants} className="text-start mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight font-tachileik">
          {ABOUT_CONTENT.header.title}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed ">
          {ABOUT_CONTENT.header.subtitle}
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Open Source Section */}
        <motion.section
          variants={itemVariants}
          className="border-b border-foreground/80 py-7"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 bg-blue-500/30 rounded-xl">
              <Code className="w-6 h-6 text-blue-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {ABOUT_CONTENT.section1.title}
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg mb-8">
            <p>
              <span className="font-bold text-yellow">
                {ABOUT_CONTENT.cta.likdai}
              </span>
              {ABOUT_CONTENT.section1.p1.part1}
              <span className="text-yellow">
                {ABOUT_CONTENT.section1.p1.part2}
              </span>
              {ABOUT_CONTENT.section1.p1.part3}
              <a
                href="https://www.haohaa.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow hover:underline"
              >
                Hao Haa
              </a>{" "}
              {ABOUT_CONTENT.section1.p1.part4}
            </p>
          </div>

          <div className="bg-background/50 border border-blue-500/20 p-6 rounded-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 text-blue-500">
              {ABOUT_CONTENT.section1.goalsTitle}
            </h3>
            <ul className="list-none space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl mt-1">•</span>
                <span className="opacity-90 leading-relaxed">
                  <span className="font-bold text-yellow">
                    {ABOUT_CONTENT.cta.likdai}
                  </span>
                  {ABOUT_CONTENT.section1.goal1.part1}
                  <span className="font-bold text-yellow">
                    {ABOUT_CONTENT.cta.likdai}
                  </span>
                  {ABOUT_CONTENT.section1.goal1.part2}
                  <span className="font-bold text-yellow">
                    {ABOUT_CONTENT.cta.likdai}
                  </span>
                  {ABOUT_CONTENT.section1.goal1.part3}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 font-bold text-xl mt-1">•</span>
                <span className="opacity-90 leading-relaxed">
                  {ABOUT_CONTENT.section1.goal2}
                </span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Features Section */}
        <motion.section
          variants={itemVariants}
          className="border-b border-foreground/80 py-7"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 bg-green-500/30 rounded-xl flex-shrink-0">
              <Award className="w-6 h-6 text-green-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {ABOUT_CONTENT.section2.title}
            </h2>
          </div>
          <p className="space-y-4 text-muted-foreground leading-loose text-base md:text-lg mb-8">
            {ABOUT_CONTENT.section2.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyfeatures.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </motion.section>

        {/* Download Section */}
        <motion.section
          variants={itemVariants}
          id="download"
          className="border-b border-foreground/80 py-16"
        >
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-purple/30 rounded-xl flex-shrink-0">
              <CloudDownload className="w-6 h-6 text-purple" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {ABOUT_CONTENT.section3.title}
            </h2>
          </div>

          <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-yellow/10 via-background to-purple/5 border border-foreground p-8 lg:p-12">
            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Content Area */}
              <div className="flex-1 space-y-8 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow/10 border border-yellow/20 text-yellow font-semibold text-sm mb-2">
                  <CloudDownload className="size-4" />
                  <span>{ABOUT_CONTENT.section3.pwaTag}</span>
                </div>

                <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0 mt-4">
                  {ABOUT_CONTENT.section3.desc}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-background p-3 rounded-xl border border-foreground/5 shadow-sm">
                    <div className="p-2 bg-blue/10 text-blue rounded-lg">
                      <Trophy className="size-4" />
                    </div>
                    <span className="text-sm font-medium">
                      {ABOUT_CONTENT.section3.badge1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-background p-3 rounded-xl border border-foreground/5 shadow-sm">
                    <div className="p-2 bg-orange/10 text-orange rounded-lg">
                      <Code className="size-4" />
                    </div>
                    <span className="text-sm font-medium">
                      {ABOUT_CONTENT.section3.badge2}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-background p-3 rounded-xl border border-foreground/5 shadow-sm">
                    <div className="p-2 bg-green/10 text-green rounded-lg">
                      <WifiOff className="size-4" />
                    </div>
                    <span className="text-sm font-medium">
                      {ABOUT_CONTENT.section3.badge3}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center lg:justify-start">
                  <button
                    type="button"
                    onClick={handleInstallClick}
                    className="group relative inline-flex items-center gap-3 text-background bg-primary btn shadow-lg hover:shadow-primary/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden"
                  >
                    <span className="absolute inset-0 bg-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                    <CloudDownload className="size-6 relative z-10 group-hover:animate-bounce" />
                    <span className="relative z-10 ">
                      {ABOUT_CONTENT.section3.button}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Visual Area */}
              <div className="flex-1 w-full max-w-sm lg:max-w-none relative flex justify-center items-center">
                <div className="relative size-64 sm:size-80">
                  <div className="absolute inset-0 border-2 border-dashed border-yellow/20 rounded-full animate-[spin_20s_linear_infinite]" />
                  <div className="absolute inset-4 border border-purple/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "easeInOut",
                    }}
                    className="absolute -top-4 -right-4 bg-background p-3 rounded-2xl shadow-xl border border-foreground/5"
                  >
                    <Keyboard className="size-6 text-yellow" />
                  </motion.div>

                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{
                      repeat: Infinity,
                      duration: 5,
                      ease: "easeInOut",
                    }}
                    className="absolute bottom-8 -left-6 bg-background p-4 rounded-2xl shadow-xl border border-foreground/5"
                  >
                    <Award className="size-8 text-purple" />
                  </motion.div>

                  {/* Center glowing orb with image */}
                  <div
                    className="absolute inset-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full shadow-[0_0_60px_-15px_rgba(234,179,8,0.3)] flex items-center justify-center p-8 border border-foreground/5 z-10 group cursor-pointer"
                    onClick={handleInstallClick}
                  >
                    <div className="absolute inset-0 bg-yellow/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />
                    <MonitorDown className="size-48 z-10 text-yellow transform group-hover:scale-110 transition-transform duration-500 drop-shadow-md" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Developers & Support */}
        <motion.section
          variants={itemVariants}
          className="border-b border-foreground/80 py-7"
        >
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 bg-orange/30 rounded-xl flex-shrink-0">
              <UserCog className="w-6 h-6 text-orange" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {ABOUT_CONTENT.section4.title}
            </h2>
          </div>

          <div className="space-y-8 text-muted-foreground leading-loose text-base md:text-lg">
            <div>
              <p>
                <span className="font-bold text-yellow">
                  {ABOUT_CONTENT.section4.dev.name}
                </span>
                {ABOUT_CONTENT.section4.dev.desc}
              </p>
              <div className="flex flex-wrap gap-4 mt-4">
                {developerContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border text-yellow border-foreground px-4 py-2 rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors"
                  >
                    <img
                      src={contact.imagePath}
                      alt={contact.link}
                      className="h-6 w-auto dark:invert"
                    />
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-green-500/5 border-l-4 border-green-500 p-4 rounded-r-xl space-y-6">
              <div>
                <p className="mb-4">
                  {ABOUT_CONTENT.section4.sup1.thanks}
                  <span className="font-bold text-yellow">
                    {ABOUT_CONTENT.section4.sup1.name}
                  </span>
                  {ABOUT_CONTENT.section4.sup1.desc}
                </p>
                <div className="flex flex-wrap gap-4">
                  {supporterContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border text-yellow border-foreground/80 px-4 py-2 rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors"
                    >
                      <img
                        src={contact.imagePath}
                        alt={contact.link}
                        className="h-6 w-auto dark:invert"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-4">
                  {ABOUT_CONTENT.section4.sup2.thanks}
                  <span className="font-bold text-yellow">
                    {ABOUT_CONTENT.section4.sup2.name}
                  </span>
                  {ABOUT_CONTENT.section4.sup2.desc}
                </p>
                <div className="flex flex-wrap gap-4">
                  {anotherSupporterContacts.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center border text-yellow border-foreground/80 px-4 py-2 rounded-xl cursor-pointer hover:bg-foreground/5 transition-colors"
                    >
                      <img
                        src={contact.imagePath}
                        alt={contact.link}
                        className="h-6 w-auto dark:invert"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
};

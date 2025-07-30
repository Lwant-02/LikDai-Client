import { motion } from "framer-motion";
import {
  Keyboard,
  Award,
  BarChart,
  Quote,
  Bug,
  UserCog,
  Handshake,
  Rocket,
  Globe,
} from "lucide-react";

import {
  anotherSupporterContacts,
  developerContacts,
  githubBackendRepoUrl,
  githubFrontendRepoUrl,
  releseDate,
  supporterContacts,
} from "@/constant";
import { containerVariants, itemVariants } from "@/pages/AboutPage";

const timelineItems = [
  {
    title: "လိူၵ်ႈ test ဢၼ်သူၼ်ၸႂ်",
    description:
      "လိူၵ်ႈၼႂ်းၵႄႈ လွင်ႈထတ်းသၢင်ၶၢဝ်းယၢမ်း၊ လွင်ႈၼပ်ႉၶေႃႈၵႂၢမ်း၊ ၵႂၢမ်းၵပ်းထုၵ်ႇ ဢမ်ႇၼၼ် တႅမ်ႈသႂ်ႇႁင်းၶေႃ။",
    icon: <span className="text-xl font-bold">1</span>,
    color: "bg-blue/20 text-blue",
  },
  {
    title: "လိူၵ်ႈၽႃႇသႃႇ",
    description: "လိူၵ်ႈၼႂ်းၵႄႈ လိၵ်ႈတႆး လႄႈ လိၵ်ႈဢိင်းၵလဵတ်ႈ",
    icon: <span className="text-xl font-bold">2</span>,
    color: "bg-yellow/20 text-yellow",
  },
  {
    title: "လိူၵ်ႈလွၵ်းမိုဝ်း",
    description:
      "လိူၵ်ႈၼႂ်းၵႄႈ လွၵ်းမိုဝ်း ၼမ်ႉၶူင်း၊ ပၢင်လူင် ၊ ယုင်းၶဵဝ် ဢမ်ႇၼၼ် လၵ်းၸဵင်။",
    icon: <span className="text-xl font-bold">3</span>,
    color: "bg-purple/20 text-purple",
  },
  {
    title: "တႄႇတႅမ်ႈ",
    description: "မိူဝ်ႈတႄႇပေႃႉလိၵ်ႈၼၼ်ႉ ၶၢဝ်းယၢမ်းမၼ်း တေတႄႇမႃးႁင်းမၼ်းယဝ်ႉ။",
    icon: <span className="text-xl font-bold">4</span>,
    color: "bg-green/20 text-green",
  },
  {
    title: "ထတ်းတူၺ်း result ၸဝ်ႈၵဝ်ႇ",
    description:
      "ဝၢႆးသေတႅမ်ႈယဝ်ႉ ထတ်းတူၺ်း WPM, Accuracy, Consistency လႄႈ Metrics တၢင်ႇၸိူဝ်း။",
    icon: <span className="text-xl font-bold">5</span>,
    color: "bg-orange/20 text-orange",
  },
  {
    title: "ၸွမ်းတူၺ်းလွင်ႈၶိုၼ်ႈယႂ်ႇၸဝ်ႈၵဝ်ႇ",
    description:
      "ႁဵတ်းဢၵွင်ႉ တႃႇသိမ်းဝႆႉ result ၸဝ်ႈၵဝ်ႇသေ တႅၵ်ႈၼိူင်းၵၼ်တင်း ၵူၼ်းတၢင်ႇၵေႃႉ ဢၼ်မီးတီႈ  ၽႅၼ်ႇၽူႈဢွၼ်ႁူဝ်ၼၼ်ႉ။",
    icon: <span className="text-xl font-bold">6</span>,
    color: "bg-purple/20 text-purple",
  },
];

const keyfeatures = [
  {
    title: "Bilingual Support",
    description: "Practice typing in both English and Shan languages.",
    icon: <Globe className="size-7 text-yellow" />,
  },
  {
    title: "Multiple Test Modes",
    description:
      "Choose from timed tests, word count challenges, quotes, or create your own custom typing exercises.",
    icon: <Quote className="size-7 text-purple rotate-180" />,
  },
  {
    title: "Achievements",
    description:
      "Earn badges and unlock achievements as you improve your typing speed, accuracy, and consistency over time.",
    icon: <Award className="size-7 text-blue" />,
  },
  {
    title: "Leaderboards",
    description:
      "Compete with others on the leaderboard to see how you rank against other users.",
    icon: <BarChart className="size-7 text-green" />,
  },
  {
    title: "Keyboards Support",
    description:
      "Support 4 Shan Keyboards (Namkhone, Panglong, Yunghkio, Sil) and English Keyboard.",
    icon: <Keyboard className="size-7 text-orange" />,
  },
];

export const AboutEngSection = ({
  setIsSubmittingDialogOpen,
}: {
  setIsSubmittingDialogOpen: (value: boolean) => void;
}) => {
  return (
    <>
      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center justify-center overflow-hidden mt-3"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="z-20 text-center px-4"
        >
          <div className="flex gap-2 justify-center items-center">
            <img
              src="/svg/Logo.svg"
              alt="Logo"
              className="size-16 sm:size-20 object-cover inline-block mb-4"
            />
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              LikDai - Pro
            </h1>
          </div>
          <p className="text-xl sm:text-2xl opacity-80 max-w-2xl mx-auto">
            Master Shan Typing with Precision and Speed
          </p>
        </motion.div>
      </section>

      {/* Open Source Section */}
      <section className="px-4 pt-16 pb-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <svg
                className="w-8 h-8 text-yellow"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-yellow to-orange bg-clip-text text-transparent">
                Open Source
              </h2>
            </div>
            <div className="h-1 w-24 bg-gradient-to-r from-yellow to-orange mx-auto mb-6 rounded-full" />
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              LikDai-Pro is proudly open source. Join our community and help us
              build the future of Shan language typing education.
            </p>
          </motion.div>

          {/* Child Laborer Day Honor */}
          <motion.div variants={itemVariants} className="text-center mb-16 ">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Honor of Child Laborers
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              LikDai-Pro is built in honor of{" "}
              <span className="text-yellow">Child Laborers Day</span>, organized
              by Team{" "}
              <a
                href="https://www.haohaa.com/en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow hover:underline"
              >
                Hao Haa
              </a>
              , with the hope of promoting education, opportunity, and a better
              future.
            </p>
          </motion.div>

          {/* Mission Statement */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue/5 to-yellow/5 dark:from-blue/10 dark:to-yellow/10 rounded-2xl p-8 md:p-12 mb-16 border border-blue/10 dark:border-blue/20"
          >
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-blue">
                Our Mission -{" "}
                <span className="font-secondary">ယိူင်းဢၢၼ်းႁဝ်းၶႃႈ</span>
              </h3>
              <div className="prose prose-lg dark:prose-invert mx-auto">
                <p className="text-lg sm:text-xl opacity-90 leading-relaxed mb-6">
                  LikDai-Pro is a specialized typing platform designed to help
                  users master Shan language typing. Inspired by MonkeyType,
                  we've created a clean, distraction-free environment where you
                  can practice and improve your typing skills in both English
                  and Shan languages.
                </p>
                <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
                  Our mission is to preserve and promote the Shan language
                  through technology, making it accessible for both native
                  speakers and learners to develop their digital literacy
                  skills.
                </p>
              </div>
              <div className="prose prose-lg dark:prose-invert mx-auto mt-3">
                <p className="text-lg sm:text-xl opacity-90 leading-relaxed mb-6 font-secondary">
                  LikDai–Pro ၼႆႉၶူင်ႊသၢင်ႈဝႆႉ တႃႇပဵၼ်လွင်ႈၵမ်ႉထႅမ်
                  ၼႂ်းၵၢၼ်ၽိုၵ်းတႅမ်ႈလိၵ်ႈတႆး ႁႂ်ႈလူင်ႉလႅၼ်ႇ လႄႈ လႅတ်းၽႆးယဝ်ႉ။
                  ငဝ်ႈတိုၼ်း LikDai–Pro ၼႆႉဢိင်ဢဝ်တီႈ MonkeyType
                  သေၶူင်ႊသၢင်ႈပဵၼ်မႃးယဝ်ႉ၊ ပီႈၼွင်ႉႁဝ်း ၽိုၵ်းတႅမ်ႈလိၵ်ႈတႆး လႄႈ
                  လိၵ်ႈဢိင်းၵလဵတ်ႈ ၼႂ်း LikDai–Pro ၼႆႉလႆႈယဝ်ႉဢေႃႈ။
                </p>
                <p className="text-lg sm:text-xl opacity-90 leading-relaxed font-secondary">
                  ယိူင်းဢၢၼ်းႁဝ်းၶႃႈတႄႉ တႃႇထိင်းသိမ်း လႄႈ ယုၵ်ႉမုၼ်း လိၵ်ႈတႆး
                  လိူၺ်ႈလၢႆးတၢင်းပၢႆးၸၢင်ႈ၊ ၼင်ႇႁိုဝ်ပီႈၼွင်ႉတႆး လႄႈ
                  ၽူႈလဵပ်ႈႁဵၼ်းလိၵ်ႈတႆး လႆႈၽိုၵ်းၼမ်ႉၵတ်ႉပၢႆးၸၢင်ႈၵႂႃႇ။
                </p>
              </div>
            </div>
          </motion.div>
          {/* Features Grid */}
          <motion.div
            variants={itemVariants}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-green/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-green"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-green">
                Free & Open
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Completely free to use with full source code available on
                GitHub. No hidden costs or premium features.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-blue/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-blue">
                Community Driven
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Built by the community, for the community. Every contribution
                helps preserve and promote Shan language.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-purple/10 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold mb-3 text-purple">
                Modern Tech
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Built with React, TypeScript, and modern web technologies for
                the best user experience.
              </p>
            </div>
          </motion.div>
          {/* Contribution Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-8">How to Contribute</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-yellow/5 to-orange/5 dark:from-yellow/10 dark:to-orange/10 rounded-xl p-8 border border-yellow/20">
                <div className="w-16 h-16 bg-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-yellow"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4 text-yellow">
                  Developers
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Help us improve the platform by contributing code, fixing
                  bugs, or adding new features.
                </p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow rounded-full"></span>
                    <span>Frontend Development (React/TypeScript)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow rounded-full"></span>
                    <span>Backend Development (Node.js)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow rounded-full"></span>
                    <span>UI/UX Improvements</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green/5 to-blue/5 dark:from-green/10 dark:to-blue/10 rounded-xl p-8 border border-green/20">
                <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-8 h-8 text-green"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-4 text-green">
                  Content Contributors
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Help expand our Shan language content, improve translations,
                  or add new typing exercises.
                </p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green rounded-full"></span>
                    <span>Shan Language Content</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green rounded-full"></span>
                    <span>Translation & Localization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green rounded-full"></span>
                    <span>Educational Materials</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          {/* GitHub CTA */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 md:p-12 border border-gray-700">
              <div className="flex items-center justify-center gap-4 mb-6">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                <h3 className="text-3xl font-bold text-white">
                  Join Us on GitHub
                </h3>
              </div>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Star our repository, report issues, or submit pull requests.
                Every contribution helps make LikDai-Pro better for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={githubFrontendRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Frontend Code
                </a>
                <a
                  href={githubBackendRepoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  Backend Code
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="pt-5 px-4 ">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Key Features
            </h2>
            <div className="h-1 w-20 bg-yellow mx-auto mb-8 rounded-full" />
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Everything you need to master typing in both English and Shan
              languages
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 ">
            {keyfeatures.map((feautre) => (
              <motion.div
                variants={itemVariants}
                key={feautre.title}
                className="bg-foreground/40 backdrop-blur-sm rounded-xl p-6 hover:bg-foreground/20 transition-colors"
              >
                <div className="bg-yellow/10 size-14 rounded-lg flex items-center justify-center mb-4">
                  {feautre.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feautre.title}</h3>
                <p className="opacity-80">{feautre.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How to Use Section */}
      <section className="pt-5 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-secondary">
              တေႁဵတ်းႁိုဝ်ၸႂ်ႉတိုဝ်း
            </h2>
            <div className="h-1 w-20 bg-yellow mx-auto mb-8 rounded-full" />
          </motion.div>

          <div className="relative">
            {/* Timeline items */}
            <div className="relative z-10">
              {timelineItems.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row items-center md:items-start gap-4 mb-12 font-secondary ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="flex-1 md:text-right md:pr-8 order-2 md:order-none">
                    {index % 2 === 0 ? (
                      <div className="md:text-right">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="opacity-80">{item.description}</p>
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={`size-12 rounded-full ${item.color} flex items-center justify-center shrink-0 z-10 order-1 md:order-none`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 md:pl-8 order-2 md:order-none">
                    {index % 2 === 1 ? (
                      <div className="md:text-left">
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="opacity-80">{item.description}</p>
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Report Section */}
      <section className="px-4 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-6 "
          >
            Report a Bug or Give Feedbacks{" "}
            <Bug className="inline-block size-7" />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg opacity-80 mb-8 max-w-2xl mx-auto "
          >
            If you encounter any bugs or issues or have any suggestions, please
            share them to us. We are always looking to improve and make
            LikDai-Pro even better for you.{" "}
            <span
              onClick={() => setIsSubmittingDialogOpen(true)}
              className="text-yellow cursor-pointer hover:underline"
            >
              Report now
            </span>
          </motion.p>
        </motion.div>
      </section>

      {/* Developer Section */}
      <section className="px-4 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-6 "
          >
            About Developer <UserCog className="inline-block size-7" />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg opacity-80 max-w-2xl mx-auto font-secondary"
          >
            <span className="font-bold text-yellow">
              ၸၢႆးၼေႃႇမိူင်း(လွၼ်ႉ){" "}
            </span>
            ပဵၼ် ၽူႈ ၶူင်ႊသၢင်ႈ ႁဵတ်းဢွၵ်ႇ ၶူင်းၵၢၼ်ၼႆႉ မႃးမိူဝ်ႈ လိူၼ် July ပီႊ
            2025 ၼႆယူႇၶႃႈ။ ၵပ်းသိုပ်ႇ ၽူႈၶူင်ႊသၢင်ႈလႆႈလူၺ်ႈ ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ
            ၼႆႉယူႇၶႃႈ။
          </motion.p>
          <motion.div className="mb-8 mt-3" variants={itemVariants}>
            <div className="flex flex-wrap justify-center gap-4">
              {developerContacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-200 rounded-md p-1"
                >
                  <img
                    src={contact.imagePath}
                    alt={contact.link}
                    className="size-6"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Supports & Resources Section */}
      <section className="px-4 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-6 "
          >
            Supports & Resources <Handshake className="inline-block size-7" />
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg opacity-80 max-w-2xl mx-auto font-secondary"
          >
            ယိၼ်းၸူမ်းၶွပ်ႈၸႂ်ယႂ်ႇၼမ်ထိုင်{" "}
            <span className="font-bold text-yellow">
              Sai Mao (TMK-ထုင်ႉမၢဝ်းၶမ်း)
            </span>
            ဢၼ်လႆႈၸွႆႈထႅမ်ပၼ် Shan Quotes လႄႈ ၶူဝ်းၶွင်တၢင်ႇဢၼ် လႄႈ
            လွင်ႈၵမ်ႉၸွႆႈ တႃႇၶူင်းၵၢၼ်ၼႆႉယူႇၶႃႈ။ ၵပ်းသိုပ်ႇ ၸၢႆးမၢဝ်း လႆႈလူၺ်ႈ
            ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။
          </motion.p>
          <motion.div className="mb-8 mt-3" variants={itemVariants}>
            <div className="flex flex-wrap justify-center gap-4">
              {supporterContacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-200 rounded-md p-1"
                >
                  <img
                    src={contact.imagePath}
                    alt={contact.link}
                    className="size-6"
                  />
                </a>
              ))}
            </div>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="text-lg opacity-80 max-w-2xl mx-auto font-secondary"
          >
            ယဝ်ႉၵေႃႈ ၶွပ်ႈၸႂ်ထိုင်ပႃး{" "}
            <span className="font-bold text-yellow">ၸၢႆးၸၢမ်ႇၺုၼ်ႉ </span>
            ႁဝ်း ဢၼ်လႆႈၸွၺ်ႈ ထတ်းၶေႃႈသဵင်တႅတ်ႈ လႄႈ ၸွၺ်ႈ ၽိူမ်ႉၶေႃႈမုၼ်း
            လိၵ်ႈတႆး တွၼ်ႈတႃႇ ၶူင်းၵၢၼ်ၼႆႉၶႃႈ။ ၵပ်းသိုပ်ႇ ၸၢႆးၸၢမ်ႇၺုၼ်ႉ
            လႆႈလူၺ်ႈ ႁဵၼ်းလိၵ်ႈတၢင်းတႂ်ႈ ၼႆႉယူႇၶႃႈ။
          </motion.p>
          <motion.div className="mb-8 mt-3" variants={itemVariants}>
            <div className="flex flex-wrap justify-center gap-4">
              {anotherSupporterContacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-gray-200 rounded-md p-1"
                >
                  <img
                    src={contact.imagePath}
                    alt={contact.link}
                    className="size-6"
                  />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Release Announcement Section */}
      <section className="px-4 pb-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold mb-6 "
          >
            Release Announcement - {releseDate} (Latest){" "}
            <Rocket className="inline-block size-7" />
          </motion.h2>

          <motion.div
            variants={itemVariants}
            className="text-lg opacity-80 max-w-2xl mx-auto "
          >
            <p>
              We are excited to announce the latest update for LikDai-Pro. This
              update brings several improvements and new features to enhance
              your typing experience. Thank you for your patience and support as
              we continue to develop and improve the app.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
};

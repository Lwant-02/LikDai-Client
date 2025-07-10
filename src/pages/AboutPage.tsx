import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Keyboard,
  Award,
  BarChart,
  Quote,
  Bug,
  UserCog,
  ChevronsUp,
} from "lucide-react";

import { useTitle } from "@/hook/useTitle";
import { Button } from "@/components/ui/button";
import { ReportSummitDialog } from "@/components/ReportSummitDialog";
import { developerContacts } from "@/constant";

const timelineItems = [
  {
    title: "Choose your test type",
    description:
      "Select between timed tests, word count, quotes, or custom text.",
    icon: <span className="text-xl font-bold">1</span>,
    color: "bg-blue/20 text-blue",
  },
  {
    title: "Select your language",
    description: "Switch between English and Shan language modes.",
    icon: <span className="text-xl font-bold">2</span>,
    color: "bg-yellow/20 text-yellow",
  },
  {
    title: "Start typing",
    description: "The timer begins automatically when you start typing.",
    icon: <span className="text-xl font-bold">3</span>,
    color: "bg-green/20 text-green",
  },
  {
    title: "View your results",
    description:
      "After completing a test, review your WPM, accuracy, and other metrics.",
    icon: <span className="text-xl font-bold">4</span>,
    color: "bg-orange/20 text-orange",
  },
  {
    title: "Track your progress",
    description:
      "Create an account to save your results and compare with others on the leaderboard.",
    icon: <span className="text-xl font-bold">5</span>,
    color: "bg-purple/20 text-purple",
  },
];

export const AboutPage = () => {
  const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] =
    useState<boolean>(false);
  const [isUserScrolled, setIsUserScrolled] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useTitle({ pathName: pathname });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsUserScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <article className="min-h-screen relative">
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
            <h1 className="text-4xl sm:text-6xl font-bold mb-4">
              LikDai - Pro
            </h1>
            <p className="text-xl sm:text-2xl opacity-80 max-w-2xl mx-auto">
              Master Shan Typing with Precision and Speed
            </p>
          </motion.div>
        </section>

        {/* Mission Section */}
        <section className="px-4 pt-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Our Mission
              </h2>
              <div className="h-1 w-20 bg-yellow mx-auto mb-8 rounded-full" />
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="prose prose-lg dark:prose-invert mx-auto text-center"
            >
              <p className="text-lg sm:text-xl opacity-90 leading-relaxed">
                LikDai-Pro is a specialized typing platform designed to help
                users master Shan language typing. Inspired by MonkeyType, we've
                created a clean, distraction-free environment where you can
                practice and improve your typing skills in both English and Shan
                languages.
              </p>
              <p className="text-lg sm:text-xl opacity-90 leading-relaxed mt-4">
                Our mission is to preserve and promote the Shan language through
                technology, making it accessible for both native speakers and
                learners to develop their digital literacy skills.
              </p>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="pt-5 px-4 bg-foreground/5">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <motion.div
                variants={itemVariants}
                className="bg-foreground/10 backdrop-blur-sm rounded-xl p-6 hover:bg-foreground/20 transition-colors"
              >
                <div className="bg-yellow/10 size-14 rounded-lg flex items-center justify-center mb-4">
                  <Keyboard className="size-7 text-yellow" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bilingual Support</h3>
                <p className="opacity-80">
                  Practice typing in both English and Shan languages with
                  specialized texts designed to improve your skills in both
                  writing systems.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-foreground/10 backdrop-blur-sm rounded-xl p-6 hover:bg-foreground/20 transition-colors"
              >
                <div className="bg-green/10 size-14 rounded-lg flex items-center justify-center mb-4">
                  <BarChart className="size-7 text-green" />
                </div>
                <h3 className="text-xl font-bold mb-2">Performance Tracking</h3>
                <p className="opacity-80">
                  Monitor your progress with detailed statistics, charts, and
                  insights to help you identify areas for improvement.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-foreground/10 backdrop-blur-sm rounded-xl p-6 hover:bg-foreground/20 transition-colors"
              >
                <div className="bg-blue/10 size-14 rounded-lg flex items-center justify-center mb-4">
                  <Award className="size-7 text-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Achievements</h3>
                <p className="opacity-80">
                  Earn badges and unlock achievements as you improve your typing
                  speed, accuracy, and consistency over time.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-foreground/10 backdrop-blur-sm rounded-xl p-6 hover:bg-foreground/20 transition-colors"
              >
                <div className="bg-orange/10 size-14 rounded-lg flex items-center justify-center mb-4">
                  <Quote className="size-7 text-orange rotate-180" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multiple Test Modes</h3>
                <p className="opacity-80">
                  Choose from timed tests, word count challenges, quotes, or
                  create your own custom typing exercises.
                </p>
              </motion.div>
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
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                How to Use
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
                    className={`flex flex-col md:flex-row items-center md:items-start gap-4 mb-12 ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex-1 md:text-right md:pr-8 order-2 md:order-none">
                      {index % 2 === 0 ? (
                        <div className="md:text-right">
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
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
                          <h3 className="text-xl font-bold mb-2">
                            {item.title}
                          </h3>
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
              Report a Bug <Bug className="inline-block size-7" />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg opacity-80 mb-8 max-w-2xl mx-auto "
            >
              If you encounter any bugs or issues or have any suggestions,
              please share them to us. We are always looking to improve and make
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
              className="text-lg opacity-80 max-w-2xl mx-auto "
            >
              This webiste was developed and maintained by{" "}
              <span className="font-bold text-yellow">
                Sai Naw Main (Lwant).{" "}
              </span>
              You can contact him through the contacts below.
            </motion.p>
            <motion.div className="mb-8 mt-3" variants={itemVariants}>
              <div className="flex flex-wrap justify-center gap-4">
                {developerContacts.map((contact, index) => (
                  <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white rounded-md p-1"
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

        {/* CTA Section */}
        <section className="px-4 pb-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-6"
            >
              Ready to Improve Your Typing Skills?
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg opacity-80 mb-8 max-w-2xl mx-auto"
            >
              Join thousands of users who are already mastering Shan typing with
              LikDai-Pro. It's completely free and designed to help you type
              faster and more accurately.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="bg-yellow hover:bg-yellow/80 text-background font-bold text-lg px-8 py-6 cursor-pointer"
                onClick={() => navigate("/typing-test")}
              >
                Start Typing Now
              </Button>
            </motion.div>
          </motion.div>
        </section>
        {isUserScrolled && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 md:right-10 right-2 z-50 p-3 rounded-full bg-yellow text-foreground hover:bg-yellow/80 transition-colors cursor-pointer"
          >
            <ChevronsUp className="size-6" />
          </button>
        )}
      </article>
      {/* Dialog to report a bug */}
      <ReportSummitDialog
        isOpen={isSubmittingDialogOpen}
        setIsOpen={setIsSubmittingDialogOpen}
      />
    </>
  );
};

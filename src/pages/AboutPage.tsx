import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronsUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { ReportSummitDialog } from "@/components/ReportSummitDialog";
import { AboutEngSection } from "@/components/AboutEngSection";

// Animation variants
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const AboutPage = () => {
  const [isSubmittingDialogOpen, setIsSubmittingDialogOpen] =
    useState<boolean>(false);
  const [isUserScrolled, setIsUserScrolled] = useState<boolean>(false);
  const navigate = useNavigate();

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
      <Helmet>
        <title>About | LikDai</title>
        <meta
          name="description"
          content="About LikDai - Pro, the ultimate Shan typing app."
        />
      </Helmet>
      <article className="min-h-screen relative">
        {/* English Section */}
        <AboutEngSection
          setIsSubmittingDialogOpen={setIsSubmittingDialogOpen}
        />

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
              LikDai. It's completely free and designed to help you type faster
              and more accurately.
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

        {/* Back to top button */}
        {isUserScrolled && (
          <button
            onClick={scrollToTop}
            className="fixed animate-bounce bottom-10 md:right-10 right-2 z-50 p-3 rounded-full bg-yellow text-primary hover:bg-yellow/80 transition-colors cursor-pointer"
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

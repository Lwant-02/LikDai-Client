import { motion } from "framer-motion";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute bottom-1 w-full mx-auto flex md:flex-row flex-col justify-center items-center md:gap-5 gap-1 z-10"
    >
      <p className="text-sm md:order-1 order-2">
        &copy; {year} LikDai | All rights reserved.
      </p>
      <a
        className="text-sm md:order-2 order-1"
        href="https://monkeytype.com/"
        target="_blank"
      >
        Inspired by -{" "}
        <strong className="text-yellow hover:underline">monkeytype</strong>
      </a>
    </motion.footer>
  );
};

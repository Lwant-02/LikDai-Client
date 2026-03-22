import { Helmet } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { motion } from "framer-motion";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { authStore } from "@/store/authStore";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const LoginPage = () => {
  const { isCheckingAuth } = authStore();

  if (isCheckingAuth) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Login - LikDai | ၶဝ်ႈလွၵ်ႉဢိၼ် (Login)</title>
        <meta
          name="description"
          content="Log in to your LikDai account to track your Shan / Dai / Tai typing progress (ၽိုၵ်းပေႃႉလိၵ်ႈတႆး) and access exclusive features."
        />
      </Helmet>
      <motion.article
        className="flex justify-center items-center layout "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="w-full h-auto grid md:grid-cols-2 grid-cols-1 gap-10 md:my-28 mt-10 md:mb-0 mb-20 "
        >
          <RegisterForm />
          <span className="w-full h-1 bg-foreground/40 md:hidden rounded-full flex " />
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LoginForm />
          </GoogleOAuthProvider>
        </motion.div>
      </motion.article>
    </>
  );
};

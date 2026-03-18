import { Helmet } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { authStore } from "@/store/authStore";

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
      <article className="flex justify-center items-center layout ">
        <div className="w-full h-auto grid md:grid-cols-2 grid-cols-1 gap-10 md:my-28 mt-10 md:mb-0 mb-20 ">
          <RegisterForm />
          <span className="w-full h-1 bg-foreground/40 md:hidden rounded-full flex " />
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <LoginForm />
          </GoogleOAuthProvider>
        </div>
      </article>
    </>
  );
};

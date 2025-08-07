import { Helmet } from "react-helmet-async";

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
        <title>Login | LikDai</title>
        <meta
          name="description"
          content="Login to your LikDai - Pro account."
        />
      </Helmet>
      <article className="flex justify-center items-center w-full h-full ">
        <div className="w-full h-auto grid md:grid-cols-2 grid-cols-1 gap-10 md:my-28 mt-10 md:mb-0 mb-20 md:px-0 px-3">
          <RegisterForm />
          <span className="w-full h-1 bg-foreground/40 md:hidden rounded-full flex " />
          <LoginForm />
        </div>
      </article>
    </>
  );
};

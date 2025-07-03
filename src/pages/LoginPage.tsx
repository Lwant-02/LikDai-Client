import { useLocation } from "react-router-dom";

import { useTitle } from "@/hook/useTitle";
import { RegisterForm } from "@/components/RegisterForm";
import { LoginForm } from "@/components/LoginForm";

export const LoginPage = () => {
  const { pathname } = useLocation();
  useTitle({ pathName: pathname });

  return (
    <article className="flex justify-center items-center w-full h-full ">
      <div className="w-full h-auto grid md:grid-cols-2 grid-cols-1 gap-10 md:my-28 mt-10 md:mb-0 mb-20 md:px-0 px-3">
        <RegisterForm />
        <span className="w-full h-1 bg-foreground/40 md:hidden rounded-full flex " />
        <LoginForm />
      </div>
    </article>
  );
};

import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "../../../components/ui/button";
import { InputFiled } from "../../../components/InputFiled";
import { useRegister } from "@/hooks/useAuth";
import { MiniSpinner } from "@/components/MiniSpinner";
import { COMMON_INPUT_CONTENT } from "@/content/common.content";
import { LOGIN_CONTENT } from "@/content/login.content";

interface FormData {
  username: string;
  email: string;
  password: string;
}

export const RegisterForm = () => {
  const { isRegistering, registerUser } = useRegister();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      toast("❗️Notice", {
        description: <p className="text-white">Please fill in all fields!</p>,
      });
      return;
    }
    registerUser(formData, {
      onSuccess: () => {
        setFormData({
          username: "",
          email: "",
          password: "",
        });
        toast("✅️ Success", {
          description: (
            <p className="text-white">
              Registration successful! Please login with your new account.
            </p>
          ),
          style: {
            backgroundColor: "#1f7d53 ",
          },
        });
      },
      onError: (error: any) => {
        if (error.code === "ERR_NETWORK") {
          toast("❌️ Oops!", {
            description: (
              <p className="text-white">
                Request timed out! Please try again later.
              </p>
            ),
          });
          return;
        }
        toast("❌️ Oops!", {
          description: (
            <p className="text-white">
              {error.response.data.message ||
                "Something went wrong. Please try again."}
            </p>
          ),
        });
      },
    });
  };

  return (
    <form
      className="flex flex-col justify-start items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center gap-2">
        <UserPlusIcon className="size-7 " />
        <p className="text-2xl font-bold">{LOGIN_CONTENT.register}</p>
      </div>
      <InputFiled
        type="text"
        id="username"
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        placeholder={COMMON_INPUT_CONTENT.namePlaceholder}
        label={COMMON_INPUT_CONTENT.name}
        helperText={COMMON_INPUT_CONTENT.nameHelperText}
      />
      <InputFiled
        type="email"
        id="email_register"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        placeholder={COMMON_INPUT_CONTENT.emailPlaceholder}
        label={COMMON_INPUT_CONTENT.email}
        helperText={COMMON_INPUT_CONTENT.emailHelperText}
      />
      <InputFiled
        type="password"
        id="password_register"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        placeholder={COMMON_INPUT_CONTENT.passwordPlaceholder}
        label={COMMON_INPUT_CONTENT.password}
        helperText={COMMON_INPUT_CONTENT.passwordHelperText}
      />
      <Button
        variant="destructive"
        disabled={isRegistering}
        type="submit"
        className="mt-3 btn h-10 border border-primary/10 text-primary bg-foreground/50 w-full max-w-sm cursor-pointer flex justify-center items-center hover:bg-foreground text-base"
      >
        {isRegistering ? (
          <MiniSpinner />
        ) : (
          <>
            <UserPlusIcon className="size-5 bg-transparent" />
            {LOGIN_CONTENT.register}
          </>
        )}
      </Button>
    </form>
  );
};

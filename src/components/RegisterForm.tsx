import { UserPlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import { InputFiled } from "./InputFiled";
import { useRegister } from "@/hook/useAuth";
import { Spinner } from "./Spinner";

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
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col justify-center items-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center items-center gap-2">
        <UserPlusIcon className="size-7 " />
        <p className="text-2xl font-bold">Register</p>
      </div>
      <InputFiled
        type="text"
        id="username"
        value={formData.username}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, username: e.target.value }))
        }
        placeholder="Username"
        label="Username"
        helperText="Username must contain numbers and lowercase letters only."
      />
      <InputFiled
        type="email"
        id="email_register"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        placeholder="Email"
        label="Email"
        helperText="Email must be a valid email address."
      />
      <InputFiled
        type="password"
        id="password_register"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        placeholder="Password"
        label="Password"
        helperText="Password must be at least 8 characters long and contain at least one letter and one number."
      />
      <Button
        variant="destructive"
        disabled={isRegistering}
        type="submit"
        className="h-10 mt-3 text-primary rounded-lg bg-foreground/50 w-full max-w-sm cursor-pointer flex justify-center items-center hover:bg-foreground text-base transition-colors duration-200 "
      >
        {isRegistering ? (
          <Spinner size={6} />
        ) : (
          <>
            <UserPlusIcon className="size-5 bg-transparent" />
            Sign Up
          </>
        )}
      </Button>
    </motion.form>
  );
};

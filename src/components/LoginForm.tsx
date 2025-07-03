import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";
import { useState } from "react";
import { motion } from "framer-motion";

import { Button } from "./ui/button";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import { InputFiled } from "./InputFiled";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast("ⓘ Notice", {
        description: <p className="text-primary">Please fill in all fields!</p>,
      });
      return;
    }
  };
  return (
    <>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col justify-start items-center gap-4 "
        onSubmit={handleSumit}
      >
        <div className="flex justify-center items-center gap-2">
          <ArrowDownTrayIcon className="size-7 -rotate-90 " />
          <p className="text-2xl font-bold">Login</p>
        </div>
        <InputFiled
          type="email"
          id="email_login"
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
          id="password_login"
          value={formData.password}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Password"
          label="Password"
          helperText="Password must be at least 8 characters long."
        />
        <Button
          variant="destructive"
          type="submit"
          className="mt-3 h-10 rounded-lg bg-foreground/50 w-full max-w-sm cursor-pointer flex justify-center items-center hover:bg-foreground text-base"
        >
          <ArrowDownTrayIcon className="size-5 bg-transparent -rotate-90" />
          Sign In
        </Button>
        <div className=" w-full max-w-sm flex justify-end items-center">
          <button
            type="button"
            onClick={() => setIsDialogOpen(true)}
            className="hover:text-primary text-sm text-primary/50 cursor-pointer"
          >
            Forgot Password?
          </button>
        </div>
      </motion.form>
      <ForgotPasswordDialog isOpen={isDialogOpen} setIsOpen={setIsDialogOpen} />
    </>
  );
};

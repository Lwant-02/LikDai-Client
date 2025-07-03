import { RotateCcwKey } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { InputFiled } from "@/components/InputFiled";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSumit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmPassword) {
      toast("ⓘ Notice", {
        description: <p className="text-primary">Please fill in all fields!</p>,
      });
      return;
    }
    if (formData.confirmPassword !== formData.newPassword) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">
            Passwords do not match! Please try again.
          </p>
        ),
      });
      return;
    }
    toast("✅️ Password Changed", {
      description: (
        <p className="text-primary">
          Password changed successfully! Please login with your new password.
        </p>
      ),
      style: {
        backgroundColor: "#1f7d53 ",
      },
    });
    setFormData({
      newPassword: "",
      confirmPassword: "",
    });
  };

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return (
    <article className="flex justify-center items-center h-screen w-full flex-col gap-7 md:px-0 px-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex justify-center items-center"
      >
        <img
          src="/images/Logo.png"
          alt="Logo"
          className="size-16 object-cover"
        />
        <p className="text-2xl font-bold ">LikDai - Pro</p>
      </motion.div>
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col justify-start items-center gap-4 w-full max-w-sm"
        onSubmit={handleSumit}
      >
        <div className="flex justify-center items-center gap-2">
          <RotateCcwKey className="size-7 -rotate-90 " />
          <p className="text-2xl font-bold">Change Password</p>
        </div>
        <InputFiled
          type="password"
          id="new_password"
          value={formData.newPassword}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
          }
          placeholder="New Password"
          label="New Password"
          helperText="Password must be at least 8 characters long."
        />
        <InputFiled
          type="password"
          id="confirm_password"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
          placeholder="Confirm Password"
          label="Confirm Password"
          helperText="Password must be at least 8 characters long."
        />
        <Button
          variant="destructive"
          type="submit"
          className="mt-3 h-10 rounded-lg bg-foreground/50 w-full max-w-sm cursor-pointer flex justify-center items-center hover:bg-foreground text-base"
        >
          <RotateCcwKey className="size-5 bg-transparent -rotate-90" />
          Confirm
        </Button>
      </motion.form>
    </article>
  );
};

import { RotateCcwKey } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { Button } from "@/components/ui/button";
import { InputFiled } from "@/components/InputFiled";
import { useChangePassword } from "@/hooks/useAuth";
import { MiniSpinner } from "@/components/MiniSpinner";
import { CHANGE_PASS_CONTENT } from "@/content/change-pass.content";
import { COMMON_INPUT_CONTENT } from "@/content/common.content";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

export const ChangePasswordPage = () => {
  const { changePassword, isChangingPassword } = useChangePassword();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleSumit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.newPassword || !formData.confirmPassword) {
      toast("ⓘ Notice", {
        description: <p className="text-white">Please fill in all fields!</p>,
      });
      return;
    }
    if (formData.confirmPassword !== formData.newPassword) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">
            Passwords do not match! Please try again.
          </p>
        ),
      });
      return;
    }
    await changePassword(
      {
        email: email!,
        password: formData.newPassword,
      },
      {
        onSuccess: () => {
          setFormData({
            newPassword: "",
            confirmPassword: "",
          });
          navigate("/login", { replace: true });
          toast("✅️ Success", {
            description: (
              <p className="text-white">
                Password changed successfully! You may leave this page now and
                login with your new password.
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
      },
    );
  };

  if (!email) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{CHANGE_PASS_CONTENT.metadata}</title>
        <meta name="description" content={CHANGE_PASS_CONTENT.description} />
      </Helmet>

      <article className="flex justify-center items-center h-screen w-full flex-col gap-7 md:px-0 px-3">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-2"
        >
          <img
            src="/icons/favicon.svg"
            alt="Logo"
            className="size-12 object-cover"
          />
          <p className="text-3xl pt-1 font-bold font-tachileik">လိၵ်ႈတႆး</p>
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
            <p className="text-2xl font-bold">{CHANGE_PASS_CONTENT.title}</p>
          </div>
          <InputFiled
            type="password"
            id="new_password"
            value={formData.newPassword}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            placeholder={COMMON_INPUT_CONTENT.newPasswordPlaceholder}
            label={COMMON_INPUT_CONTENT.newPassword}
            helperText={COMMON_INPUT_CONTENT.passwordHelperText}
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
            placeholder={COMMON_INPUT_CONTENT.confirmPasswordPlaceholder}
            label={COMMON_INPUT_CONTENT.confirmPassword}
            helperText={COMMON_INPUT_CONTENT.passwordHelperText}
          />
          <Button
            variant="destructive"
            type="submit"
            disabled={isChangingPassword}
            className="mt-3 btn h-10 border border-primary/10 text-primary bg-foreground/50 w-full max-w-sm cursor-pointer flex justify-center items-center hover:bg-foreground text-base"
          >
            {isChangingPassword ? (
              <MiniSpinner />
            ) : (
              <>
                <RotateCcwKey className="size-5 bg-transparent -rotate-90" />
                {CHANGE_PASS_CONTENT.confirm}
              </>
            )}
          </Button>
        </motion.form>
      </article>
    </>
  );
};

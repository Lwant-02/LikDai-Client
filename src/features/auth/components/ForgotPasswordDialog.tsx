import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForgotPassword } from "@/hooks/useAuth";
import { MiniSpinner } from "@/components/MiniSpinner";
import { LOGIN_CONTENT } from "@/content/login.content";
import { COMMON_INPUT_CONTENT } from "@/content/common.content";
import { InputFiled } from "@/components/InputFiled";
import { cn } from "@/lib/utils";

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ForgotPasswordDialog = ({
  isOpen,
  setIsOpen,
}: ForgotPasswordDialogProps) => {
  const navigate = useNavigate();
  const { forgotPassword, isSendingEmail } = useForgotPassword();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast("ⓘ Notice", {
        description: <p className="text-white">Please fill your email!</p>,
      });
      return;
    }
    await forgotPassword(email, {
      onSuccess: () => {
        setIsOpen(false);
        setEmail("");

        // Redirect to OTP verification page
        navigate(`/verify-otp?email=${encodeURIComponent(email)}`);

        toast("✅️ Success", {
          description: (
            <p className="text-white">
              OTP sent to your email! Please check your inbox or spam folder.
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle>{LOGIN_CONTENT.forgotPassDialogTitle}</DialogTitle>
          <DialogDescription className="text-sm opacity-70">
            {LOGIN_CONTENT.description}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex items-center gap-2 flex-col "
          onSubmit={handleSubmit}
        >
          <InputFiled
            type="email"
            id="email_login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={COMMON_INPUT_CONTENT.emailPlaceholder}
            label={COMMON_INPUT_CONTENT.email}
            helperText={COMMON_INPUT_CONTENT.emailHelperText}
          />
          <button
            type="submit"
            disabled={isSendingEmail}
            className={cn(
              "mt-3 btn h-10 border border-primary/10 text-primary bg-foreground w-full cursor-pointer flex justify-center items-center hover:bg-foreground/80 transition-colors duration-300 text-base",
              !email && "cursor-not-allowed opacity-50",
            )}
          >
            {isSendingEmail ? <MiniSpinner /> : <>{LOGIN_CONTENT.btn}</>}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

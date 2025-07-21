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
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForgotPassword } from "@/hooks/useAuth";
import { Spinner } from "./Spinner";

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
      <DialogContent className="sm:max-w-md border-none bg-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle>Forgot Password</DialogTitle>
          <DialogDescription className="text-sm opacity-70">
            Enter your email address to reset your password.
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex items-center gap-2 flex-col "
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            id="email_login"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-background/30 border-none focus:ring-1! ring-primary/30 h-10  rounded-lg"
          />
          <Button
            variant="destructive"
            type="submit"
            disabled={isSendingEmail}
            className="mt-3 h-10 text-primary rounded-lg bg-background/50 w-full cursor-pointer flex justify-center items-center hover:bg-background text-base"
          >
            {isSendingEmail ? <Spinner size={6} /> : <>Send Email</>}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

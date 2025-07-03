import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ForgotPasswordDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ForgotPasswordDialog = ({
  isOpen,
  setIsOpen,
}: ForgotPasswordDialogProps) => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) {
      toast("ⓘ Notice", {
        description: <p className="text-primary">Please fill your email!</p>,
      });
      return;
    }
    toast("✅️ Success", {
      description: (
        <p className="text-primary">
          Password reset successfully! If this email is valid, you will receive
          an email shortly.
        </p>
      ),
      style: {
        backgroundColor: "#1f7d53 ",
      },
    });
    setIsOpen(false);
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
            className="mt-3 h-10 rounded-lg bg-background/50 w-full cursor-pointer flex justify-center items-center hover:bg-background text-base"
          >
            Confirm
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

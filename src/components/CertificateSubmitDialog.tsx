import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";
import { cn } from "@/lib/utils";
import { submitReport } from "@/service/submitReport";
import { Input } from "./ui/input";

interface CertificateSubmitDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CertificateSubmitDialog = ({
  isOpen,
  setIsOpen,
}: CertificateSubmitDialogProps) => {
  const [text, setText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">Please do not leave this empty!</p>
        ),
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await submitReport(text);
      if (res) {
        setText("");
        setIsOpen(false);
        toast("✅️ Success", {
          description: (
            <p className="text-primary">Report submitted successfully!</p>
          ),
          style: {
            backgroundColor: "#1f7d53 ",
          },
        });
      }
    } catch (error) {
      console.log(error);
      toast("❌️ Oops!", {
        description: (
          <p className="text-primary">
            Something went wrong. Please try again.
          </p>
        ),
      });
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-none bg-foreground rounded-lg">
          <DialogHeader>
            <DialogTitle>Submit Your Full Name</DialogTitle>
            <DialogDescription className="text-sm opacity-70">
              Please enter your full name to display on your certificate.
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex items-center gap-2 flex-col "
            onSubmit={handleSubmit}
          >
            <Input
              id="custom_text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your full name here..."
              className={cn(
                "bg-background/30 border-none focus:ring-1! ring-primary/30 rounded-lg "
              )}
            />
            <Button
              variant="destructive"
              type="submit"
              disabled={isSubmitting}
              className="mt-3 h-10 rounded-lg bg-background/50 w-full cursor-pointer flex justify-center items-center hover:bg-background text-base"
            >
              {isSubmitting ? <Spinner size={6} /> : <>Submit</>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

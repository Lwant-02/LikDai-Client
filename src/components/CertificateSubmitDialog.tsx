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
import { Input } from "./ui/input";
import { useSubmitCertificate } from "@/hook/useUser";

interface CertificateSubmitDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CertificateSubmitDialog = ({
  isOpen,
  setIsOpen,
}: CertificateSubmitDialogProps) => {
  const { submitCertificate, isSubmittingCertificate } = useSubmitCertificate();
  const [text, setText] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">Please do not leave full name empty!</p>
        ),
      });
      return;
    }
    await submitCertificate(text, {
      onSuccess: () => {
        setText("");
        setIsOpen(false);
        toast("✅️ Success", {
          description: (
            <p className="text-primary">
              Certificate submitted successfully and you can click the link to
              preview or download your certificate.
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
              <p className="text-primary">
                Request timed out! Please try again later.
              </p>
            ),
          });
          return;
        }
        toast("❌️ Oops!", {
          description: (
            <p className="text-primary">
              {error.response.data.message ||
                "Something went wrong. Please try again."}
            </p>
          ),
        });
      },
    });
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
              disabled={isSubmittingCertificate}
              className="mt-3 h-10 text-primary rounded-lg bg-background/50 w-full cursor-pointer flex justify-center items-center hover:bg-background text-base"
            >
              {isSubmittingCertificate ? <Spinner size={6} /> : <>Submit</>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

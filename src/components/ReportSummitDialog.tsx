import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { cn } from "@/lib/utils";
import { ThankyouDialog } from "./ThankyouDialog";
import { submitReport } from "@/service/submitReport";
import { MiniSpinner } from "./MiniSpinner";

interface ReportSummitDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ReportSummitDialog = ({
  isOpen,
  setIsOpen,
}: ReportSummitDialogProps) => {
  const [text, setText] = useState<string>("");
  const [isThankyouDialogOpen, setIsThankyouDialogOpen] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">Please do not leave this empty!</p>
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
        setIsThankyouDialogOpen(true);
        toast("✅️ Success", {
          description: (
            <p className="text-white">Report submitted successfully!</p>
          ),
          style: {
            backgroundColor: "#1f7d53 ",
          },
        });
      }
    } catch (error: any) {
      console.log(error);
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
          <p className="text-white">Something went wrong. Please try again.</p>
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
        <DialogContent className="sm:max-w-md bg-background/80 overflow-hidden backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>Report a Bug or Give Feedbacks 🐞</DialogTitle>
            <DialogDescription className="text-sm opacity-70">
              Please explain the issue you are facing or any feedbacks or
              suggestions you have. we will get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex items-center gap-2 flex-col "
            onSubmit={handleSubmit}
          >
            <Textarea
              id="custom_text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Report your issue or your suggestions or feedbacks here..."
              className={cn(
                "bg-background/30 border border-primary/10 focus:ring-1! ring-primary/30 h-40  rounded-xl resize-none",
              )}
            />
            <button
              type="submit"
              disabled={isSubmitting || !text}
              className={cn(
                "mt-3 btn h-10 border border-primary/10 text-primary bg-foreground w-full cursor-pointer flex justify-center items-center hover:bg-foreground/80 transition-colors duration-300 text-base",
                !text && "cursor-not-allowed opacity-50",
              )}
            >
              {isSubmitting ? <MiniSpinner /> : <>Submit</>}
            </button>
          </form>
        </DialogContent>
      </Dialog>
      {/* Thank you dialog */}
      <ThankyouDialog
        isOpen={isThankyouDialogOpen}
        setIsOpen={setIsThankyouDialogOpen}
      />
    </>
  );
};

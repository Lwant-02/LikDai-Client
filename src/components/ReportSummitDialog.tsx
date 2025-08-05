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
        <DialogContent className="sm:max-w-md border-none bg-foreground rounded-lg">
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
                "bg-background/30 border-none focus:ring-1! ring-primary/30 h-40  rounded-lg resize-none"
              )}
            />
            <Button
              variant="destructive"
              type="submit"
              disabled={isSubmitting}
              className="mt-3 h-10 text-primary rounded-lg bg-background/50 w-full cursor-pointer flex justify-center items-center hover:bg-background text-base"
            >
              {isSubmitting ? <MiniSpinner /> : <>Submit</>}
            </Button>
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

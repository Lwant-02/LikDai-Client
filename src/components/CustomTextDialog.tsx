import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { settingStore } from "@/store/settingStore";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CustomTextDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const CustomTextDialog = ({
  isOpen,
  setIsOpen,
}: CustomTextDialogProps) => {
  const { setCustomText, customText, mode } = settingStore();
  const [text, setText] = useState<string>(customText);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">You can not leave this empty!</p>
        ),
      });
      return;
    }
    setCustomText(text);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-2xl border-none bg-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle>Custom Text</DialogTitle>
          <DialogDescription className="text-sm opacity-70">
            Enter your custom text here and do not exceed 100 characters.
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
            placeholder="Custom Text"
            className={cn(
              "bg-background/30 border-none focus:ring-1! ring-primary/30 h-52  rounded-lg resize-none",
              mode === "shan" && "font-secondary"
            )}
          />
          <Button
            variant="destructive"
            type="submit"
            className="mt-3 h-10 rounded-lg bg-background/50 w-full cursor-pointer flex justify-center items-center hover:bg-background text-base"
          >
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

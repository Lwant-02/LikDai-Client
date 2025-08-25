import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface AlertDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  mode: LanguageMode;
}

export const AlertDialog = ({ isOpen, setIsOpen, mode }: AlertDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-none bg-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle
            className={cn(
              "text-center text-3xl",
              mode === "shan" && "font-secondary"
            )}
          >
            {mode === "eng"
              ? "Wrong Keyboard Layout!"
              : "လွၵ်းမိုဝ်းၶီးပွတ်ႇၽိတ်း!"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Wrong keyboard layout dialog
          </DialogDescription>
        </DialogHeader>
        <DotLottieReact
          src="https://lottie.host/fc9fa88a-4713-480a-893a-16d5cc98e3c7/LkPij0CBzG.lottie"
          loop
          autoplay
        />
        <p
          className={cn(
            "text-center text-lg font-semibold",
            mode === "shan" && "font-secondary"
          )}
        >
          {mode === "eng"
            ? "Please use the in-app keyboard layout. You do not need to change your system keyboard layout."
            : "ၶႅၼ်းတေႃႈ ၸႂ်ႉတိုဝ်း လွၵ်းမိုဝ်း ၶီးပွတ်ႇ ဢၼ်မီးၼႂ်း ဢႅပ်ႉၼၼ်ႉၶႃႈလႄႈ။ ၽူႈၸႂ်ႉတိုဝ်းႁဝ်း ဢမ်ႇလူဝ်ႇလႅၵ်ႈ လွၵ်းမိုဝ်း ၶီးပွတ်ႇ ၼႂ်း System ၸဝ်ႈၵဝ်ႇၶႃႈ။"}
        </p>
      </DialogContent>
    </Dialog>
  );
};

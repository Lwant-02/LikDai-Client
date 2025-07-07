import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ThankyouDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ThankyouDialog = ({ isOpen, setIsOpen }: ThankyouDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-none bg-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">Thank You!</DialogTitle>
          <DialogDescription className="sr-only">
            Thank you dialog
          </DialogDescription>
        </DialogHeader>
        <DotLottieReact
          src="https://lottie.host/fc9fa88a-4713-480a-893a-16d5cc98e3c7/LkPij0CBzG.lottie"
          loop
          autoplay
        />
        <p className="text-center text-lg font-semibold">
          Thank you very much for your contribution! Your report will help us
          improve the app and make it better for everyone.
        </p>
      </DialogContent>
    </Dialog>
  );
};

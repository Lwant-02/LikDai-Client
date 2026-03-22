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
      <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-center text-3xl">
            ယိၼ်းၸူမ်းယဝ်ႉၶႃႈ!
          </DialogTitle>
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
          ယိၼ်းၸူမ်းၶွပ်ႈၸႂ်ယႂ်ႇၼမ်ၶႃႈ ဢၼ်လႆႈၸွၺ်ႈထႅမ်မႃး! ၶေႃႈမုၼ်းလႄႈ
          ၶေႃႈတွပ်ႇ ၸဝ်ႈၵဝ်ႇ တေၸွၺ်ႈထႅမ် ႁႂ်ႈႁဝ်းၶႃႈ ႁဵတ်းႁႂ်ႈ ဢႅပ်ႉၼႆႉ
          လီလိူဝ်မႃး တႃႇၵူႊၵေႃႉယူႇၶႃႈ။
        </p>
      </DialogContent>
    </Dialog>
  );
};

import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Link } from "react-router-dom";

interface LoginPromptDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  pageLink: string;
}

export const LoginPromptDialog = ({
  isOpen,
  setIsOpen,
  pageLink,
}: LoginPromptDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-background/80 overflow-hidden backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            ၶဝ်ႈလွၵ်ႉဢိၼ် ဢမ်ႇၼၼ် သိုပ်ႇၸႂ်ႉၼင်ႇၶႅၵ်ႇ 👤
          </DialogTitle>
          <DialogDescription className="text-sm opacity-70">
            ၶႅၼ်းတေႃႈ ၶဝ်ႈလွၵ်ႉဢိၼ် (Login) တွၼ်ႈတႃႇသိမ်းဝႆႉ ၶေႃႈမုၼ်းၸဝ်ႈၵဝ်ႇ၊
            ဢမ်ႇၼၼ် သိုပ်ႇၸႂ်ႉတိုဝ်း ၼင်ႇၶႅၵ်ႇ (Guest) ၵေႃႈလႆႈၶႃႈ။
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <Link
            to={pageLink}
            className={cn(
              "mt-3 btn h-10 border border-primary/10 text-primary bg-foreground w-full cursor-pointer flex justify-center items-center hover:bg-/80 transition-colors duration-300 text-base",
            )}
          >
            ၸႂ်ႉၼင်ႇၶႅၵ်ႇ
          </Link>
          <Link
            to="/login"
            className={cn(
              "mt-3 btn h-10 border border-blue/10 text-primary bg-blue w-full cursor-pointer flex justify-center items-center hover:bg-blue/80 transition-colors duration-300 text-base",
            )}
          >
            လွၵ်ႉဢိၼ်
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

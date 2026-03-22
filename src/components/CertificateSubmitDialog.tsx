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
import { Input } from "./ui/input";
import { useSubmitCertificate } from "@/hooks/useUser";
import { MiniSpinner } from "./MiniSpinner";

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
          <p className="text-white">Please do not leave full name empty!</p>
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
            <p className="text-white">
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
              <p className="text-white">
                Request timed out! Please try again later.
              </p>
            ),
          });
          return;
        }
        toast("❌️ Oops!", {
          description: (
            <p className="text-white">
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
        <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle>သူင်ႇၸိုဝ်ႈတဵမ်ထူၼ်ႈ</DialogTitle>
            <DialogDescription className="text-sm opacity-70">
              ၶႅၼ်းတေႃႈ တႅမ်ႈသႂ်ႇၸိုဝ်ႈၸဝ်ႈၵဝ်ႇ တဵမ်ထူၼ်ႈ ႁႂ်ႈၼႄလႆႈ
              တီႈဝႂ်ႁပ်ႉႁွင်း ၸဝ်ႈၵဝ်ႇ။
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
              placeholder="တႅမ်ႈသႂ်ႇၸိုဝ်ႈၸဝ်ႈၵဝ်ႇ တီႈၼႆႈၶႃႈ..."
              className="bg-background/30 focus:ring-1! ring-primary/30 h-10 rounded-full px-5 border border-primary/10"
            />
            <Button
              variant="destructive"
              type="submit"
              disabled={isSubmittingCertificate}
              className="mt-3 btn h-10 border border-primary/10 text-primary bg-foreground w-full cursor-pointer flex justify-center items-center hover:bg-foreground/80 transition-colors duration-300 text-base"
            >
              {isSubmittingCertificate ? <MiniSpinner /> : <>သူင်ႇၸူး</>}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

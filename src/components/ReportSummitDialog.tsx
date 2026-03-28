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
import { InputFiled } from "./InputFiled";
import { COMMON_INPUT_CONTENT } from "@/content/common.content";

interface ReportSummitDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ReportSummitDialog = ({
  isOpen,
  setIsOpen,
}: ReportSummitDialogProps) => {
  const [form, setForm] = useState({
    email: "",
    text: "",
  });

  const [isThankyouDialogOpen, setIsThankyouDialogOpen] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.text || !form.email) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">Please do not leave this empty!</p>
        ),
      });
      return;
    }
    try {
      setIsSubmitting(true);
      const res = await submitReport(form.text, form.email);
      if (res) {
        setForm({
          email: "",
          text: "",
        });
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
        <DialogContent className="sm:max-w-lg bg-background/80 overflow-hidden backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-center mb-2">
              တၢင်ႇလၢတ်ႈ လွင်ႈၽိတ်းပိူင်ႈ ဢမ်ႇၼၼ် ပၼ်တၢင်းႁၼ်ထိုင် 🐞
            </DialogTitle>
            <DialogDescription className="text-sm opacity-70 text-center mb-4">
              ၶႅၼ်းတေႃႈ သႂ်ႇပၼ် ဢီးမဵဝ်းလ် ၽွင်ႈၶႃႈ ၼင်ႇႁိုဝ် ၶႃႈၶဝ်
              တေလႆႈၵပ်းသိုပ်ႇ မွၵ်ႇလၢတ်ႈပၼ်ၶိုၼ်း။
            </DialogDescription>
          </DialogHeader>
          <form
            className="flex items-center gap-2 flex-col w-full"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex flex-col gap-5">
              <InputFiled
                containerWidth="w-full!"
                placeholder={COMMON_INPUT_CONTENT.emailPlaceholder}
                label={COMMON_INPUT_CONTENT.email}
                helperText={COMMON_INPUT_CONTENT.emailHelperText}
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Textarea
                id="custom_text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                placeholder="တၢင်ႇလၢတ်ႈၼႄပၼ်ႁႃ ဢမ်ႇၼၼ် တၢင်းႁၼ်ထိုင် တီႈၼႆႈၶႃႈ..."
                className={cn(
                  "bg-background/30 border border-primary/10 focus:ring-1! ring-primary/30 h-40  rounded-xl resize-none",
                )}
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting || !form.text || !form.email}
              className={cn(
                "mt-3 btn h-10 border border-primary/10 text-primary bg-foreground w-full cursor-pointer flex justify-center items-center hover:bg-foreground/80 transition-colors duration-300 text-base",
                !form.text && !form.email && "cursor-not-allowed opacity-50",
              )}
            >
              {isSubmitting ? <MiniSpinner /> : <>သူင်ႇၸူး</>}
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

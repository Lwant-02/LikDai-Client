import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Information = () => {
  const isUserClosed = localStorage.getItem("isInformationClosed");
  const [isVisible, setIsVisible] = useState<boolean>(!isUserClosed);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 10000); // auto-hide after 10 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const handleCloseMunally = () => {
    setIsVisible(false);
  };

  const handleDoNotShowAgain = () => {
    setIsVisible(false);
    localStorage.setItem("isInformationClosed", "true");
  };

  return (
    <div className="text-center xl:flex hidden flex-col gap-2 fixed bottom-1 xl:right-1 right-0 xl:max-w-xl h-auto w-full p-3 bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl z-50 animate-fade-in opacity-0">
      <div className="flex justify-center items-center text-center">
        <h3 className=" text-lg text-primary">
          ၽူႈၸႂ်ႉတိုဝ်းႁဝ်း ဢမ်ႇတၢပ်ႈ လူဝ်ႇမီး လွၵ်းမိုဝ်း သင်ဝႆႉ ၼႂ်းၶွမ်း
          ၵေႃႈလႆႈၶႃႈ။ လိူၵ်ႈလွၵ်းမိုဝ်း ၼႂ်းၵႄႈ ၼမ်ႉၶူင်း၊ ပၢင်လူင်၊ ယုင်းၶဵဝ်
          လႄႈ လၵ်းၸဵင် သေ တႅမ်ႈလႆႈၵမ်းလဵဝ်ၶႃႈ။
        </h3>
      </div>
      <div className="flex justify-center gap-3 items-center">
        <Button
          onClick={handleCloseMunally}
          className="w-36 btn bg-transparent text-primary border border-primary/20 cursor-pointer"
          variant="destructive"
        >
          ပိၵ်ႉပွၵ်ႈလဵဝ်
        </Button>
        <Button
          onClick={handleDoNotShowAgain}
          className="w-36 btn bg-foreground/80 cursor-pointer text-primary border border-primary/20"
          variant="destructive"
        >
          ယႃႇၼႄထႅင်ႈ
        </Button>
      </div>
    </div>
  );
};

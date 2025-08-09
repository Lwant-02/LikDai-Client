import { Volume2, VolumeX } from "lucide-react";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { KeyBoardSelector } from "@/features/typing/components/KeyBoardSelector";
import { TooltipHover } from "../../../components/TooltipHover";

export const DesktopTestSetting = () => {
  const { mode, soundEnabled, setSoundEnabled } = settingStore();

  return (
    <>
      <div className="py-2 text-sm gap-2 xl:flex hidden">
        {mode === "shan" && <KeyBoardSelector />}
        <span
          className={cn(
            "h-6 w-1 bg-primary/20 rounded-lg",
            mode === "eng" && "hidden"
          )}
        />
        <TooltipHover
          tooltipText={soundEnabled ? "ပိၵ်ႉသဵင်" : "ပိုတ်ႇသဵင်"}
          className="flex justify-center items-center"
        >
          <div
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center"
          >
            {soundEnabled ? (
              <div className="flex gap-2 items-center">
                <p className="text-base xl:flex hidden">Sound On</p>
                <Volume2 className="size-5 text-yellow" />
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <p className="text-base xl:flex hidden">Sound Off</p>
                <VolumeX className="size-5" />
              </div>
            )}
          </div>
        </TooltipHover>
      </div>
    </>
  );
};

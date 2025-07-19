import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { TimerSetting } from "./TimerSetting";
import { WordsSetting } from "./WordsSetting";
import { CustomSetting } from "./CustomSetting";
import { settingOptions } from "./DesktopTestSetting";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";
import { KeyBoardSelector } from "./KeyBoardSelector";

interface CustomTextDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileTestSettingDialog = ({
  isOpen,
  setIsOpen,
}: CustomTextDialogProps) => {
  const { mode, selectedSetting, setSelectedSetting } = settingStore();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-72 border-none bg-foreground rounded-lg flex flex-col justify-center gap-3 space-y-2">
        <DialogTitle className="text-center flex justify-center items-center gap-2">
          <Settings className="size-4" />
          <p className="text-sm ">Test Settings</p>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Customize your test settings here.
        </DialogDescription>

        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-70">Test Type</p>
          <div className="grid grid-cols-2 gap-3">
            {settingOptions.map((setting) => (
              <button
                key={setting.value}
                onClick={() => setSelectedSetting(setting.value as TestType)}
                className={cn(
                  "w-auto opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center gap-1",
                  selectedSetting === setting.value && "opacity-100 text-yellow"
                )}
              >
                {setting.icon}
                <p className="text-md font-secondary">{setting.name}</p>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-70">
            {selectedSetting === "time"
              ? "Time (seconds)"
              : selectedSetting === "words"
              ? "Word Count"
              : selectedSetting === "quote"
              ? "Quote"
              : "Custom Text"}
          </p>
          <div className="flex justify-between px-2">
            {selectedSetting === "time" && <TimerSetting />}
            {selectedSetting === "words" && <WordsSetting />}
            {selectedSetting === "custom" && <CustomSetting />}
          </div>
          {mode === "shan" && (
            <>
              <p className="text-sm opacity-70">Keyboard Layout</p>
              <KeyBoardSelector />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

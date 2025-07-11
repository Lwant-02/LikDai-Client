import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { TimerSetting } from "./TimerSetting";
import { WordsSetting } from "./WordsSetting";
import { CustomSetting } from "./CustomSetting";
import { settingOptions } from "./DesktopTestSetting";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Settings } from "lucide-react";

interface CustomTextDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const MobileTestSettingDialog = ({
  isOpen,
  setIsOpen,
}: CustomTextDialogProps) => {
  const { mode, selectedSetting, setSelectedSetting, setMode } = settingStore();

  const handleChangeMode = () => {
    if (mode === "eng") {
      setMode("shan");
    } else {
      setMode("eng");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-60 border-none bg-foreground rounded-lg flex flex-col justify-center gap-3 space-y-2">
        <DialogTitle className="text-center flex justify-center items-center gap-2">
          <Settings className="size-4" />
          <p className="text-sm ">Test Settings</p>
        </DialogTitle>
        <DialogDescription className="sr-only">
          Customize your test settings here.
        </DialogDescription>
        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-70">Language</p>
          <div className="flex gap-3 px-2">
            <button
              onClick={handleChangeMode}
              className={cn(
                "w-20 opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center gap-1",
                mode === "eng" && "opacity-100 text-yellow"
              )}
            >
              <img
                src="/images/UK-Flag.jpg"
                alt="uk-flag"
                className="size-4 rounded-full object-cover border border-foreground"
              />
              <p className="text-primary">English</p>
            </button>
            <button
              onClick={handleChangeMode}
              className={cn(
                "w-20 flex  items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
                mode === "shan" && "opacity-100 text-yellow"
              )}
            >
              <img
                src="/svg/Shan-Flag.svg"
                alt="shan-flag"
                className="size-4 rounded-full object-cover border border-foreground"
              />
              <p>Shan</p>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-sm opacity-70">Test Type</p>
          <div className="grid grid-cols-2 gap-3 px-2">
            {settingOptions.map((setting) => (
              <button
                key={setting.value}
                disabled={setting.value === "quote" && mode === "shan"}
                onClick={() => setSelectedSetting(setting.value as TestType)}
                className={cn(
                  "opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex items-center gap-1",
                  selectedSetting === setting.value &&
                    "opacity-100 text-yellow",
                  setting.name === "Quote" &&
                    mode === "shan" &&
                    "opacity-30 hover:opacity-30 pointer-events-none "
                )}
              >
                {setting.icon}
                <p>{setting.name}</p>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

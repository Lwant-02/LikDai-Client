import { Baseline, Quote, Timer, Wrench, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { TimerSetting } from "./TimerSetting";
import { WordsSetting } from "./WordsSetting";
import { CustomSetting } from "./CustomSetting";
import { settingStore } from "@/store/settingStore";
import { KeyBoardSelector } from "./KeyBoardSelector";
import { TooltipHover } from "./TooltipHover";

export const settingOptions = [
  {
    name: "ၶၢဝ်းယၢမ်း",
    value: "time",
    icon: <Timer className="size-4" />,
  },
  {
    name: "တူဝ်လိၵ်ႈ",
    value: "words",
    icon: <Baseline className="size-4" />,
  },
  {
    name: "ၵႂၢမ်းၵမ်းထုၵ်ႇ",
    value: "quote",
    icon: <Quote className="size-4 rotate-180" />,
  },
  {
    name: "တႅမ်ႈသႂ်ႇ",
    value: "custom",
    icon: <Wrench className="size-4" />,
  },
];

export const DesktopTestSetting = () => {
  const {
    mode,
    selectedSetting,
    setSelectedSetting,
    setUserInput,
    soundEnabled,
    setSoundEnabled,
  } = settingStore();

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="py-2 px-7 bg-foreground rounded-lg  text-sm gap-2 md:flex hidden"
      >
        {settingOptions.map((setting) => (
          <button
            key={setting.value}
            onClick={() => {
              setSelectedSetting(setting.value as TestType);
              setUserInput("");
            }}
            className={cn(
              "w-auto px-2 opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center gap-1",
              selectedSetting === setting.value && "opacity-100 text-yellow"
            )}
          >
            {setting.icon}
            <p className="text-sm font-secondary">{setting.name}</p>
          </button>
        ))}
        <span
          className={cn(
            "h-6 w-1 bg-primary/20 rounded-lg",
            selectedSetting === "quote" && mode === "shan" && "hidden"
          )}
        />
        {selectedSetting === "time" && <TimerSetting />}
        {selectedSetting === "words" && <WordsSetting />}
        {selectedSetting === "custom" && <CustomSetting />}
        {mode === "shan" && (
          <>
            <span className="h-6 w-1 bg-primary/20 rounded-lg mr-2" />
            <KeyBoardSelector />
          </>
        )}
        <span className="h-6 w-1 bg-primary/20 rounded-lg" />
        <TooltipHover
          tooltipText={soundEnabled ? "ပိၵ်ႉသဵင်" : "ပိုတ်ႇသဵင်"}
          className="flex justify-center items-center"
        >
          <div
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center"
          >
            {soundEnabled ? (
              <Volume2 className="size-5 text-yellow" />
            ) : (
              <VolumeX className="size-5" />
            )}
          </div>
        </TooltipHover>
      </motion.article>
    </>
  );
};

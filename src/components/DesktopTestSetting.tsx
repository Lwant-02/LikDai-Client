import { Baseline, Quote, Timer, Wrench } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { TimerSetting } from "./TimerSetting";
import { WordsSetting } from "./WordsSetting";
import { CustomSetting } from "./CustomSetting";
import { settingStore } from "@/store/settingStore";
import { KeyBoardSelector } from "./KeyBoardSelector";

export const settingOptions = [
  {
    name: "Time",
    value: "time",
    icon: <Timer className="size-4" />,
  },
  {
    name: "Words",
    value: "words",
    icon: <Baseline className="size-4" />,
  },
  {
    name: "Quote",
    value: "quote",
    icon: <Quote className="size-4 rotate-180" />,
  },
  {
    name: "Custom",
    value: "custom",
    icon: <Wrench className="size-4" />,
  },
];

export const DesktopTestSetting = () => {
  const { mode, selectedSetting, setSelectedSetting, setMode, setUserInput } =
    settingStore();

  const handleChangeMode = () => {
    if (mode === "eng") {
      setMode("shan");
      setUserInput("");
    } else {
      setMode("eng");
      setUserInput("");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="py-2 px-7 bg-foreground rounded-lg  text-sm gap-2 md:flex hidden"
    >
      <button
        onClick={handleChangeMode}
        className={cn(
          "w-20 flex justify-center items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
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
      <button
        onClick={handleChangeMode}
        className={cn(
          "w-20 opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center gap-1",
          mode === "eng" && "opacity-100 text-yellow"
        )}
      >
        <img
          src="/images/UK-Flag.jpg"
          alt="uk-flag"
          className="size-4 rounded-full object-cover border border-foreground"
        />
        <p>English</p>
      </button>
      <span className="h-6 w-1 bg-primary/20 rounded-lg" />
      {settingOptions.map((setting) => (
        <button
          key={setting.value}
          disabled={setting.value === "quote" && mode === "shan"}
          onClick={() => {
            setSelectedSetting(setting.value as TestType);
            setUserInput("");
          }}
          className={cn(
            "w-16 opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center gap-1",
            selectedSetting === setting.value && "opacity-100 text-yellow",
            setting.name === "Quote" &&
              mode === "shan" &&
              "opacity-30 hover:opacity-30 pointer-events-none "
          )}
        >
          {setting.icon}
          <p>{setting.name}</p>
        </button>
      ))}
      <span className="h-6 w-1 bg-primary/20 rounded-lg" />
      {selectedSetting === "time" && <TimerSetting />}
      {selectedSetting === "words" && <WordsSetting />}
      {selectedSetting === "custom" && <CustomSetting />}
      {mode === "shan" && (
        <>
          <span className="h-6 w-1 bg-primary/20 rounded-lg mr-2" />
          <KeyBoardSelector />
        </>
      )}
    </motion.article>
  );
};

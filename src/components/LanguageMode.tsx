import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { TooltipHover } from "./TooltipHover";
import { Globe } from "lucide-react";

export const LanguageMode = () => {
  const { mode, setMode, setUserInput } = settingStore();

  //Change mode
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
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="xl:flex hidden gap-3 mb-2 w-full justify-center items-center"
    >
      <div className="flex items-center gap-1">
        <Globe className="size-5 text-yellow" />
        <p className="w-auto opacity-70 text-center">Choose Language</p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <TooltipHover tooltipText="တႆး">
          <span
            onClick={handleChangeMode}
            className={cn(
              "w-auto flex justify-center items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
              mode === "shan" && "opacity-100 text-yellow"
            )}
          >
            <img
              src="/svg/Shan-Flag.svg"
              alt="shan-flag"
              className="size-5 rounded-full object-cover border border-foreground"
            />
          </span>
        </TooltipHover>
        <TooltipHover tooltipText="ဢိင်းၵလဵတ်ႈ">
          <span
            onClick={handleChangeMode}
            className={cn(
              "w-auto opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center gap-1",
              mode === "eng" && "opacity-100 text-yellow"
            )}
          >
            <img
              src="/images/UK-Flag.jpg"
              alt="uk-flag"
              className="size-5 rounded-full object-cover border border-foreground"
            />
          </span>
        </TooltipHover>
      </div>
    </motion.div>
  );
};

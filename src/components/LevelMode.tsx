import { CircleGauge } from "lucide-react";

import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

export const LevelMode = () => {
  const { level, setLevel, mode, setSelectedSetting } = settingStore();

  const getName = (level: Level) => {
    if (mode === "eng") {
      if (level === "easy") {
        return "Easy";
      } else {
        return "Hard";
      }
    } else {
      if (level === "easy") {
        return "ငၢႆႈ";
      } else {
        return "ယၢပ်ႇ";
      }
    }
  };

  return (
    <div className="xl:flex hidden gap-3 mb-2 w-auto  justify-center items-center">
      <div className="flex items-center gap-1">
        <CircleGauge className="size-5 text-yellow" />
        <p
          className={cn(
            "w-auto opacity-70 text-center",
            mode === "shan" && "font-secondary"
          )}
        >
          {mode === "eng" ? "Choose Level" : "လိူၵ်ႈၸၼ်ႉ"}
        </p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <span
          onClick={() => {
            setLevel("easy");
            setSelectedSetting("time");
          }}
          className={cn(
            "w-auto flex justify-center items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
            level === "easy" && "opacity-100 text-yellow",
            mode === "shan" && "font-secondary"
          )}
        >
          {getName("easy")}
        </span>

        <span
          onClick={() => setLevel("hard")}
          className={cn(
            "w-auto opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer flex justify-center items-center gap-1",
            level === "hard" && "opacity-100 text-yellow",
            mode === "shan" && "font-secondary"
          )}
        >
          {getName("hard")}
        </span>
      </div>
    </div>
  );
};

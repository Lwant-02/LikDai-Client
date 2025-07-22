import { KeyMaps } from "@/keymaps/KeyMaps";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { TooltipHover } from "./TooltipHover";

export const KeyBoardSelector = () => {
  const { selectedKeyMap, setSelectedKeyMap, mode } = settingStore();
  return (
    <div
      className={cn(
        "grid gap-4",
        mode === "eng" ? "grid-cols-1" : "grid-cols-4"
      )}
    >
      {Object.entries(KeyMaps).map(([key, value]) => {
        if (key === "english") return null;
        return (
          <TooltipHover tooltipText={`လွၵ်းမိုဝ်း ${value.name}`} key={key}>
            <div
              onClick={() => setSelectedKeyMap(key as KeyMapNames)}
              className={cn(
                "w-auto opacity-50 font-secondary hover:opacity-100 transition-opacity duration-200 cursor-pointer",
                selectedKeyMap === key && "opacity-100 text-yellow"
              )}
            >
              {value.name}
            </div>
          </TooltipHover>
        );
      })}
    </div>
  );
};

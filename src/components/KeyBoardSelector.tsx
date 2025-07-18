import { KeyMaps } from "@/keymaps/KeyMaps";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

export const KeyBoardSelector = () => {
  const { selectedKeyMap, setSelectedKeyMap } = settingStore();
  return (
    <div className="grid gap-4 md:grid-cols-4 grid-cols-2">
      {Object.entries(KeyMaps).map(([key, value]) => (
        <button
          key={key}
          onClick={() => setSelectedKeyMap(key as KeyMapNames)}
          className={cn(
            "w-auto opacity-50 font-secondary  hover:opacity-100 transition-opacity duration-200 cursor-pointer ",
            selectedKeyMap === key && "opacity-100 text-yellow",
            key === "english" && "hidden"
          )}
        >
          {value.name}
        </button>
      ))}
    </div>
  );
};

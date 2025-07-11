import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

const wordsOptions = [
  {
    name: "30",
    value: 30,
  },
  {
    name: "50",
    value: 50,
  },
  {
    name: "80",
    value: 80,
  },
  {
    name: "100",
    value: 100,
  },
];

export const WordsSetting = () => {
  const { selectedWords, setSelectedWords } = settingStore();

  return (
    <>
      {wordsOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => setSelectedWords(option.value)}
          className={cn(
            "w-8 opacity-50  hover:opacity-100 transition-opacity duration-200 cursor-pointer",
            selectedWords === option.value && "opacity-100 text-yellow"
          )}
        >
          {option.name}
        </button>
      ))}
    </>
  );
};

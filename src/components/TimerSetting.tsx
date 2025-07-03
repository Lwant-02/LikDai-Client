import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

const timerOptions = [
  {
    name: "15",
    value: 15,
  },
  {
    name: "30",
    value: 30,
  },
  {
    name: "60",
    value: 60,
  },
  {
    name: "120",
    value: 120,
  },
];

export const TimerSetting = () => {
  const { selectedTimer, setSelectedTimer } = settingStore();

  return (
    <>
      {timerOptions.map((option) => (
        <button
          key={option.name}
          onClick={() => setSelectedTimer(option.value)}
          className={cn(
            "w-8 opacity-50 hover:opacity-100 transition-opacity duration-200 cursor-pointer",
            selectedTimer === option.value && "opacity-100 text-yellow"
          )}
        >
          {option.name}
        </button>
      ))}
    </>
  );
};

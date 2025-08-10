import { BookOpen, Target, Star, Quote, Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { getProperTitle } from "@/pages/LessonsPage";

const Levels = [
  {
    title: "beginner",
    description: "Start your typing journey",
    icon: <BookOpen className="size-6" />,
    color: "text-green",
    gradient: "from-green/20 to-green/30",
  },
  {
    title: "intermediate",
    description: "Improve your skills",
    icon: <Target className="size-6" />,
    color: "text-blue",
    gradient: "from-blue/20 to-blue/30",
  },
  {
    title: "advanced",
    description: "Master typing challenges",
    icon: <Star className="size-6" />,
    color: "text-purple",
    gradient: "from-purple/20 to-purple/30",
  },
  {
    title: "quotes",
    description: "Type inspiring quotes",
    icon: <Quote className="size-6" />,
    color: "text-orange",
    gradient: "from-orange/20 to-orange/30",
  },
  {
    title: "music",
    description: "Type along to music",
    icon: <Music className="size-6" />,
    color: "text-yellow",
    gradient: "from-yellow/20 to-yellow/30",
  },
];

export const LevelCard = () => {
  const { lessonLevel, setLessonLevel, mode } = settingStore();

  const getProperDescription = (level: LessonLevel): string => {
    switch (level) {
      case "beginner":
        return mode === "eng"
          ? "Start your typing journey"
          : "တႄႇၶၢဝ်းတၢင်းပေႃႉလိၵ်ႈ";
      case "intermediate":
        return mode === "eng"
          ? "Improve your skills"
          : "ယုၵ်ႉမုၼ်းၼမ်ႉၵတ်ႉၸဝ်ႈၵဝ်ႇ";
      case "advanced":
        return mode === "eng"
          ? "Master typing challenges"
          : "လွင်ႈၶဵင်ႇတႃႉ မေႃပေႃႉလိၵ်ႈ";
      case "quotes":
        return mode === "eng"
          ? "Type inspiring quotes"
          : "ပေႃႉၵႂၢမ်းပၼ်ႁႅင်းၸႂ်";
      case "music":
        return mode === "eng" ? "Type along to music" : "ပေႃႉၸွမ်းၽဵင်းၵႂၢမ်း";
      default:
        return mode === "eng"
          ? "Start your typing journey"
          : "တႄႇၶၢဝ်းတၢင်းပေႃႉလိၵ်ႈ";
    }
  };
  return (
    <div className="flex overflow-x-auto w-full xl:justify-center items-center justify-start  gap-2 ">
      {Levels.map((level) => (
        <Button
          key={level.title}
          variant="ghost"
          className={cn(
            "flex items-center gap-2 px-4 py-11 w-44 rounded-lg cursor-pointer",
            lessonLevel === level.title
              ? `bg-foreground ${level.color}`
              : "hover:bg-foreground/50"
          )}
          onClick={() => setLessonLevel(level.title as LessonLevel)}
        >
          <span className="flex flex-col items-center">
            {level.icon}
            <span
              className={cn(
                "text-base font-bold capitalize",
                mode === "shan" && "font-secondary"
              )}
            >
              {getProperTitle(level.title as LessonLevel, mode)}
            </span>
            <span
              className={cn(
                "text-sm opacity-70",
                mode === "shan" && "font-secondary"
              )}
            >
              {getProperDescription(level.title as LessonLevel)}
            </span>
          </span>
        </Button>
      ))}
    </div>
  );
};

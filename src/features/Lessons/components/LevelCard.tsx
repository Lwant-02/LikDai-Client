import { BookOpen, Target, Star, Quote, Music } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";

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
  const { lessonLevel, setLessonLevel } = settingStore();
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
            <span className="text-base font-bold capitalize">
              {level.title}
            </span>
            <span className="text-sm opacity-70">{level.description}</span>
          </span>
        </Button>
      ))}
    </div>
  );
};

import { cn } from "@/lib/utils";
import { formatJoinedDate } from "@/util/formatJoinedDate";

interface ProfileAchievementProps {
  category: AchievementCategory;
  name: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt: string | Date | undefined;
}

const getIcon = (category: string) => {
  switch (category) {
    case "speed":
      return "/svg/speed.svg";
    case "accuracy":
      return "/svg/accuracy.svg";
    case "consistency":
      return "/svg/consistency.svg";
    case "practice":
      return "/svg/practice.svg";
    case "certificate":
      return "/svg/certificate.svg";
  }
};

export const ProfileAchievement = ({
  name,
  requirement,
  unlocked,
  category,
  unlockedAt,
}: ProfileAchievementProps) => {
  console.log(category);

  return (
    <div
      className={cn(
        "p-4 rounded-lg border ",
        unlocked
          ? "border-yellow bg-yellow/10"
          : "border-primary/20 bg-foreground/20 opacity-60"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={`rounded-full shrink-0 flex justify-center items-center  w-10 h-10 ${
            unlocked ? "bg-yellow/20" : "bg-foreground/30"
          }`}
        >
          <img
            src={getIcon(category)}
            alt="Logo"
            className="size-6 object-cover"
          />
        </div>
        <div className=" w-full">
          <h3 className="font-bold">{name}</h3>
          <p className="text-sm opacity-70">{requirement}</p>
        </div>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs opacity-70">
          Unlocked at:{" "}
          {unlockedAt ? formatJoinedDate(unlockedAt as string) : "N/A"}
        </span>
        <span
          className={`text-xs ${unlocked ? "text-green" : "text-primary/50"}`}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
    </div>
  );
};

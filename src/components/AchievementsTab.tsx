import { cn } from "@/lib/utils";
import { Award } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Achievement {
  name: string;
  description: string;
  unlocked: boolean;
}

export const AchievementsTab = ({
  achievements,
}: {
  achievements: Achievement[];
}) => {
  const { pathname } = useLocation();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {pathname.endsWith("/account")
          ? "Your Achievements"
          : "User's Achievements"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg border ",
              achievement.unlocked
                ? "border-yellow bg-yellow/10"
                : "border-primary/20 bg-foreground/20 opacity-60"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-full ${
                  achievement.unlocked ? "bg-yellow/20" : "bg-foreground/30"
                }`}
              >
                <Award
                  className={`size-5 ${
                    achievement.unlocked ? "text-yellow" : "text-primary/50"
                  }`}
                />
              </div>
              <div>
                <h3 className="font-bold">{achievement.name}</h3>
                <p className="text-sm opacity-70">{achievement.description}</p>
              </div>
            </div>
            <div className="mt-2 text-right">
              <span
                className={`text-xs ${
                  achievement.unlocked ? "text-green" : "text-primary/50"
                }`}
              >
                {achievement.unlocked ? "Unlocked" : "Locked"}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-4 bg-foreground/20 rounded-lg">
        <h3 className="font-semibold mb-2">Achievement Progress</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-foreground/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue via-green to-yellow"></div>
          </div>
          <span className="text-sm font-medium">50%</span>
        </div>
        <p className="text-xs opacity-70 mt-2">
          You've unlocked 2 of 4 achievements. Keep practicing to unlock more!
        </p>
      </div>
    </div>
  );
};

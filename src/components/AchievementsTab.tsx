import { useLocation } from "react-router-dom";
import { Achievement } from "./Achievement";
import { useGetAchievements } from "@/hooks/useUser";

export const AchievementsTab = () => {
  const { achievements, isFetchingAchievements } = useGetAchievements();
  const { pathname } = useLocation();
  const allAchievements = achievements?.allAchievements.length;
  const unlockedAchievements = achievements?.unlockedAchievements.length;
  const progress = (unlockedAchievements! / allAchievements!) * 100;

  if (isFetchingAchievements) {
    return (
      <div className="w-full h-96  flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {pathname.endsWith("/account")
          ? "Your Achievements"
          : "User's Achievements"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievements?.allAchievements.map((achievement) => {
          const unlocked = achievements?.unlockedAchievements.some(
            (unlockedAchievement) =>
              unlockedAchievement.achievementId === achievement.id
          );
          const unlockedAt = achievements?.unlockedAchievements.find(
            (unlockedAchievement) =>
              unlockedAchievement.achievementId === achievement.id
          )?.unlockedAt;

          return (
            <Achievement
              key={achievement.id}
              name={achievement.name}
              requirement={achievement.requirement}
              unlocked={unlocked}
              unlockedAt={unlockedAt}
              isCertificateSubmitted={achievements?.isSubmitted}
              category={achievement.category}
            />
          );
        })}
      </div>
      <div className="mt-4 p-4 bg-foreground/40 rounded-lg">
        <h3 className="font-semibold mb-2">Achievement Progress</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-foreground/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue via-green to-yellow"></div>
          </div>
          <span className="text-sm font-medium">{progress}%</span>
        </div>
        {unlockedAchievements! === allAchievements ? (
          <p className="text-sm font-medium text-green mt-2">
            Congratulation! 🥳 You have unlocked all the achievements!
          </p>
        ) : (
          <p className="text-xs opacity-70 mt-2">
            You've unlocked {unlockedAchievements} of {allAchievements}{" "}
            achievements. Keep practicing to unlock more!
          </p>
        )}
      </div>
    </div>
  );
};

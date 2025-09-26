import { useNextUpdateTimer } from "@/hooks/useNextUpdatetTimer";
import { Clock, Trophy } from "lucide-react";
import { useTranslation } from "react-i18next";

export const LeaderboardHeader = ({
  isLeaderboardhas,
}: {
  isLeaderboardhas: boolean;
}) => {
  const { t } = useTranslation();
  const { timeRemaining } = useNextUpdateTimer();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Trophy className="size-7 sm:size-8 text-yellow" />
        <h1 className="text-2xl sm:text-3xl font-bold">
          {t("leaderboard_page.title")}
        </h1>
      </div>
      {isLeaderboardhas && (
        <div className="flex items-center gap-2  py-1 rounded-md self-start sm:self-auto">
          <Clock className="size-4 text-yellow" />
          <span className="text-sm">Next update: {timeRemaining}</span>
        </div>
      )}
    </div>
  );
};

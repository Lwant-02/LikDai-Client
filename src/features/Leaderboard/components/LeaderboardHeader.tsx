import { Clock, Trophy } from "lucide-react";

import { LEADERBOARD_CONTENT } from "@/content/leaderboard.content";
import { useNextUpdateTimer } from "@/hooks/useNextUpdatetTimer";

export const LeaderboardHeader = ({
  isLeaderboardhas,
}: {
  isLeaderboardhas: boolean;
}) => {
  const { timeRemaining } = useNextUpdateTimer();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <Trophy className="size-7 sm:size-10 text-yellow" />
        <h1 className="text-3xl sm:text-4xl font-bold pt-1">
          {LEADERBOARD_CONTENT.header.title}
        </h1>
      </div>
      {isLeaderboardhas && (
        <div className="flex items-center gap-2  py-1 rounded-md self-start sm:self-auto">
          <Clock className="size-4 text-yellow" />
          <span className="text-sm">
            {LEADERBOARD_CONTENT.nextUpdate} : {timeRemaining}
          </span>
        </div>
      )}
    </div>
  );
};

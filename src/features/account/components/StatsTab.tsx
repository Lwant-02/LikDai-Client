import { useLocation } from "react-router-dom";

import { useGetStats } from "@/hooks/useUser";
import { roundNumber } from "@/util/formatNumber";
import { formatTotalPracticeTime } from "@/util/formatTotalTimePractice";
import { ACCOUNT_STATS_CONTENT } from "@/content/account.content";

export const StatsTab = () => {
  const { isFetchingStats, stats } = useGetStats();
  const { pathname } = useLocation();

  if (isFetchingStats) {
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
          ? ACCOUNT_STATS_CONTENT.statsTitle
          : ACCOUNT_STATS_CONTENT.publicStats}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-foreground/80 p-4 rounded-3xl text-center">
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_STATS_CONTENT.avgWpm}
          </p>
          <p className="text-2xl font-bold text-blue">
            {stats?.averageWpm || 0}
          </p>
        </div>
        <div className="bg-foreground/80 p-4 rounded-3xl text-center">
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_STATS_CONTENT.bestWpm}
          </p>
          <p className="text-2xl font-bold text-green">{stats?.bestWpm || 0}</p>
        </div>
        <div className="bg-foreground/80 p-4 rounded-3xl text-center">
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_STATS_CONTENT.avgAccuracy}
          </p>
          <p className="text-2xl font-bold text-yellow">
            {stats?.averageAccuracy || 0}%
          </p>
        </div>
        <div className="bg-foreground/80 p-4 rounded-3xl text-center">
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_STATS_CONTENT.totalTests}
          </p>
          <p className="text-2xl font-bold text-purple">
            {stats?.testsCompleted || 0}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {ACCOUNT_STATS_CONTENT.practiceTime}
        </h3>
        <div className="bg-foreground/80 p-4 rounded-3xl">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-70">
              {ACCOUNT_STATS_CONTENT.totalTimePracticed}
            </p>
            <p className="font-bold text-yellow">
              {formatTotalPracticeTime(stats?.totalTimePracticed!) || 0}
            </p>
          </div>
          <div className="mt-4 h-4 bg-foreground/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue to-green" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">
          {ACCOUNT_STATS_CONTENT.languageDistribution}
        </h3>
        <div className="bg-foreground/80 p-4 rounded-3xl flex items-center gap-6 md:flex-row flex-col">
          <div className="md:flex-1 w-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">{ACCOUNT_STATS_CONTENT.shan}</p>
              <p className="text-sm font-medium">
                {roundNumber(stats?.shanDistribution!) || 0}%
              </p>
            </div>
            <div className="h-3 bg-foreground/30 rounded-full overflow-hidden">
              <div className="h-full bg-yellow" />
            </div>
          </div>
          <div className="md:flex-1 w-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">{ACCOUNT_STATS_CONTENT.eng}</p>
              <p className="text-sm font-medium">
                {roundNumber(stats?.engDistribution!) || 0}%
              </p>
            </div>
            <div className="h-3 bg-foreground/30 rounded-full overflow-hidden">
              <div className="h-full bg-blue" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

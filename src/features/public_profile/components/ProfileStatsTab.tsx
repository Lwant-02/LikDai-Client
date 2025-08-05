import { useGetPublicStats } from "@/hooks/useProfile";
import { roundNumber } from "@/util/formatNumber";
import { formatTotalPracticeTime } from "@/util/formatTotalTimePractice";

interface ProfileStatsTabProps {
  username: string;
}

export const ProfileStatsTab = ({ username }: ProfileStatsTabProps) => {
  const { isFetchingStats, stats } = useGetPublicStats({ username });

  if (isFetchingStats) {
    return (
      <div className="w-full h-96  flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">User's Typing Statistics</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-foreground/40 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Average WPM</p>
          <p className="text-2xl font-bold text-blue">
            {stats?.averageWpm || 0}
          </p>
        </div>
        <div className="bg-foreground/40 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Best WPM</p>
          <p className="text-2xl font-bold text-green">{stats?.bestWpm || 0}</p>
        </div>
        <div className="bg-foreground/40 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Average Accuracy</p>
          <p className="text-2xl font-bold text-yellow">
            {stats?.averageAccuracy || 0}%
          </p>
        </div>
        <div className="bg-foreground/40 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Tests Completed</p>
          <p className="text-2xl font-bold text-purple">
            {stats?.testsCompleted || 0}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Practice Time</h3>
        <div className="bg-foreground/40 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-70">Total Time Practiced</p>
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
        <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
        <div className="bg-foreground/40 p-4 rounded-lg flex items-center gap-6 md:flex-row flex-col">
          <div className="md:flex-1 w-full">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">Shan</p>
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
              <p className="text-sm">English</p>
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

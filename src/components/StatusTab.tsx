import { useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

interface StatusTabProps {
  stats: {
    averageWpm: number;
    bestWpm: number;
    averageAccuracy: number;
    testsCompleted: number;
    totalTimePracticed: string;
  };
}

export const StatusTab = ({ stats }: StatusTabProps) => {
  const { pathname } = useLocation();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {pathname.endsWith("/account")
          ? "Your Typing Statistics"
          : "User's Typing Statistics"}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-foreground/20 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Average WPM</p>
          <p className="text-2xl font-bold text-blue">{stats.averageWpm}</p>
        </div>
        <div className="bg-foreground/20 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Best WPM</p>
          <p className="text-2xl font-bold text-green">{stats.bestWpm}</p>
        </div>
        <div className="bg-foreground/20 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Avg. Accuracy</p>
          <p className="text-2xl font-bold text-yellow">
            {stats.averageAccuracy}%
          </p>
        </div>
        <div className="bg-foreground/20 p-4 rounded-lg text-center">
          <p className="text-sm opacity-70 mb-1">Tests Completed</p>
          <p className="text-2xl font-bold text-purple">
            {stats.testsCompleted}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Practice Time</h3>
        <div className="bg-foreground/20 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-sm opacity-70">Total Time Practiced</p>
            <p className="font-bold text-yellow">{stats.totalTimePracticed}</p>
          </div>
          <div className="mt-4 h-4 bg-foreground/30 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue to-green"></div>
          </div>
          <p className="text-xs opacity-70 mt-2 text-right">
            65% to next achievement
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Language Distribution</h3>
        <div className="bg-foreground/20 p-4 rounded-lg flex items-center">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">English</p>
              <p className="text-sm font-medium">75%</p>
            </div>
            <div className="h-3 bg-foreground/30 rounded-full overflow-hidden">
              <div className="h-full bg-blue"></div>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-4 h-12 opacity-30" />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm">Shan</p>
              <p className="text-sm font-medium">25%</p>
            </div>
            <div className="h-3 bg-foreground/30 rounded-full overflow-hidden">
              <div className="h-full bg-yellow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

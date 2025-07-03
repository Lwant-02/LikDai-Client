import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Clock, BarChart2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { formatName } from "@/util/formatName";

interface LeaderboardTableProps {
  leaderboardData: LeaderboardEntry[];
  currentPage: number;
  entriesPerPage: number;
}

export const LeaderboardTable = ({
  leaderboardData,
  currentPage,
  entriesPerPage,
}: LeaderboardTableProps) => {
  const getCurrentEntries = () => {
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    return leaderboardData.slice(startIndex, endIndex);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full bg-foreground/5 rounded-lg overflow-hidden"
    >
      {/* Table header - Responsive grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 py-3 px-4 bg-foreground/10 text-xs sm:text-sm font-medium">
        <div className="col-span-2 flex items-center gap-2">
          <Users className="size-4 opacity-70" />
          <span>User</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="size-4 opacity-70" />
          <span>WPM</span>
        </div>
        <div className="hidden sm:block">Accuracy</div>
        <div className="hidden md:block">Raw</div>
        <div className="hidden md:block">Consistency</div>
        <div className="flex items-center gap-2">
          <Clock className="size-4 opacity-70 hidden sm:inline" />
          <span>Tests</span>
        </div>
      </div>
      <Separator />

      {/* Table rows - Responsive grid */}
      {getCurrentEntries().map((entry, index) => {
        return (
          <div key={index}>
            <div
              className={cn(
                "grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 py-3 px-4 text-xs sm:text-sm hover:bg-foreground/10 transition-colors",
                entry.rank === 1 && "bg-yellow/15",
                entry.rank === 2 && "bg-blue/15",
                entry.rank === 3 && "bg-green/15"
              )}
            >
              <div className="col-span-2 flex items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "w-5 sm:w-6 text-center font-medium",
                    entry.rank === 1
                      ? "text-yellow"
                      : entry.rank === 2
                      ? "text-blue"
                      : entry.rank === 3
                      ? "text-green"
                      : "opacity-70"
                  )}
                >
                  {entry.rank}
                </span>
                <div className="flex justify-center items-center gap-2">
                  <div className="size-6 rounded-full border-1 border-yellow flex justify-center items-center ">
                    <p className="text-xs font-bold text-yellow">
                      {formatName(entry.username)}
                    </p>
                  </div>
                  <Link
                    to={`/profile/${entry.username}`}
                    className="font-medium truncate"
                  >
                    {entry.username}
                  </Link>
                </div>
              </div>
              <div className="font-medium">{entry.wpm}</div>
              <div className="hidden sm:block">{entry.accuracy}%</div>
              <div className="hidden md:block">{entry.raw}</div>
              <div className="hidden md:block">{entry.consistency}%</div>
              <div>{entry.tests}</div>
            </div>
            {index < getCurrentEntries().length - 1 && <Separator />}
          </div>
        );
      })}
    </motion.div>
  );
};

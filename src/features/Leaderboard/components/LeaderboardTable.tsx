import { motion } from "framer-motion";
import { BarChart2, Users, Crown } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { formatName } from "@/util/formatName";
import { formatJoinedDate } from "@/util/formatJoinedDate";

interface LeaderboardTableProps {
  leaderboardData: LeaderboardEntry[];
}

export const LeaderboardTable = ({
  leaderboardData,
}: LeaderboardTableProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full bg-foreground/5 rounded-lg overflow-hidden"
    >
      {/* Table header - Responsive grid */}
      <div className="grid grid-cols-4 xl:grid-cols-9 py-3 px-4 bg-foreground/10 text-xs sm:text-sm font-medium">
        <div className="col-span-2 flex items-center gap-2">
          <Users className="size-4 opacity-70" />
          <span>User</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="size-4 opacity-70" />
          <span>WPM</span>
        </div>
        <div className="hidden sm:flex">Accuracy</div>
        <div className="hidden md:flex">Raw</div>
        <div className="hidden md:flex">Consistency</div>
        <div className="flex">Tests</div>
        <div className="hidden sm:flex">Level</div>
        <div className="hidden md:flex">Date</div>
      </div>
      <Separator />

      {/* Table rows - Responsive grid */}
      {leaderboardData.map((entry, index) => {
        return (
          <div key={index}>
            <div
              className={cn(
                "grid grid-cols-4 justify-center items-center  xl:grid-cols-9 py-3 px-4 text-xs sm:text-sm hover:bg-foreground/10 transition-colors",
                entry.rank === 1 && "bg-yellow/10",
                entry.rank === 2 && "bg-blue/10",
                entry.rank === 3 && "bg-green/10"
              )}
            >
              <div className="col-span-2 flex items-center gap-2 sm:gap-3">
                <span
                  className={cn(
                    "w-5 sm:w-6 text-center font-medium ",
                    entry.rank === 1
                      ? "text-yellow"
                      : entry.rank === 2
                      ? "text-blue"
                      : entry.rank === 3
                      ? "text-green"
                      : "opacity-70"
                  )}
                >
                  {entry.rank === 1 ? (
                    <Crown className="size-5 " />
                  ) : (
                    entry.rank
                  )}
                </span>
                <div className="flex justify-center items-center gap-2">
                  <div className="size-7 rounded-full border-1 border-yellow flex justify-center items-center ">
                    <p className="text-xs font-bold text-yellow">
                      {formatName(entry.user.username)}
                    </p>
                  </div>
                  <Link
                    to={`/profile/${entry.user.username}`}
                    className="font-medium truncate"
                  >
                    {entry.user.username}
                  </Link>
                </div>
              </div>
              <div className="font-medium">{entry.wpm}</div>
              <div className="hidden sm:block">{entry.accuracy}%</div>
              <div className="hidden md:block">{entry.raw}</div>
              <div className="hidden md:block">{entry.consistency}%</div>
              <div>{entry.tests_completed}</div>
              <div className="hidden md:block capitalize">
                {entry.lessonLevel}
              </div>
              <div className="hidden sm:block">
                {formatJoinedDate(entry.updatedAt)}
              </div>
            </div>
            <Separator />
          </div>
        );
      })}
    </motion.div>
  );
};

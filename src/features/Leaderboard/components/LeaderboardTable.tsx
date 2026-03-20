import { motion } from "framer-motion";
import { BarChart2, Users, Crown } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { formatName } from "@/util/formatName";
import { formatJoinedDate } from "@/util/formatJoinedDate";
import { LEADERBOARD_CONTENT } from "@/content/leaderboard.content";

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
      className="w-full bg-background/80 rounded-3xl border border-primary/20 overflow-hidden"
    >
      {/* Table header - Responsive grid */}
      <div className="grid grid-cols-4 xl:grid-cols-8 py-4 px-4 bg-foreground/10 text-xs sm:text-sm font-medium">
        <div className="col-span-2 flex items-center gap-2">
          <Users className="size-4 opacity-70" />
          <span>{LEADERBOARD_CONTENT.table.user}</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart2 className="size-4 opacity-70" />
          <span>{LEADERBOARD_CONTENT.table.wpm}</span>
        </div>
        <div className="hidden sm:flex">
          {LEADERBOARD_CONTENT.table.accuracy}
        </div>
        <div className="hidden md:flex">{LEADERBOARD_CONTENT.table.raw}</div>
        <div className="hidden md:flex">
          {LEADERBOARD_CONTENT.table.consistency}
        </div>
        <div className="flex">{LEADERBOARD_CONTENT.table.test}</div>
        <div className="hidden md:flex">{LEADERBOARD_CONTENT.table.date}</div>
      </div>
      <Separator />

      {/* Table rows - Responsive grid */}
      {leaderboardData.map((entry, index) => {
        return (
          <div key={index}>
            <div
              className={cn(
                "grid grid-cols-4 justify-center items-center  xl:grid-cols-8 py-3 px-4 text-xs sm:text-sm hover:bg-foreground/10 transition-colors",
                entry.rank === 1 && "bg-yellow/10",
                entry.rank === 2 && "bg-blue/10",
                entry.rank === 3 && "bg-green/10",
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
                          : "opacity-70",
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
                    <p className="text-xs font-bold text-yellow text-center">
                      {formatName(entry.user.username)}
                    </p>
                  </div>
                  <Link
                    to={`/profile/${entry.user.username}`}
                    className="font-medium truncate max-w-sm"
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

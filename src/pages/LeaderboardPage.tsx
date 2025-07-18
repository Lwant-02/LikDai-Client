import { useState, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useTitle } from "@/hook/useTitle";
import { LeaderboardPagination } from "@/components/LeaderboardPagination";
import { LeaderboardHeader } from "@/components/LeaderboardHeader";
import { LeaderboardFilter } from "@/components/LeaderboardFilter";
import { LeaderboardTable } from "@/components/LeaderboardTable";
import { useGetLeaderboard } from "@/hook/useLeaderboard";
import { Spinner } from "@/components/Spinner";

export const LeaderboardPage = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "shan";
  const total = searchParams.get("total") || "10";
  const page = searchParams.get("page") || "1";
  const { leaderboard, isFetchingLeaderboard } = useGetLeaderboard({
    mode,
    total,
    page,
  });
  useTitle({ pathName: pathname });
  const isLeaderboardhas = leaderboard.leaderboard.length > 0;

  // State for filters
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>("shan");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  //Leaderboard with rank
  const leaderboardWithRank: LeaderboardEntry[] = leaderboard.leaderboard.map(
    (entry, index) => ({
      ...entry,
      rank: index + 1,
    })
  );

  // Reset page when changing language filter
  useEffect(() => {
    setCurrentPage(1);
  }, [languageFilter]);

  // Update search params
  useEffect(() => {
    const hasMode = searchParams.has("mode");
    const hasTotal = searchParams.has("total");
    const hasPage = searchParams.has("page");

    if (!hasMode || !hasTotal || !hasPage) {
      setSearchParams({ mode, total, page });
    } else {
      setSearchParams({
        mode: languageFilter,
        total,
        page: currentPage.toString(),
      });
    }
  }, [mode, total, page, searchParams, languageFilter, currentPage]);

  return (
    <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        {/* Header - Responsive layout */}
        <LeaderboardHeader isLeaderboardhas={isLeaderboardhas} />

        {/* Filters - Responsive layout */}
        <LeaderboardFilter
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
        />

        <p className="md:text-2xl text-xl font-bolds mb-3">
          {languageFilter === "eng" ? "English" : "Shan"} All Time
        </p>

        {isFetchingLeaderboard ? (
          <div className="w-full flex justify-center items-center h-52">
            <Spinner size={14} />
          </div>
        ) : (
          <>
            {leaderboard.leaderboard.length > 0 ? (
              <>
                {/* Leaderboard table - Responsive layout */}
                <LeaderboardTable leaderboardData={leaderboardWithRank} />

                {/* Pagination - Responsive layout */}
                <LeaderboardPagination
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={leaderboard.totalPages}
                />

                {/* Info text */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-4 text-xs sm:text-sm text-center mb-20"
                >
                  Leaderboards are updated every 15 minutes. Only verified
                  accounts are displayed.
                </motion.p>
              </>
            ) : (
              <div className="w-full flex justify-center items-center h-52">
                <p className="text-center text-lg opacity-70">
                  Currently, there are no leaderboards to display.
                </p>
              </div>
            )}
          </>
        )}
      </motion.div>
    </article>
  );
};

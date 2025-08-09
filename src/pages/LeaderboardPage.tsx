import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { LeaderboardPagination } from "@/features/Leaderboard/components/LeaderboardPagination";
import { LeaderboardHeader } from "@/features/Leaderboard/components/LeaderboardHeader";
import { LeaderboardFilter } from "@/features/Leaderboard/components/LeaderboardFilter";
import { LeaderboardTable } from "@/features/Leaderboard/components/LeaderboardTable";
import { useGetLeaderboard } from "@/hooks/useLeaderboard";
import { Spinner } from "@/components/Spinner";

export const LeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "shan";
  const total = searchParams.get("total") || "10";
  const page = searchParams.get("page") || "1";
  const level = searchParams.get("level") || "beginner";
  const { leaderboard, isFetchingLeaderboard } = useGetLeaderboard({
    mode,
    total,
    page,
    level,
  });
  const isLeaderboardhas = leaderboard.leaderboard.length > 0;

  // State for filters
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>("shan");
  const [lessonLevelFilter, setLessonLevelFilter] =
    useState<LessonLevel>("beginner");

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
    const hasLevel = searchParams.has("level");

    if (!hasMode || !hasTotal || !hasPage || !hasLevel) {
      setSearchParams({ mode, total, page, level });
    } else {
      setSearchParams({
        mode: languageFilter,
        total,
        page: currentPage.toString(),
        level: lessonLevelFilter,
      });
    }
  }, [
    mode,
    total,
    page,
    searchParams,
    languageFilter,
    currentPage,
    lessonLevelFilter,
  ]);

  return (
    <>
      <Helmet>
        <title>Leaderboards | LikDai</title>
        <meta
          name="description"
          content="Compete with others and see how you rank on the leaderboard."
        />
      </Helmet>
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
            lessonLevelFilter={lessonLevelFilter}
            setLessonLevelFilter={setLessonLevelFilter}
            languageFilter={languageFilter}
            setLanguageFilter={setLanguageFilter}
          />

          <p className="md:text-2xl text-xl font-bolds mb-3">
            {languageFilter === "eng" ? "English" : "Shan"} All Time
          </p>

          {isFetchingLeaderboard ? (
            <div className="w-full flex justify-center items-center h-52">
              <Spinner />
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
    </>
  );
};

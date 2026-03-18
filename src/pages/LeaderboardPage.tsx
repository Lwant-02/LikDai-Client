import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

import { LeaderboardPagination } from "@/features/Leaderboard/components/LeaderboardPagination";
import { LeaderboardHeader } from "@/features/Leaderboard/components/LeaderboardHeader";
import { LeaderboardFilter } from "@/features/Leaderboard/components/LeaderboardFilter";
import { LeaderboardTable } from "@/features/Leaderboard/components/LeaderboardTable";
import { useGetLeaderboard } from "@/hooks/useLeaderboard";
import { Spinner } from "@/components/Spinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const LeaderboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const mode = searchParams.get("mode") || "shan";
  const total = searchParams.get("total") || "10";
  const page = searchParams.get("page") || "1";
  const level = searchParams.get("level") || "beginner";
  const { leaderboard, isFetchingLeaderboard } = useGetLeaderboard({
    mode,
    total,
    page,
  });
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
    }),
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
      setSearchParams({ mode, total, page, level });
    } else {
      setSearchParams({
        mode: languageFilter,
        total,
        page: currentPage.toString(),
      });
    }
  }, [mode, total, page, searchParams, languageFilter, currentPage]);

  return (
    <>
      <Helmet>
        <title>Leaderboard - LikDai | သဵၼ်ႈမၢႆၵူၼ်းၵတ်ႉ</title>
        <meta
          name="description"
          content="Check the LikDai leaderboard to see top Shan / Dai / Tai typing (ၽိုၵ်းပေႃႉလိၵ်ႈတႆး) speeds and compete with other learners around the world."
        />
      </Helmet>
      <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="w-full layout space-y-4"
        >
          {/* Header - Responsive layout */}
          <motion.div variants={itemVariants} className="w-full">
            <LeaderboardHeader isLeaderboardhas={isLeaderboardhas} />
          </motion.div>

          {/* Filters - Responsive layout */}
          <motion.div variants={itemVariants} className="w-full">
            <LeaderboardFilter
              languageFilter={languageFilter}
              setLanguageFilter={setLanguageFilter}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="w-full">
            <p className="md:text-2xl text-xl font-bold mb-3">
              {t(`leaderboard_page.description.${languageFilter}`)}
            </p>
          </motion.div>

          {isFetchingLeaderboard ? (
            <motion.div variants={itemVariants} className="w-full flex justify-center items-center h-52">
              <Spinner />
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="w-full space-y-4">
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
                  <p className="mt-4 text-xs sm:text-sm text-center mb-20 opacity-70">
                    {t("leaderboard_page.note")}
                  </p>
                </>
              ) : (
                <div className="w-full flex justify-center items-center h-52">
                  <p className="text-center text-lg opacity-70">
                    {t("leaderboard_page.no_data")}
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </article>
    </>
  );
};

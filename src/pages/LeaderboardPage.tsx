import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useTitle } from "@/hook/useTitle";
import { LeaderboardPagination } from "@/components/LeaderboardPagination";
import { LeaderboardHeader } from "@/components/LeaderboardHeader";
import { LeaderboardFilter } from "@/components/LeaderboardFilter";
import { LeaderboardTable } from "@/components/LeaderboardTable";

// Mock data - would come from API in real app
const mockLeaderboardData: LeaderboardEntry[] = [
  // First 10 entries
  {
    rank: 1,
    username: "speedtyper",
    wpm: 156,
    accuracy: 98.2,
    raw: 162,
    consistency: 95,
    date: "2023-06-15T14:30:00Z",
    tests: 342,
  },
  {
    rank: 2,
    username: "keyboardwarrior",
    wpm: 145,
    accuracy: 97.5,
    raw: 150,
    consistency: 92,
    date: "2023-06-14T10:15:00Z",
    tests: 289,
  },
  {
    rank: 3,
    username: "typingmaster",
    wpm: 142,
    accuracy: 96.8,
    raw: 148,
    consistency: 94,
    date: "2023-06-16T09:45:00Z",
    tests: 412,
  },
  {
    rank: 4,
    username: "wordsmith",
    wpm: 138,
    accuracy: 97.1,
    raw: 143,
    consistency: 91,
    date: "2023-06-13T16:20:00Z",
    tests: 256,
  },
  {
    rank: 5,
    username: "keyhero",
    wpm: 135,
    accuracy: 95.9,
    raw: 141,
    consistency: 89,
    date: "2023-06-12T11:30:00Z",
    tests: 198,
  },
  {
    rank: 6,
    username: "typingpro",
    wpm: 132,
    accuracy: 96.2,
    raw: 137,
    consistency: 90,
    date: "2023-06-11T13:45:00Z",
    tests: 321,
  },
  {
    rank: 7,
    username: "fastfingers",
    wpm: 129,
    accuracy: 94.8,
    raw: 135,
    consistency: 88,
    date: "2023-06-10T15:10:00Z",
    tests: 275,
  },
  {
    rank: 8,
    username: "typingwizard",
    wpm: 127,
    accuracy: 95.3,
    raw: 133,
    consistency: 87,
    date: "2023-06-09T12:25:00Z",
    tests: 230,
  },
  {
    rank: 9,
    username: "keymaster",
    wpm: 125,
    accuracy: 94.5,
    raw: 131,
    consistency: 86,
    date: "2023-06-08T10:50:00Z",
    tests: 187,
  },
  {
    rank: 10,
    username: "speedtyper99",
    wpm: 123,
    accuracy: 93.9,
    raw: 129,
    consistency: 85,
    date: "2023-06-07T14:15:00Z",
    tests: 165,
  },
  // Additional entries for pagination
  {
    rank: 11,
    username: "typingchamp",
    wpm: 121,
    accuracy: 93.5,
    raw: 127,
    consistency: 84,
    date: "2023-06-06T09:20:00Z",
    tests: 154,
  },
  {
    rank: 12,
    username: "keyboardking",
    wpm: 119,
    accuracy: 93.1,
    raw: 125,
    consistency: 83,
    date: "2023-06-05T11:40:00Z",
    tests: 142,
  },
  {
    rank: 13,
    username: "typingace",
    wpm: 117,
    accuracy: 92.8,
    raw: 123,
    consistency: 82,
    date: "2023-06-04T14:55:00Z",
    tests: 138,
  },
  {
    rank: 14,
    username: "wordracer",
    wpm: 115,
    accuracy: 92.4,
    raw: 121,
    consistency: 81,
    date: "2023-06-03T16:30:00Z",
    tests: 126,
  },
  {
    rank: 15,
    username: "keyboardninja",
    wpm: 113,
    accuracy: 92.0,
    raw: 119,
    consistency: 80,
    date: "2023-06-02T10:10:00Z",
    tests: 115,
  },
  {
    rank: 16,
    username: "typingwizz",
    wpm: 111,
    accuracy: 91.7,
    raw: 117,
    consistency: 79,
    date: "2023-06-01T13:25:00Z",
    tests: 109,
  },
  {
    rank: 17,
    username: "speedfingers",
    wpm: 109,
    accuracy: 91.3,
    raw: 115,
    consistency: 78,
    date: "2023-05-31T15:40:00Z",
    tests: 98,
  },
  {
    rank: 18,
    username: "typinggenius",
    wpm: 107,
    accuracy: 90.9,
    raw: 113,
    consistency: 77,
    date: "2023-05-30T12:15:00Z",
    tests: 92,
  },
  {
    rank: 19,
    username: "keyboardmaster",
    wpm: 105,
    accuracy: 90.5,
    raw: 111,
    consistency: 76,
    date: "2023-05-29T09:30:00Z",
    tests: 87,
  },
  {
    rank: 20,
    username: "typinglegend",
    wpm: 103,
    accuracy: 90.1,
    raw: 109,
    consistency: 75,
    date: "2023-05-28T11:50:00Z",
    tests: 81,
  },
];

export const LeaderboardPage = () => {
  const { pathname } = useLocation();
  useTitle({ pathName: pathname });

  // State for filters
  const [languageFilter, setLanguageFilter] =
    useState<LanguageFilter>("english");
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardEntry[]>(mockLeaderboardData);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const totalPages = Math.ceil(leaderboardData.length / entriesPerPage);

  // Fetch leaderboard data (simulated)
  useEffect(() => {
    setLeaderboardData(mockLeaderboardData);
    setCurrentPage(1);
  }, [languageFilter]);

  return (
    <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl"
      >
        {/* Header - Responsive layout */}
        <LeaderboardHeader />

        {/* Filters - Responsive layout */}
        <LeaderboardFilter
          languageFilter={languageFilter}
          setLanguageFilter={setLanguageFilter}
        />

        {/* Leaderboard table - Responsive layout */}
        <LeaderboardTable
          leaderboardData={leaderboardData}
          currentPage={currentPage}
          entriesPerPage={entriesPerPage}
        />

        {/* Pagination - Responsive layout */}
        <LeaderboardPagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />

        {/* Info text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4 text-xs sm:text-sm text-center mb-20"
        >
          Leaderboards are updated every 10 minutes. Only verified accounts are
          displayed.
        </motion.p>
      </motion.div>
    </article>
  );
};

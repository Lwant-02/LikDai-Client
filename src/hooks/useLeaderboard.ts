import { authAxios } from "@/lib/axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useNextUpdateTimer } from "./useNextUpdatetTimer";
import { useEffect } from "react";

interface LeaderboardProps {
  mode: string;
  total: string;
  page: string;
}

export const useGetLeaderboard = ({ mode, total, page }: LeaderboardProps) => {
  const { timeRemaining } = useNextUpdateTimer();

  const {
    data: leaderboard = { leaderboard: [], totalPages: 0 },
    isLoading: isFetchingLeaderboard,
    refetch,
  } = useQuery<LeaderboardResponse>({
    queryKey: ["leaderboard", mode, total, page],
    queryFn: async () => {
      const { data } = await authAxios.get("/leaderboard/get-leaderboard", {
        params: { mode, total, page },
      });
      return data.data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  useEffect(() => {
    if (timeRemaining === "0:00") {
      refetch();
    }
  }, [timeRemaining, refetch]);

  return { leaderboard, isFetchingLeaderboard };
};

import { authAxios } from "@/lib/axiosInstance";
import { settingStore } from "@/store/settingStore";
import { useQuery } from "@tanstack/react-query";

export const useGetPublicProfile = ({ username }: { username: string }) => {
  const {
    data: profile,
    isLoading: isFetchingProfile,
    error,
  } = useQuery<User | null>({
    queryKey: ["public-profile", username],
    queryFn: async () => {
      const { data } = await authAxios.get(`/profile/me/${username}`);
      return data.data;
    },
    enabled: !!username && settingStore.getState().profileAciveTab === "stats",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { profile, isFetchingProfile, error };
};

export const useGetPublicAchievements = ({
  username,
}: {
  username: string;
}) => {
  const {
    data: achievements = { allAchievements: [], unlockedAchievements: [] },
    isLoading: isFetchingAchievements,
  } = useQuery<AchievementResponse>({
    queryKey: ["public-achievements", username],
    queryFn: async () => {
      const { data } = await authAxios.get(`/profile/achievements/${username}`);
      return data.data;
    },
    enabled:
      !!username && settingStore.getState().profileAciveTab === "achievements",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { achievements, isFetchingAchievements };
};

export const useGetPublicHistory = ({ username }: { username: string }) => {
  const { data: history = [], isLoading: isFetchingHistory } = useQuery<
    TestHistory[]
  >({
    queryKey: ["public-history", username],
    queryFn: async () => {
      const { data } = await authAxios.get(`/profile/history/${username}`);
      return data.data;
    },
    enabled:
      !!username && settingStore.getState().profileAciveTab === "history",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { history, isFetchingHistory };
};

export const useGetPublicStats = ({ username }: { username: string }) => {
  const { data: stats, isLoading: isFetchingStats } = useQuery<Stats>({
    queryKey: ["public-stats", username],
    queryFn: async () => {
      const { data } = await authAxios.get(`/profile/stats/${username}`);
      return data.data;
    },
    enabled: !!username && settingStore.getState().profileAciveTab === "stats",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { stats, isFetchingStats };
};

import { useMutation, useQuery } from "@tanstack/react-query";

import { axiosInstance } from "@/lib/axiosInstance";
import { queryClient } from "@/lib/queryClient";
import { authStore } from "@/store/authStore";
import { settingStore } from "@/store/settingStore";

export const useGetProfile = () => {
  const { data: profile, isLoading: isFetchingProfile } = useQuery<User | null>(
    {
      queryKey: ["profile", authStore.getState().accessToken],
      queryFn: async () => {
        const { data } = await axiosInstance.get("/account/me");
        return data.data;
      },
      enabled:
        !!authStore.getState().accessToken &&
        settingStore.getState().activeTab === "profile",
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  );
  return { profile, isFetchingProfile };
};

export const useGetHistorys = () => {
  const { data: history = [], isLoading: isFetchingHistory } = useQuery<
    TestHistory[]
  >({
    queryKey: ["history"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/account/history");
      return data.data;
    },
    enabled:
      !!authStore.getState().accessToken &&
      settingStore.getState().activeTab === "history",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { history, isFetchingHistory };
};

export const useGetStats = () => {
  const { data: stats, isLoading: isFetchingStats } = useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/account/stats");
      return data.data;
    },
    enabled:
      !!authStore.getState().accessToken &&
      settingStore.getState().activeTab === "stats",
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { stats, isFetchingStats };
};

export const useGetAchievements = () => {
  const { data: achievements, isLoading: isFetchingAchievements } =
    useQuery<AchievementResponse>({
      queryKey: ["achievements"],
      queryFn: async () => {
        const { data } = await axiosInstance.get("/account/achievements");
        return data.data;
      },
      enabled:
        !!authStore.getState().accessToken &&
        settingStore.getState().activeTab === "achievements",
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    });
  return { achievements, isFetchingAchievements };
};

export const useSubmitCertificate = () => {
  const { mutateAsync: submitCertificate, isPending: isSubmittingCertificate } =
    useMutation({
      mutationFn: async (fullName: string) => {
        await axiosInstance.post("/account/submit-certificate", { fullName });
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["achievements"] });
      },
    });
  return { submitCertificate, isSubmittingCertificate };
};

export const useGetCertificate = () => {
  const {
    data: certificate = { fullName: "", createdAt: "" },
    isLoading: isFetchingCertificate,
  } = useQuery<Certificate>({
    queryKey: ["certificate"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/account/certificate");
      return data.data;
    },
    enabled: !!authStore.getState().accessToken,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
  return { certificate, isFetchingCertificate };
};

export const useUpdateUsername = () => {
  const { mutateAsync: updateUsername, isPending: isUpdatingUsername } =
    useMutation({
      mutationFn: async (username: string) => {
        await axiosInstance.patch("/account/update-username", { username });
      },
    });
  return { updateUsername, isUpdatingUsername };
};

export const useUpdateBio = () => {
  const { mutateAsync: updateBio, isPending: isUpdatingBio } = useMutation({
    mutationFn: async (bio: string) => {
      await axiosInstance.patch("/account/update-bio", { bio });
    },
  });
  return { updateBio, isUpdatingBio };
};

export const useUpdatePassword = () => {
  const { mutateAsync: updatePassword, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: async (payload: {
        oldPassword: string;
        newPassword: string;
      }) => {
        await axiosInstance.patch("/account/update-password", payload);
      },
    });
  return { updatePassword, isUpdatingPassword };
};

export const useDeleteAccount = () => {
  const { mutateAsync: deleteAccount, isPending: isDeletingAccount } =
    useMutation({
      mutationFn: async () => {
        await axiosInstance.delete("/account/delete-account");
      },
    });
  return { deleteAccount, isDeletingAccount };
};

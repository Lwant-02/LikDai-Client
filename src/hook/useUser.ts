import { axiosInstance } from "@/lib/axiosInstance";
import { authStore } from "@/store/authStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const { data: profile, isLoading: isFetchingProfile } = useQuery<User | null>(
    {
      queryKey: ["profile"],
      queryFn: async () => {
        const { data } = await axiosInstance.get("/account/me");
        return data.data;
      },
      enabled: !!authStore.getState().accessToken,
      retry: 1,
    }
  );
  return { profile, isFetchingProfile };
};

export const useGetAchievements = () => {
  const { data: achievements, isLoading: isFetchingAchievements } =
    useQuery<AchievementResponse>({
      queryKey: ["achievements"],
      queryFn: async () => {
        const { data } = await axiosInstance.get("/account/achievements");
        return data.data;
      },
      enabled: !!authStore.getState().accessToken,
      retry: 1,
    });
  return { achievements, isFetchingAchievements };
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

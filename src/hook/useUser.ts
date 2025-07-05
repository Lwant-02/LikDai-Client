import { axiosInstance } from "@/lib/axiosInstance";
import { authStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";

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

import { authAxios } from "@/lib/axiosInstance";

export const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshResponse = await authAxios.get("/auth/refresh-token");
    if (refreshResponse.data.isSuccess) {
      return refreshResponse.data.accessToken;
    }
    return null;
  } catch (refreshError) {
    return null;
  }
};

import { useEffect } from "react";

import { authStore } from "@/store/authStore";
import { refreshToken } from "@/service/refreshToken";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAccessToken, setIsCheckingAuth } = authStore();

  useEffect(() => {
    const checkAuth = async () => {
      setIsCheckingAuth(true);
      try {
        const accessToken = await refreshToken();
        if (accessToken) {
          setAccessToken(accessToken);
        } else {
          setAccessToken(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);
  return <>{children}</>;
};

import { authStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

export const CheckAuth = ({ children }: { children: React.ReactNode }) => {
  const { accessToken } = authStore();

  if (!accessToken) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

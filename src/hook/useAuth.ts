import { authAxios } from "@/lib/axiosInstance";
import { useMutation } from "@tanstack/react-query";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const useRegister = () => {
  const { mutate: registerUser, isPending: isRegistering } = useMutation({
    mutationFn: async (payload: RegisterData) => {
      await authAxios.post("/auth/register", payload);
    },
  });
  return { registerUser, isRegistering };
};

export const useLogin = () => {
  const { mutateAsync: loginUser, isPending: isLoggingIn } = useMutation({
    mutationFn: async (payload: LoginData) => {
      const { data } = await authAxios.post("/auth/login", payload);
      return data.data;
    },
  });
  return { loginUser, isLoggingIn };
};

export const useLogout = () => {
  const { mutateAsync: logoutUser, isPending: isLoggingOut } = useMutation({
    mutationFn: async () => {
      await authAxios.post("/auth/logout");
    },
  });
  return { logoutUser, isLoggingOut };
};

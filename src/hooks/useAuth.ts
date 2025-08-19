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

export const useForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending: isSendingEmail } =
    useMutation({
      mutationFn: async (email: string) => {
        await authAxios.post("/auth/forgot-password", { email });
      },
    });
  return { forgotPassword, isSendingEmail };
};

export const useChangePassword = () => {
  const { mutateAsync: changePassword, isPending: isChangingPassword } =
    useMutation({
      mutationFn: async (payload: { email: string; password: string }) => {
        await authAxios.post("/auth/change-password", payload);
      },
    });
  return { changePassword, isChangingPassword };
};

export const useVerifyOtp = () => {
  const { mutateAsync: verifyOtp, isPending: isVerifyingOtp } = useMutation({
    mutationFn: async (payload: { email: string; otp: string }) => {
      await authAxios.post("/auth/verify-otp", payload);
    },
  });
  return { verifyOtp, isVerifyingOtp };
};

export const useResendOtp = () => {
  const { mutateAsync: resendOtp, isPending: isResendingOtp } = useMutation({
    mutationFn: async (email: string) => {
      await authAxios.post("/auth/resend-otp", { email });
    },
  });
  return { resendOtp, isResendingOtp };
};

export const useGoogleLoginHook = () => {
  const { mutateAsync: googleLogin, isPending: isLoggingInWithGoogle } =
    useMutation({
      mutationFn: async (payload: { email: string; name: string }) => {
        const res = await authAxios.post("/auth/google-login", payload);
        return res.data;
      },
    });
  return { googleLogin, isLoggingInWithGoogle };
};

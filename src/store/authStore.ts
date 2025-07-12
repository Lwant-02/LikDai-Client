import { create } from "zustand";

interface GlobalState {
  accessToken: string | null;
  isCheckingAuth: boolean;
  setIsCheckingAuth: (isCheckingAuth: boolean) => void;
  setAccessToken: (accessToken: string | null) => void;
}

export const authStore = create<GlobalState>((set) => ({
  accessToken: null,
  isCheckingAuth: true,
  setIsCheckingAuth: (isCheckingAuth: boolean) => set({ isCheckingAuth }),
  setAccessToken: (accessToken: string | null) => set({ accessToken }),
}));

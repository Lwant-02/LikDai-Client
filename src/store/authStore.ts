import { create } from "zustand";

interface GlobalState {
  user: UserData | null;
  accessToken: string | null;
  isCheckingAuth: boolean;
  setIsCheckingAuth: (isCheckingAuth: boolean) => void;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (payload: UserData | null) => void;
}

export const authStore = create<GlobalState>((set) => ({
  user: null,
  accessToken: null,
  isCheckingAuth: true,
  setIsCheckingAuth: (isCheckingAuth: boolean) => set({ isCheckingAuth }),
  setAccessToken: (accessToken: string | null) => set({ accessToken }),
  setUser: (payload: UserData | null) => set({ user: payload }),
}));

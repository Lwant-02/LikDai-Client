import { create } from "zustand";

interface GlobalState {
  user: UserData | null;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  setUser: (payload: UserData | null) => void;
}

export const authStore = create<GlobalState>((set) => ({
  user: null,
  accessToken: null,
  setAccessToken: (accessToken: string | null) => set({ accessToken }),
  setUser: (payload: UserData | null) => set({ user: payload }),
}));

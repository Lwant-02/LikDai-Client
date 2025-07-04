import { create } from "zustand";

interface GlobalState {
  username: string;
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  setUsername: (username: string) => void;
}

export const globalStore = create<GlobalState>((set) => ({
  username: "",
  accessToken: "",
  setAccessToken: (accessToken) => set({ accessToken }),
  setUsername: (username) => set({ username }),
}));

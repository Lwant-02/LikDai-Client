import { create } from "zustand";

interface SettingOptions {
  mode: LanguageMode;
  activeTab: TabType;
  selectedSetting: TestType;
  selectedTimer: number;
  selectedWords: number;
  customText: string;
  incorrectChar: number;
  totalChar: number;
  userInput: string;
  profileAciveTab: TabType;
  theme: string;
  startTime: number | null;
  endTime: number | null;
  wpmPerSecond: number[];
  setStartTime: (startTime: number | null) => void;
  setEndTime: (endTime: number | null) => void;
  setWpmPerSecond: (wpmPerSecond: number[]) => void;
  setTheme: (theme: string) => void;
  setProfileAciveTab: (tab: TabType) => void;
  setActiveTab: (tab: TabType) => void;
  setUserInput: (v: string) => void;
  setTotalChar: (v: number) => void;
  setIncorrectChar: (v: number) => void;
  setCustomText: (customText: string) => void;
  setMode: (mode: LanguageMode) => void;
  setSelectedSetting: (selectedSetting: TestType) => void;
  setSelectedTimer: (selectedTimer: number) => void;
  setSelectedWords: (selectedWords: number) => void;
}

export const settingStore = create<SettingOptions>((set) => ({
  mode: "shan",
  selectedSetting: "time",
  selectedTimer: 15,
  selectedWords: 30,
  customText: "This is a custom text.",
  incorrectChar: 0,
  totalChar: 0,
  userInput: "",
  activeTab: "profile",
  profileAciveTab: "stats",
  theme: localStorage.getItem("theme") || "dark",
  startTime: null,
  endTime: null,
  wpmPerSecond: [],
  setStartTime: (startTime) => set({ startTime }),
  setEndTime: (endTime) => set({ endTime }),
  setWpmPerSecond: (wpmPerSecond) => set({ wpmPerSecond }),
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
  setProfileAciveTab: (tab) => set({ profileAciveTab: tab }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setUserInput: (v) => set({ userInput: v }),
  setTotalChar: (v) => set({ totalChar: v }),
  setIncorrectChar: (v) => set({ incorrectChar: v }),
  setCustomText: (customText) => set({ customText }),
  setMode: (mode) => {
    const newText =
      mode === "eng"
        ? "This is a custom English text."
        : "ၽႃႇသႂ်ႇတႃႇၵႂႃႇတႄႉတႅင်း";
    set({ mode: mode, customText: newText });
  },
  setSelectedSetting: (selectedSetting) => set({ selectedSetting }),
  setSelectedTimer: (selectedTimer) => set({ selectedTimer }),
  setSelectedWords: (selectedWords) => set({ selectedWords }),
}));

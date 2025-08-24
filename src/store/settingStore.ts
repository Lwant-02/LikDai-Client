import { create } from "zustand";

interface SettingOptions {
  mode: LanguageMode;
  activeTab: TabType;
  userInput: string;
  profileAciveTab: TabType;
  theme: string;
  wpmPerSecond: number[];
  selectedKeyMap: KeyMapNames;
  soundEnabled: boolean;
  lessonLevel: LessonLevel;
  targetText: string;
  isFromHome: boolean;
  installPromptEvent: BeforeInstallPromptEvent | null;
  setIsFromHome: (isFromHome: boolean) => void;
  setTargetText: (text: string) => void;
  setLessonLevel: (level: LessonLevel) => void;
  setSelectedKeyMap: (keyMap: KeyMapNames) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setWpmPerSecond: (wpmPerSecond: number[]) => void;
  setTheme: (theme: string) => void;
  setProfileAciveTab: (tab: TabType) => void;
  setActiveTab: (tab: TabType) => void;
  setUserInput: (v: string) => void;
  setMode: (mode: LanguageMode) => void;
  setInstallPromptEvent: (event: BeforeInstallPromptEvent | null) => void;
}

export const settingStore = create<SettingOptions>((set) => ({
  mode: "shan",
  selectedSetting: "time",
  selectedTimer: 15,
  selectedWords: 30,
  customText: "ၼႆႉပဵၼ်လိၵ်ႈ ဢၼ်ပၼ်တူဝ်ယၢင်ႇ",
  userInput: "",
  activeTab: "profile",
  profileAciveTab: "stats",
  theme: localStorage.getItem("theme") || "dark",
  wpmPerSecond: [],
  selectedKeyMap: "namkhone",
  soundEnabled: localStorage.getItem("soundEnabled") === "true" || false,
  lessonLevel: "beginner",
  targetText: "",
  isFromHome: false,
  installPromptEvent: null,
  setIsFromHome: (isFromHome) => set({ isFromHome }),
  setTargetText: (text) => set({ targetText: text }),
  setLessonLevel: (level) => set({ lessonLevel: level }),
  setSelectedKeyMap: (keyMap) => set({ selectedKeyMap: keyMap }),
  setSoundEnabled: (enabled) => {
    set({ soundEnabled: enabled });
    localStorage.setItem("soundEnabled", enabled.toString());
  },
  setWpmPerSecond: (wpmPerSecond) => set({ wpmPerSecond }),
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("theme", theme);
  },
  setProfileAciveTab: (tab) => set({ profileAciveTab: tab }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setUserInput: (v) => set({ userInput: v }),
  setMode: (mode) => set({ mode: mode }),
  setInstallPromptEvent: (event) => set({ installPromptEvent: event }),
}));

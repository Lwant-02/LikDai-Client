import { create } from "zustand";

import { DEFAULT_KEY_SOUND, KEY_SOUND_PACKS } from "@/constant";

const getStoredKeySound = (): KeySoundName => {
  const stored = localStorage.getItem("keySound");
  return KEY_SOUND_PACKS.some((pack) => pack.id === stored)
    ? (stored as KeySoundName)
    : DEFAULT_KEY_SOUND;
};

interface SettingOptions {
  mode: LanguageMode;
  activeTab: TabType;
  userInput: string;
  profileAciveTab: TabType;
  theme: string;
  wpmPerSecond: number[];
  selectedKeyMap: KeyMapNames;
  soundEnabled: boolean;
  selectedKeySound: KeySoundName;
  lessonLevel: LessonLevel;
  targetText: string;
  isFromHome: boolean;
  installPromptEvent: BeforeInstallPromptEvent | null;
  timer: Timer;
  setIsFromHome: (isFromHome: boolean) => void;
  setTargetText: (text: string) => void;
  setLessonLevel: (level: LessonLevel) => void;
  setSelectedKeyMap: (keyMap: KeyMapNames) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setSelectedKeySound: (keySound: KeySoundName) => void;
  setWpmPerSecond: (wpmPerSecond: number[]) => void;
  setTheme: (theme: string) => void;
  setProfileAciveTab: (tab: TabType) => void;
  setActiveTab: (tab: TabType) => void;
  setUserInput: (v: string) => void;
  setMode: (mode: LanguageMode) => void;
  setInstallPromptEvent: (event: BeforeInstallPromptEvent | null) => void;
  setTimer: (timer: Timer) => void;
}

export const useSettingStore = create<SettingOptions>((set) => ({
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
  soundEnabled: localStorage.getItem("soundEnabled") !== "false",
  selectedKeySound: getStoredKeySound(),
  lessonLevel: "beginner",
  targetText: "",
  isFromHome: false,
  installPromptEvent: null,
  timer: 60,
  setIsFromHome: (isFromHome) => set({ isFromHome }),
  setTargetText: (text) => set({ targetText: text }),
  setLessonLevel: (level) => set({ lessonLevel: level }),
  setSelectedKeyMap: (keyMap) => set({ selectedKeyMap: keyMap }),
  setSoundEnabled: (enabled) => {
    set({ soundEnabled: enabled });
    localStorage.setItem("soundEnabled", enabled.toString());
  },
  setSelectedKeySound: (keySound) => {
    set({ selectedKeySound: keySound });
    localStorage.setItem("keySound", keySound);
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
  setTimer: (timer) => set({ timer }),
}));

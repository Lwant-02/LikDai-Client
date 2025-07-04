type LanguageMode = "eng" | "shan";

type TestType = "time" | "words" | "quote" | "custom";

type LanguageFilter = "english" | "shan";

type TabType = "profile" | "stats" | "history" | "achievements" | "settings";

interface UserData {
  username: string;
  email: string;
  joinDate: string;
  stats: {
    testsCompleted: number;
    averageWpm: number;
    bestWpm: number;
    averageAccuracy: number;
    totalTimePracticed: string;
  };
  recentTests: {
    date: string;
    wpm: number;
    accuracy: number;
    mode: string;
  }[];
  achievements: {
    name: string;
    description: string;
    unlocked: boolean;
  }[];
}

interface SettingOptions {
  isEngMode: boolean;
  isShanMode: boolean;
  selectedSetting: string;
  setIsEngMode: (isEngMode: boolean) => void;
  setIsShanMode: (isShanMode: boolean) => void;
  setSelectedSetting: (selectedSetting: string) => void;
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  wpm: number;
  accuracy: number;
  raw: number;
  consistency: number;
  date: string;
  tests: number;
}

declare namespace Intl {
  class Segmenter {
    constructor(
      locales?: string | string[],
      options?: { granularity?: "grapheme" | "word" | "sentence" }
    );
    segment(input: string): Iterable<SegmentData>;
  }

  interface SegmentData {
    segment: string;
    index: number;
    input: string;
    isWordLike?: boolean;
  }
}

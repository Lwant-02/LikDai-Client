type LanguageMode = "eng" | "shan";

type TestType = "time" | "words" | "quote" | "custom";

type LanguageFilter = "english" | "shan";

type TabType = "profile" | "stats" | "history" | "achievements" | "settings";

enum AchievementCategory {
  speed = "speed",
  accuracy = "accuracy",
  consistency = "consistency",
  practice = "practice",
  certificate = "certificate",
}

interface User {
  id: string;
  email: string;
  username: string;
  joinedAt: string;
  averageWpm: number;
  totalTests: number;
}

interface Stats {
  averageWpm: number;
  bestWpm: number;
  averageAccuracy: number;
  testsCompleted: number;
  totalTimePracticed: string;
  engDistribution: number;
  shanDistribution: number;
}

interface TypingTestResult {
  wpm: number;
  accuracy: number;
  raw: number;
  characters: number;
  correctChars: number;
  timeTaken: number;
  testType: string;
  wordCount: number;
  consistency: number;
  totalWords: number;
  errorWords: number;
}

interface TestHistory {
  id: string;
  createdAt: string | Date;
  wpm: number;
  accuracy: number;
  mode: string;
}

interface Achievement {
  id: string;
  name: string;
  requirement: string;
  threshold: number;
  category: AchievementCategory;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface UlockedAchievement {
  achievementId: string;
  unlockedAt: string | Date;
}

interface AchievementResponse {
  achievement: Achievement[];
  unlockedAchievements: UlockedAchievement[];
}

interface UserData {
  username: string;
  email: string;
  joinDate: string;
  stats: stats;
  recentTests: TestHistory[];
  achievements: Achievement[];
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

type LanguageMode = "eng" | "shan";

type TestType = "time" | "words" | "quote" | "custom";

type LanguageFilter = "eng" | "shan";

type TabType = "profile" | "stats" | "history" | "achievements" | "settings";

type Level = "easy" | "hard";

type LessonLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "quotes"
  | "music";

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
  bio: string;
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
  totalTimePracticed: number;
  engDistribution: number;
  shanDistribution: number;
}

interface TypingTestResult {
  wpm: number;
  accuracy: number;
  raw: number;
  consistency: number;
  timeTaken: number;
  mode: LanguageMode;
  lessonLevel: LessonLevel;
  characters: number;
  correct_chars: number;
}

interface TestHistory {
  id: string;
  createdAt: string | Date;
  wpm: number;
  accuracy: number;
  mode: string;
  lessonLevel: LessonLevel;
}

interface Achievement {
  id: string;
  name: string;
  requirement: string;
  threshold: number;
  category: AchievementCategory;
}

interface UlockedAchievement {
  achievementId: string;
  unlockedAt: string | Date;
}

interface AchievementResponse {
  allAchievements: Achievement[];
  unlockedAchievements: UlockedAchievement[];
  isSubmitted: boolean;
}

interface Certificate {
  fullName: string;
  createdAt: string | Date;
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
  user: {
    username: string;
  };
  wpm: number;
  accuracy: number;
  raw: number;
  consistency: number;
  tests_completed: number;
  mode: string;
  updatedAt: string | Date;
  lessonLevel: string;
}

interface LeaderboardResponse {
  leaderboard: {
    id: string;
    wpm: number;
    accuracy: number;
    raw: number;
    consistency: number;
    tests_completed: number;
    lessonLevel: string;
    mode: string;
    user: {
      username: string;
    };
    updatedAt: string | Date;
  }[];
  totalPages: number;
}

type KeyMapNames = "english" | "namkhone" | "panglong" | "yunghkio" | "sil";

type KeyMap = Record<string, string>;

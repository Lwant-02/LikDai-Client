import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";

import { useTitle } from "@/hook/useTitle";
import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";
import { ProfileStatsTab } from "@/components/ProfileStatsTab";
import { ProfileHistoryTab } from "@/components/ProfileHistoryTab";
import { ProfileAchievementsTab } from "@/components/ProfileAchievementTab";

// Mock user data - would come from your auth system in a real app
const mockUserData = {
  username: "speedtyper",
  email: "user@example.com",
  joinDate: "June 15, 2023",
  id: "1",
  stats: {
    testsCompleted: 342,
    averageWpm: 85,
    bestWpm: 120,
    averageAccuracy: 96.5,
    totalTimePracticed: "28h 45m",
  },
  recentTests: [
    { date: "2023-06-15", wpm: 88, accuracy: 97.2, mode: "eng" },
    { date: "2023-06-14", wpm: 92, accuracy: 95.8, mode: "eng" },
    { date: "2023-06-12", wpm: 78, accuracy: 98.1, mode: "shan" },
    { date: "2023-06-10", wpm: 85, accuracy: 96.3, mode: "eng" },
  ],
  achievements: [
    { name: "Speed Demon", description: "Reach 100 WPM", unlocked: true },
    {
      name: "Accuracy Master",
      description: "Complete a test with 100% accuracy",
      unlocked: true,
    },
    {
      name: "Bilingual Pro",
      description: "Complete 50 tests in both languages",
      unlocked: false,
    },
    {
      name: "Marathon Typer",
      description: "Practice for 50 hours total",
      unlocked: false,
    },
  ],
};

export const ProfilePage = () => {
  const { pathname } = useLocation();
  const params = useParams();
  useTitle({ pathName: pathname });
  const [activeTab, setActiveTab] = useState<TabType>("stats");

  const username = params.username;

  if (!username) {
    return null;
  }

  return (
    <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full "
      >
        {/* Header */}
        <ProfileHeader
          joinedAt={mockUserData.joinDate}
          username={mockUserData.username}
          id={mockUserData.id}
        />

        {/* Tabs */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className=" mb-20"
        >
          {/* Stats Tab */}
          {activeTab === "stats" && <ProfileStatsTab />}

          {/* History Tab */}
          {activeTab === "history" && <ProfileHistoryTab />}

          {/* Achievements Tab */}
          {activeTab === "achievements" && <ProfileAchievementsTab />}
        </motion.div>
      </motion.div>
    </article>
  );
};

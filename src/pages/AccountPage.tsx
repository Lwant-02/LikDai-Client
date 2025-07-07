import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import { useTitle } from "@/hook/useTitle";
import { AccoutHeader } from "@/components/AccoutHeader";
import { AccountTabs } from "@/components/AccountTabs";
import { ProfileTab } from "@/components/ProfileTab";
import { StatusTab } from "@/components/StatusTab";
import { HistoryTab } from "@/components/HistoryTab";
import { AchievementsTab } from "@/components/AchievementsTab";
import { SettingTab } from "@/components/SettingTab";
import { authStore } from "@/store/authStore";
import { useGetProfile } from "@/hook/useUser";
import { settingStore } from "@/store/settingStore";

// Mock user data - would come from your auth system in a real app
const mockUserData = {
  username: "speedtyper",
  email: "user@example.com",
  joinDate: "June 15, 2023",
  avatar: "/images/avatar-placeholder.png", // Default avatar
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
    {
      name: "Marathon Typer",
      description: "Practice for 50 hours total",
      unlocked: false,
    },
  ],
};

export const AccountPage = () => {
  const { pathname } = useLocation();
  const { isCheckingAuth } = authStore();

  const { activeTab, setActiveTab } = settingStore();
  useTitle({ pathName: pathname });

  const { profile, isFetchingProfile } = useGetProfile();

  if (isCheckingAuth || isFetchingProfile || !profile) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Header */}
        <AccoutHeader {...profile} />

        {/* Tabs */}
        <AccountTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-20"
        >
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <ProfileTab
              username={profile.username}
              email={profile.email}
              joinDate={profile.joinedAt}
              testsCompleted={profile.totalTests}
              setActiveTab={setActiveTab}
            />
          )}

          {/* Stats Tab */}
          {activeTab === "stats" && <StatusTab stats={mockUserData.stats} />}

          {/* History Tab */}
          {activeTab === "history" && <HistoryTab />}

          {/* Achievements Tab */}
          {activeTab === "achievements" && (
            <AchievementsTab achievements={mockUserData.achievements} />
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && <SettingTab />}
        </motion.div>
      </motion.div>
    </article>
  );
};

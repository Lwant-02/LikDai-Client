import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { AccoutHeader } from "@/features/account/components/AccoutHeader";
import { AccountTabs } from "@/features/account/components/AccountTabs";
import { ProfileTab } from "@/features/account/components/ProfileTab";
import { StatsTab } from "@/features/account/components/StatsTab";
import { HistoryTab } from "@/features/account/components/HistoryTab";
import { AchievementsTab } from "@/features/account/components/AchievementsTab";
import { SettingTab } from "@/components/SettingTab";
import { useAuthStore } from "@/store/authStore";
import { useGetProfile } from "@/hooks/useUser";
import { useSettingStore } from "@/store/settingStore";

export const AccountPage = () => {
  const { isCheckingAuth } = useAuthStore();

  const { activeTab, setActiveTab } = useSettingStore();

  const { profile, isFetchingProfile } = useGetProfile();

  if (isCheckingAuth || isFetchingProfile || !profile) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Account Settings - LikDai | ၶေႃႈမုၼ်းသုၼ်ႇတူဝ်</title>
        <meta
          name="description"
          content="Manage your LikDai account settings, update your profile, and track your Shan / Dai / Tai typing journey (ၽိုၵ်းပေႃႉလိၵ်ႈတႆး)."
        />
      </Helmet>
      <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full layout"
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
                bio={profile.bio}
                username={profile.username}
                email={profile.email}
                joinDate={profile.joinedAt}
                testsCompleted={profile.totalTests}
                setActiveTab={setActiveTab}
              />
            )}

            {/* Stats Tab */}
            {activeTab === "stats" && <StatsTab />}

            {/* History Tab */}
            {activeTab === "history" && <HistoryTab />}

            {/* Achievements Tab */}
            {activeTab === "achievements" && <AchievementsTab />}

            {/* Settings Tab */}
            {activeTab === "settings" && <SettingTab />}
          </motion.div>
        </motion.div>
      </article>
    </>
  );
};

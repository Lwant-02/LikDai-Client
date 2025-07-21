import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { ProfileHeader } from "@/components/ProfileHeader";
import { ProfileTabs } from "@/components/ProfileTabs";
import { ProfileStatsTab } from "@/components/ProfileStatsTab";
import { ProfileHistoryTab } from "@/components/ProfileHistoryTab";
import { ProfileAchievementsTab } from "@/components/ProfileAchievementTab";
import { useGetPublicProfile } from "@/hooks/useProfile";
import { settingStore } from "@/store/settingStore";

export const ProfilePage = () => {
  const params = useParams();
  const { profileAciveTab } = settingStore();
  const username = params.username;

  if (!username) {
    return null;
  }
  const { isFetchingProfile, profile } = useGetPublicProfile({
    username,
  });

  if (isFetchingProfile || !profile) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{username} | Profile</title>
        <meta
          name="description"
          content={`View ${username}'s profile on LikDai - Pro.`}
        />
      </Helmet>

      <article className="min-h-screen w-full flex flex-col items-center py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full "
        >
          {/* Header */}
          <ProfileHeader {...profile} />

          {/* Tabs */}
          <ProfileTabs />

          {/* Content */}
          <motion.div
            key={profileAciveTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className=" mb-20"
          >
            {/* Stats Tab */}
            {profileAciveTab === "stats" && (
              <ProfileStatsTab username={username} />
            )}

            {/* History Tab */}
            {profileAciveTab === "history" && (
              <ProfileHistoryTab username={username} />
            )}

            {/* Achievements Tab */}
            {profileAciveTab === "achievements" && (
              <ProfileAchievementsTab username={username} />
            )}
          </motion.div>
        </motion.div>
      </article>
    </>
  );
};

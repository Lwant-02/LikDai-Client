import { History, Award, BarChart3 } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { cn } from "@/lib/utils";
import { settingStore } from "@/store/settingStore";
import { ACCOUNT_PROFILE_CONTENT } from "@/content/account.content";

const tabs = [
  {
    id: "stats",
    label: ACCOUNT_PROFILE_CONTENT.tabs.stats,
    icon: <BarChart3 className="size-4" />,
  },
  {
    id: "history",
    label: ACCOUNT_PROFILE_CONTENT.tabs.history,
    icon: <History className="size-4" />,
  },
  {
    id: "achievements",
    label: ACCOUNT_PROFILE_CONTENT.tabs.achievements,
    icon: <Award className="size-4" />,
  },
];

export const ProfileTabs = () => {
  const { profileAciveTab, setProfileAciveTab } = settingStore();
  return (
    <div className="flex overflow-x-auto mb-6 pb-2 gap-2 ">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer w-32 border border-primary/20",
            profileAciveTab === tab.id
              ? "bg-foreground text-yellow"
              : "hover:bg-foreground/50",
          )}
          onClick={() => setProfileAciveTab(tab.id as TabType)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Button>
      ))}
    </div>
  );
};

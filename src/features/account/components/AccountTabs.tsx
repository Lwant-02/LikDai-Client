import { User, Settings, History, Award, BarChart3 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AccountTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: <User className="size-4" />,
  },
  {
    id: "stats",
    label: "Stats",
    icon: <BarChart3 className="size-4" />,
  },
  {
    id: "history",
    label: "History",
    icon: <History className="size-4" />,
  },
  {
    id: "achievements",
    label: "Achievements",
    icon: <Award className="size-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="size-4" />,
  },
];

export const AccountTabs = ({ activeTab, setActiveTab }: AccountTabsProps) => {
  return (
    <div className="flex overflow-x-auto mb-6 pb-2 gap-2 ">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant="ghost"
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer",
            activeTab === tab.id
              ? "bg-foreground text-yellow"
              : "hover:bg-foreground/50"
          )}
          onClick={() => setActiveTab(tab.id as TabType)}
        >
          {tab.icon}
          <span>{tab.label}</span>
        </Button>
      ))}
    </div>
  );
};

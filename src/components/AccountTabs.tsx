import { User, Settings, History, Award, BarChart3 } from "lucide-react";
import { useLocation } from "react-router-dom";

import { Button } from "./ui/button";
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
  const { pathname } = useLocation();

  const filterTabs = tabs.filter((tab) => {
    const isAccountPage = pathname === "/account";
    if (!isAccountPage && (tab.id === "profile" || tab.id === "settings")) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex overflow-x-auto mb-6 pb-2 gap-2 ">
      {filterTabs.map((tab) => (
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

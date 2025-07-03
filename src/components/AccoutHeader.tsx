import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { toast } from "sonner";
import { formatName } from "@/util/formatName";
import { useLocation } from "react-router-dom";

interface AccoutHeaderProps {
  username: string;
  joinDate: string;
  stats: {
    averageWpm: number;
  };
}

export const AccoutHeader = ({
  username,
  joinDate,
  stats,
}: AccoutHeaderProps) => {
  const { pathname } = useLocation();

  const handleLogout = () => {
    // In a real app, this would clear auth tokens, etc.
    toast("👋 Logged Out", {
      description: (
        <p className="text-primary">You have been logged out successfully.</p>
      ),
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="relative">
          <div className="size-16 rounded-full border-2 border-yellow flex justify-center items-center ">
            <p className="text-2xl font-bold text-yellow">
              {formatName(username)}
            </p>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {stats.averageWpm}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-sm opacity-70">Member since {joinDate}</p>
        </div>
      </div>
      {pathname.endsWith("/account") && (
        <Button
          variant="destructive"
          className="bg-foreground/50 hover:bg-foreground cursor-pointer"
          onClick={handleLogout}
        >
          <LogOut className="size-4 mr-1" />
          Logout
        </Button>
      )}
    </div>
  );
};

import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { formatName } from "@/util/formatName";
import { useLogout } from "@/hook/useAuth";
import { Spinner } from "./Spinner";
import { toast } from "sonner";
import { authStore } from "@/store/authStore";
import { formatJoinedDate } from "@/util/formatJoinedDate";

interface AccoutHeaderProps {
  id: string;
  username: string;
  joinedAt: string;
  averageWpm: number;
  bio: string;
}

export const AccoutHeader = ({
  username,
  joinedAt,
  averageWpm,
  bio,
}: AccoutHeaderProps) => {
  const { setAccessToken } = authStore();
  const { isLoggingOut, logoutUser } = useLogout();

  const handleLogout = async () => {
    await logoutUser(undefined, {
      onSuccess: () => {
        setAccessToken(null);
        toast("✅️ Success", {
          description: <p className="text-white">Logout successful!</p>,
          style: {
            backgroundColor: "#1f7d53 ",
          },
        });
      },
      onError: (error: any) => {
        if (error.code === "ERR_NETWORK") {
          toast("❌️ Oops!", {
            description: (
              <p className="text-white">
                Request timed out! Please try again later.
              </p>
            ),
          });
          return;
        }
        toast("❌️ Oops!", {
          description: (
            <p className="text-white">
              {error.response.data.message ||
                "Something went wrong. Please try again."}
            </p>
          ),
        });
      },
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
            {averageWpm}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-sm opacity-70">
            Member since - {formatJoinedDate(joinedAt)}
          </p>
        </div>
      </div>
      <div className=" w-auto md:mb-0 mb-4 text-center">
        <h1 className="text-xl font-bold">Your Bio</h1>
        <p className="text-sm opacity-70 ">
          {bio ? bio : "You have not set your bio yet."}
        </p>
      </div>
      <Button
        variant="destructive"
        disabled={isLoggingOut}
        className="bg-foreground text-primary hover:bg-foreground cursor-pointer w-32"
        onClick={handleLogout}
      >
        {isLoggingOut ? (
          <Spinner size={6} />
        ) : (
          <>
            <LogOut className="size-4 mr-1" />
            Logout
          </>
        )}
      </Button>
    </div>
  );
};

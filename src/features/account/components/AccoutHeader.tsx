import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatName } from "@/util/formatName";
import { useLogout } from "@/hooks/useAuth";
import { toast } from "sonner";
import { authStore } from "@/store/authStore";
import { formatJoinedDate } from "@/util/formatJoinedDate";
import { MiniSpinner } from "@/components/MiniSpinner";
import { ACCOUNT_PROFILE_CONTENT } from "@/content/account.content";

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
          description: <p className="text-white">ဢွၵ်ႇဢၵွင်ႉယဝ်ႉ လီငၢမ်းၶႃႈ</p>,
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
                မီးလွင်ႈၽိတ်းပိူင်ႈဝႆႉ။ ၶိုၼ်းၶတ်းၸႂ်တူၺ်းၶႃႈ။
              </p>
            ),
          });
          return;
        }
        toast("❌️ Oops!", {
          description: (
            <p className="text-white">
              {error.response.data.message ||
                "မီးလွင်ႈၽိတ်းပိူင်ႈဝႆႉ။ ၶိုၼ်းၶတ်းၸႂ်တူၺ်းၶႃႈ။"}
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
            <p className="text-xl font-bold text-yellow">
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
            {ACCOUNT_PROFILE_CONTENT.joinDate} - {formatJoinedDate(joinedAt)}
          </p>
        </div>
      </div>
      <div className=" w-auto md:mb-0 mb-4 text-center">
        <h1 className="text-xl font-bold">
          {ACCOUNT_PROFILE_CONTENT.bioTitle}
        </h1>
        <p className="text-sm opacity-70 ">
          {bio ? bio : ACCOUNT_PROFILE_CONTENT.noBio}
        </p>
      </div>
      <Button
        variant="destructive"
        disabled={isLoggingOut}
        className="bg-foreground text-primary btn hover:bg-foreground cursor-pointer w-32"
        onClick={handleLogout}
      >
        {isLoggingOut ? (
          <MiniSpinner />
        ) : (
          <>
            <LogOut className="size-4 mr-1" />
            {ACCOUNT_PROFILE_CONTENT.logout}
          </>
        )}
      </Button>
    </div>
  );
};

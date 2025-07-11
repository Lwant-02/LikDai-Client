import { useState } from "react";
import { toast } from "sonner";
import { Edit, Save, X, Settings } from "lucide-react";

import { Button } from "./ui/button";
import { InputFiled } from "./InputFiled";
import { formatJoinedDate } from "@/util/formatJoinedDate";
import { useUpdateBio, useUpdateUsername } from "@/hook/useUser";
import { Spinner } from "./Spinner";
import { queryClient } from "@/lib/queryClient";

interface ProfileTabProps {
  username: string;
  email: string;
  joinDate: string;
  bio: string;
  testsCompleted: number;
  setActiveTab: (tab: TabType) => void;
}

export const ProfileTab = ({
  username,
  email,
  joinDate,
  testsCompleted,
  setActiveTab,
  bio,
}: ProfileTabProps) => {
  const { updateUsername, isUpdatingUsername } = useUpdateUsername();
  const { updateBio, isUpdatingBio } = useUpdateBio();
  const [isEditBio, setIsEditBio] = useState<boolean>(false);
  const [isEditUsername, setIsEditUsername] = useState<boolean>(false);
  const [userBio, setUserBio] = useState<string>(bio);
  const [UserUsername, setUserUsername] = useState<string>(username);

  const handleUpdateUsername = async () => {
    if (!UserUsername.trim()) {
      toast("ⓘ Notice", {
        description: <p className="text-white">Please fill in all fields!</p>,
      });
      return;
    }
    //Check if username is include letter and number
    if (!/^(?=.*[a-z])(?=.*\d)[a-z0-9]+$/i.test(UserUsername)) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">
            Username must contain at least one letter and one number.
          </p>
        ),
      });
      return;
    }

    await updateUsername(UserUsername, {
      onSuccess: () => {
        setIsEditUsername(false);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast("✅ Username Updated", {
          description: (
            <p className="text-white">
              Your username has been updated successfully!
            </p>
          ),
          style: { backgroundColor: "#1f7d53" },
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

  const handleUpdateBio = async () => {
    if (!userBio.trim()) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">Please do not leave this empty!</p>
        ),
      });
      return;
    }
    //Check if bio is less than 20 characters
    if (userBio.split(" ").length > 20) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">Bio must be less than 20 characters.</p>
        ),
      });
      return;
    }

    await updateBio(userBio, {
      onSuccess: () => {
        setIsEditBio(false);
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        toast("✅ Bio Updated", {
          description: (
            <p className="text-white">
              Your bio has been updated successfully!
            </p>
          ),
          style: { backgroundColor: "#1f7d53" },
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
    <div className="space-y-6">
      <div className="flex justify-between md:items-center md:gap-0 gap-2 md:flex-row flex-col">
        <h2 className="text-xl font-bold">Profile Information</h2>
        {!isEditBio && !isEditUsername ? (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditUsername(true)}
              className="bg-foreground/30 cursor-pointer w-32"
            >
              <Edit className="size-4 mr-1" />
              Edit Username
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditBio(true)}
              className="bg-foreground/30 cursor-pointer w-32"
            >
              <Edit className="size-4 mr-1" />
              Edit Bio
            </Button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isUpdatingUsername || isUpdatingBio}
              type="button"
              onClick={isEditBio ? handleUpdateBio : handleUpdateUsername}
              className="bg-green/20 hover:bg-green/30 text-green cursor-pointer w-32"
            >
              {isUpdatingUsername || isUpdatingBio ? (
                <Spinner size={6} />
              ) : (
                <>
                  <Save className="size-4 " />
                  Save
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (isEditBio) {
                  setIsEditBio(false);
                } else {
                  setIsEditUsername(false);
                }
              }}
              className="bg-red/20 hover:bg-red/30 text-red cursor-pointer w-32"
            >
              <X className="size-4 " />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {!isEditBio && !isEditUsername ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm opacity-70 mb-1">Username</p>
            <p className="font-medium">{username}</p>
          </div>
          <div>
            <p className="text-sm opacity-70 mb-1">Email</p>
            <p className="font-medium">{email}</p>
          </div>
          <div>
            <p className="text-sm opacity-70 mb-1">Bio</p>
            <p className="font-medium">
              {bio ? bio : "You have not set your bio yet."}
            </p>
          </div>
          <div>
            <p className="text-sm opacity-70 mb-1">Member Since</p>
            <p className="font-medium">{formatJoinedDate(joinDate)}</p>
          </div>
          <div>
            <p className="text-sm opacity-70 mb-1">Tests Completed</p>
            <p className="font-medium">{testsCompleted}</p>
          </div>
        </div>
      ) : (
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isEditBio && (
            <InputFiled
              type="text"
              id="account_bio"
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
              placeholder="Add your bio"
              label="Bio"
              helperText="Bio must be less than 20 characters."
            />
          )}
          {isEditUsername && (
            <InputFiled
              type="text"
              id="account_username"
              value={UserUsername}
              onChange={(e) => setUserUsername(e.target.value)}
              placeholder="Username"
              label="Username"
              helperText="Username must be contain numbers and lowercase letters only."
            />
          )}
        </form>
      )}

      <div className="mt-6">
        <Button
          variant="outline"
          className="bg-foreground/30 hover:bg-foreground/50 cursor-pointer"
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="size-4 mr-1" />
          Account Settings
        </Button>
      </div>
    </div>
  );
};

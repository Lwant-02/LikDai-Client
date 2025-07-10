import { useState } from "react";
import { toast } from "sonner";
import { Edit, Save, X } from "lucide-react";

import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { InputFiled } from "./InputFiled";
import { formatJoinedDate } from "@/util/formatJoinedDate";
import { useUpdateProfile } from "@/hook/useUser";
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
  const { isUpdatingProfile, updateProfile } = useUpdateProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: username,
    bio: bio,
  });

  const handleUpdateUsername = async () => {
    if (!editForm.username.trim()) {
      toast("ⓘ Notice", {
        description: <p className="text-primary">Please fill in all fields!</p>,
      });
      return;
    }
    //Check if username is include letter and number
    if (!/^(?=.*[a-z])(?=.*\d)[a-z0-9]+$/i.test(editForm.username)) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">
            Username must contain at least one letter and one number.
          </p>
        ),
      });
      return;
    }

    //Check if bio is less than 20 characters
    if (editForm.bio.split(" ").length > 20) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">Bio must be less than 20 characters.</p>
        ),
      });
      return;
    }
    const payload = {
      username: editForm.username,
      bio: editForm.bio,
    };
    await updateProfile(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["profile"] });
        setIsEditing(false);
        toast("✅ Profile Updated", {
          description: (
            <p className="text-primary">
              Your profile has been updated successfully!
            </p>
          ),
          style: { backgroundColor: "#1f7d53" },
        });
      },
      onError: (error: any) => {
        if (error.code === "ERR_NETWORK") {
          toast("❌️ Oops!", {
            description: (
              <p className="text-primary">
                Request timed out! Please try again later.
              </p>
            ),
          });
          return;
        }
        toast("❌️ Oops!", {
          description: (
            <p className="text-primary">
              {error.response.data.message ||
                "Something went wrong. Please try again."}
            </p>
          ),
        });
      },
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Profile Information</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(true)}
            className="bg-foreground/30 cursor-pointer"
          >
            <Edit className="size-4 mr-1" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={isUpdatingProfile}
              type="button"
              onClick={handleUpdateUsername}
              className="bg-green/20 hover:bg-green/30 text-green cursor-pointer md:w-28"
            >
              {isUpdatingProfile ? (
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
                setIsEditing(false);
              }}
              className="bg-red/20 hover:bg-red/30 text-red cursor-pointer md:w-28"
            >
              <X className="size-4 " />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
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
          <InputFiled
            type="text"
            id="account_username"
            value={editForm.username}
            onChange={(e) =>
              setEditForm({ ...editForm, username: e.target.value })
            }
            placeholder="Username"
            label="Username"
            helperText="Username must be contain numbers and lowercase letters only."
          />
          <InputFiled
            type="email"
            disabled={true}
            id="account_email"
            value={email}
            onChange={() => {}}
            placeholder="Email"
            label="Email"
            helperText="Email must be a valid email address."
          />
          <InputFiled
            type="text"
            id="account_bio"
            value={bio}
            onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
            placeholder="Add your bio"
            label="Bio"
            helperText="Bio must be less than 20 characters."
          />
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

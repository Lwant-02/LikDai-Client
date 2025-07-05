import { useState } from "react";
import { toast } from "sonner";
import { Edit, Save, X } from "lucide-react";

import { Button } from "./ui/button";
import { Settings } from "lucide-react";
import { InputFiled } from "./InputFiled";
import { formatJoinedDate } from "@/util/formatJoinedDate";

interface ProfileTabProps {
  username: string;
  email: string;
  joinDate: string;
  testsCompleted: number;
  setActiveTab: (tab: TabType) => void;
}

export const ProfileTab = ({
  username,
  email,
  joinDate,
  testsCompleted,
  setActiveTab,
}: ProfileTabProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: username,
  });
  const [userData, setUserData] = useState({
    username: username,
  });

  const handleSaveProfile = () => {
    if (!editForm.username.trim()) {
      toast("ⓘ Notice", {
        description: <p className="text-primary">Please fill in all fields!</p>,
      });
      return;
    }

    // Update user data (in a real app, this would be an API call)
    setUserData({
      ...userData,
      username: editForm.username,
    });

    setIsEditing(false);
    toast("✅ Profile Updated", {
      description: (
        <p className="text-primary">
          Your profile has been updated successfully!
        </p>
      ),
      style: { backgroundColor: "#1f7d53" },
    });
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
              onClick={handleSaveProfile}
              className="bg-green/20 hover:bg-green/30 text-green cursor-pointer"
            >
              <Save className="size-4 " />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsEditing(false);
              }}
              className="bg-red/20 hover:bg-red/30 text-red cursor-pointer"
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
            <p className="text-sm opacity-70 mb-1">Member Since</p>
            <p className="font-medium">{formatJoinedDate(joinDate)}</p>
          </div>
          <div>
            <p className="text-sm opacity-70 mb-1">Tests Completed</p>
            <p className="font-medium">{testsCompleted}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
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

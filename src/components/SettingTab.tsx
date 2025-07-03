import { useState } from "react";
import { Save, X } from "lucide-react";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { InputFiled } from "./InputFiled";

export const SettingTab = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");

  const handleSavePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword || !currentPassword) {
      toast("ⓘ Notice", {
        description: <p className="text-primary">Please fill in all fields!</p>,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-primary">
            Passwords do not match! Please try again.
          </p>
        ),
      });
      return;
    }
    toast("✅️ Password Changed", {
      description: (
        <p className="text-primary">Password changed successfully!</p>
      ),
      style: {
        backgroundColor: "#1f7d53 ",
      },
    });
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setIsChangePassword(false);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Account Settings</h2>

      <div className="space-y-4">
        <form
          className="p-4 bg-foreground/20 rounded-lg"
          onSubmit={handleSavePassword}
        >
          <h3 className="font-semibold mb-3">Password</h3>
          {!isChangePassword ? (
            <Button
              variant="outline"
              type="button"
              className="bg-foreground/30 hover:bg-foreground/50 cursor-pointer"
              onClick={() => setIsChangePassword(true)}
            >
              Change Password
            </Button>
          ) : (
            <div className="flex gap-2 w-full justify-end items-center">
              <Button
                variant="outline"
                size="sm"
                type="submit"
                className="bg-green/20 hover:bg-green/30 text-green cursor-pointer"
              >
                <Save className="size-4" />
                Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                type="button"
                onClick={() => setIsChangePassword(false)}
                className="bg-red/20 hover:bg-red/30 text-red cursor-pointer"
              >
                <X className="size-4" />
                Cancel
              </Button>
            </div>
          )}
          {isChangePassword && (
            <div className="mt-4 w-full flex flex-col justify-center items-center gap-4">
              <InputFiled
                type="password"
                id="current_password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current Password"
                label="Current Password"
                helperText="Current password is required."
              />
              <InputFiled
                type="password"
                id="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                label="New Password"
                helperText="Password must be at least 8 characters long."
              />
              <InputFiled
                type="password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                label="Confirm Password"
                helperText="Password must be at least 8 characters long."
              />
            </div>
          )}
        </form>
        <div className="p-4 bg-foreground/20 rounded-lg">
          <h3 className="font-semibold mb-3">Account Management</h3>
          <div className="space-y-2">
            <Button
              variant="destructive"
              className="cursor-pointer justify-start bg-red w-32"
              onClick={() =>
                toast("⚠️ Warning", {
                  description:
                    "This action cannot be undone. Please contact support if you're sure.",
                })
              }
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

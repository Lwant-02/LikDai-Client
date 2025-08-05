import { useState } from "react";
import { Save, X } from "lucide-react";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { InputFiled } from "./InputFiled";
import { AccountDeleteDialog } from "../features/account/components/AccountDeleteDialog";
import { useUpdatePassword } from "@/hooks/useUser";
import { MiniSpinner } from "./MiniSpinner";

export const SettingTab = () => {
  const { isUpdatingPassword, updatePassword } = useUpdatePassword();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword || !currentPassword) {
      toast("ⓘ Notice", {
        description: <p className="text-white">Please fill in all fields!</p>,
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">
            Passwords do not match! Please try again.
          </p>
        ),
      });
      return;
    }
    await updatePassword(
      {
        oldPassword: currentPassword,
        newPassword,
      },
      {
        onSuccess: () => {
          toast("✅️ Success", {
            description: (
              <p className="text-white">
                Password changed successfully! You can now login with your new
                password.
              </p>
            ),
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
      }
    );
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setIsChangePassword(false);
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-bold">Account Settings</h2>

        <div className="space-y-4">
          <form
            className="p-4 bg-foreground/40 rounded-lg"
            onSubmit={handleUpdatePassword}
          >
            <h3 className="font-semibold mb-3">
              {!isChangePassword ? "Password" : "Change Your Password"}
            </h3>
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
                  disabled={isUpdatingPassword}
                  className="bg-green/20 hover:bg-green/30 text-green cursor-pointer w-28"
                >
                  {isUpdatingPassword ? (
                    <MiniSpinner />
                  ) : (
                    <>
                      <Save className="size-4" />
                      Confirm
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => {
                    setIsChangePassword(false);
                    setNewPassword("");
                    setConfirmPassword("");
                    setCurrentPassword("");
                  }}
                  className="bg-red/20 hover:bg-red/30 text-red cursor-pointer w-28"
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
                  helperText="Password must be at least 8 characters long and contain at least one letter and one number."
                />
                <InputFiled
                  type="password"
                  id="confirm_password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  label="Confirm Password"
                  helperText="Password must be at least 8 characters long and contain at least one letter and one number."
                />
              </div>
            )}
          </form>
          <div className="p-4 bg-foreground/40 rounded-lg">
            <h3 className="font-semibold mb-3">Account Management</h3>
            <div className="space-y-2">
              <Button
                variant="destructive"
                className="cursor-pointer justify-start bg-red w-32"
                onClick={() => setIsOpen(true)}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AccountDeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

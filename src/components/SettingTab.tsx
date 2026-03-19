import { useState } from "react";

import { toast } from "sonner";
import { Button } from "./ui/button";
import { InputFiled } from "./InputFiled";
import { AccountDeleteDialog } from "../features/account/components/AccountDeleteDialog";
import { useUpdatePassword } from "@/hooks/useUser";
import { MiniSpinner } from "./MiniSpinner";
import {
  ACCOUNT_PROFILE_CONTENT,
  ACCOUNT_SETTINGS_CONTENT,
} from "@/content/account.content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { COMMON_INPUT_CONTENT } from "@/content/common.content";

export const SettingTab = () => {
  const { isUpdatingPassword, updatePassword } = useUpdatePassword();
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdatePassword = async () => {
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
      },
    );
    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    setIsChangePassword(false);
  };

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-bold">{ACCOUNT_SETTINGS_CONTENT.title}</h2>

        <div className="space-y-4">
          <div className="p-4 bg-foreground/40 rounded-3xl">
            <h3 className="font-semibold mb-3 text-lg">
              {ACCOUNT_SETTINGS_CONTENT.accountManage}
            </h3>

            <Button
              variant="outline"
              type="button"
              className="bg-foreground/30 btn hover:bg-foreground/50 cursor-pointer w-40"
              onClick={() => setIsChangePassword(true)}
            >
              {ACCOUNT_SETTINGS_CONTENT.editPassBtn}
            </Button>
          </div>

          <Dialog open={isChangePassword} onOpenChange={setIsChangePassword}>
            <DialogContent className="sm:max-w-md bg-background/80 overflow-hidden backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
              <DialogHeader>
                <DialogTitle className="mb-4">
                  {ACCOUNT_SETTINGS_CONTENT.editPassDialogTitle}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Dialog
                </DialogDescription>
              </DialogHeader>
              <InputFiled
                type="password"
                id="current_password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder={COMMON_INPUT_CONTENT.currentPasswordPlaceholder}
                label={COMMON_INPUT_CONTENT.currentPassword}
                helperText={COMMON_INPUT_CONTENT.currentPasswordHelperText}
              />
              <InputFiled
                type="password"
                id="new_password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder={COMMON_INPUT_CONTENT.newPasswordPlaceholder}
                label={COMMON_INPUT_CONTENT.newPassword}
                helperText={COMMON_INPUT_CONTENT.passwordHelperText}
              />
              <InputFiled
                type="password"
                id="confirm_password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={COMMON_INPUT_CONTENT.confirmPasswordPlaceholder}
                label={COMMON_INPUT_CONTENT.confirmPassword}
                helperText={COMMON_INPUT_CONTENT.passwordHelperText}
              />
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="destructive"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 btn h-10 border border-primary/10 text-white bg-red-500 cursor-pointer flex justify-center items-center hover:bg-red-500/80 transition-colors duration-300 text-base"
                >
                  {ACCOUNT_PROFILE_CONTENT.cancelBtn}
                </Button>
                <Button
                  variant="destructive"
                  type="submit"
                  disabled={isUpdatingPassword}
                  onClick={handleUpdatePassword}
                  className="mt-3 btn h-10 border border-primary/10 text-primary bg-foreground  cursor-pointer flex justify-center items-center hover:bg-foreground/80 transition-colors duration-300 text-base"
                >
                  {isUpdatingPassword ? (
                    <MiniSpinner />
                  ) : (
                    <>{ACCOUNT_PROFILE_CONTENT.saveBtn}</>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <div className="p-4 bg-foreground/40 rounded-3xl">
            <h3 className="font-semibold mb-3">
              {ACCOUNT_SETTINGS_CONTENT.accountManage}
            </h3>
            <div className="space-y-2">
              <Button
                variant="destructive"
                className="cursor-pointer text-center bg-red w-40 btn"
                onClick={() => setIsOpen(true)}
              >
                {ACCOUNT_SETTINGS_CONTENT.deleteAccountBtn}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <AccountDeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

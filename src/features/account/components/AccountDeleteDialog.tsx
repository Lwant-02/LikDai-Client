import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { authStore } from "@/store/authStore";
import { useDeleteAccount } from "@/hooks/useUser";
import { MiniSpinner } from "../../../components/MiniSpinner";
import { ACCOUNT_SETTINGS_CONTENT } from "@/content/account.content";

interface AccountDeleteDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const AccountDeleteDialog = ({
  isOpen,
  setIsOpen,
}: AccountDeleteDialogProps) => {
  const { setAccessToken } = authStore();
  const { deleteAccount, isDeletingAccount } = useDeleteAccount();

  const handleDeleteAccount = async () => {
    await deleteAccount(undefined, {
      onSuccess: () => {
        setAccessToken(null);
        setIsOpen(false);
        toast("✅️ Success", {
          description: (
            <p className="text-white">Account deleted successfully!</p>
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
    });
    setAccessToken(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-background/80 overflow-hidden backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle>
            {ACCOUNT_SETTINGS_CONTENT.deleteAccountDialogTitle}
          </DialogTitle>
          <DialogDescription className="opacity-70 mt-4">
            {ACCOUNT_SETTINGS_CONTENT.deleteAccountDialogDesc}
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          type="submit"
          disabled={isDeletingAccount}
          onClick={handleDeleteAccount}
          className="btn text-white bg-red/80 w-full cursor-pointer flex justify-center items-center hover:bg-red text-base"
        >
          {isDeletingAccount ? (
            <MiniSpinner />
          ) : (
            <>{ACCOUNT_SETTINGS_CONTENT.deleteAccountDialogBtn}</>
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

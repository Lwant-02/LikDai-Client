import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Spinner } from "./Spinner";
import { authStore } from "@/store/authStore";
import { useDeleteAccount } from "@/hooks/useUser";

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
      <DialogContent className="sm:max-w-md border-none bg-foreground rounded-lg">
        <DialogHeader>
          <DialogTitle>Delete Account Warning ❗️</DialogTitle>
          <DialogDescription className="text-sm opacity-70">
            This action cannot be undone. This will permanently delete your
            account and all of your data. Please confirm to proceed.
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="destructive"
          type="submit"
          disabled={isDeletingAccount}
          onClick={handleDeleteAccount}
          className="mt-3 h-10 text-white rounded-lg bg-red/80 w-full cursor-pointer flex justify-center items-center hover:bg-red text-base"
        >
          {isDeletingAccount ? <Spinner size={6} /> : <>Confirm & Delete</>}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

import { useState } from "react";
import { toast } from "sonner";
import { Edit, Settings } from "lucide-react";

import { Button } from "../../../components/ui/button";
import { InputFiled } from "../../../components/InputFiled";
import { formatJoinedDate } from "@/util/formatJoinedDate";
import { useUpdateBio, useUpdateUsername } from "@/hooks/useUser";
import { queryClient } from "@/lib/queryClient";
import { MiniSpinner } from "../../../components/MiniSpinner";
import {
  DialogContent,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ACCOUNT_PROFILE_CONTENT } from "@/content/account.content";
import { COMMON_INPUT_CONTENT } from "@/content/common.content";

interface ProfileTabProps {
  username: string;
  email: string;
  joinDate: string;
  bio: string;
  testsCompleted: number;
  setActiveTab: (tab: TabType) => void;
}

interface CustomDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleUpdate: () => void;
  isLoading: boolean;
  title: string;
  inputTitle: string;
  placeholder: string;
  type: "text" | "number" | "email" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  helperText: string;
}

const CustomDialog = ({
  isOpen,
  setIsOpen,
  handleUpdate,
  isLoading,
  title,
  placeholder,
  type,
  value,
  onChange,
  inputTitle,
  helperText,
}: CustomDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md bg-background/80 overflow-hidden backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="mb-4">{title}</DialogTitle>
          <DialogDescription className="sr-only">Dialog</DialogDescription>
        </DialogHeader>
        <InputFiled
          type={type}
          id="account_bio"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          label={inputTitle}
          helperText={helperText}
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
            disabled={isLoading}
            onClick={handleUpdate}
            className="mt-3 btn h-10 border border-primary/10 text-primary bg-foreground  cursor-pointer flex justify-center items-center hover:bg-foreground/80 transition-colors duration-300 text-base"
          >
            {isLoading ? (
              <MiniSpinner />
            ) : (
              <>{ACCOUNT_PROFILE_CONTENT.saveBtn}</>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

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
    if (UserUsername.length < 3 || UserUsername.length > 10) {
      toast("ⓘ Notice", {
        description: (
          <p className="text-white">
            Username must be at least 3 characters and not more than 10
            characters.
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
        <h2 className="text-xl font-bold">
          {ACCOUNT_PROFILE_CONTENT.profileInfo}
        </h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setIsEditUsername(true)}
            className="bg-foreground/30 cursor-pointer w-32 btn"
          >
            <Edit className="size-4" />
            {ACCOUNT_PROFILE_CONTENT.editNameBtn}
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsEditBio(true)}
            className="bg-foreground/30 cursor-pointer w-32 btn"
          >
            <Edit className="size-4" />
            {ACCOUNT_PROFILE_CONTENT.editBioBtn}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_PROFILE_CONTENT.name}
          </p>
          <p className="font-medium">{username}</p>
        </div>
        <div>
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_PROFILE_CONTENT.email}
          </p>
          <p className="font-medium">{email}</p>
        </div>
        <div>
          <p className="text-sm opacity-70 mb-1">Bio</p>
          <p className="font-medium">
            {bio ? bio : ACCOUNT_PROFILE_CONTENT.bioDialogHelperText}
          </p>
        </div>
        <div>
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_PROFILE_CONTENT.joinDate}
          </p>
          <p className="font-medium">{formatJoinedDate(joinDate)}</p>
        </div>
        <div>
          <p className="text-sm opacity-70 mb-1">
            {ACCOUNT_PROFILE_CONTENT.testsCompleted}
          </p>
          <p className="font-medium">{testsCompleted}</p>
        </div>
      </div>

      <CustomDialog
        isOpen={isEditBio}
        setIsOpen={setIsEditBio}
        handleUpdate={handleUpdateBio}
        isLoading={isUpdatingBio}
        title={ACCOUNT_PROFILE_CONTENT.bioDialogTitle}
        inputTitle={"Bio"}
        placeholder={ACCOUNT_PROFILE_CONTENT.bioDialogPlaceholder}
        type="text"
        value={userBio}
        onChange={(e) => setUserBio(e.target.value)}
        helperText={ACCOUNT_PROFILE_CONTENT.bioDialogHelperText}
      />

      <CustomDialog
        isOpen={isEditUsername}
        setIsOpen={setIsEditUsername}
        handleUpdate={handleUpdateUsername}
        isLoading={isUpdatingUsername}
        title={ACCOUNT_PROFILE_CONTENT.editNameDialogTitle}
        inputTitle={COMMON_INPUT_CONTENT.name}
        placeholder={COMMON_INPUT_CONTENT.namePlaceholder}
        type="text"
        value={UserUsername}
        onChange={(e) => setUserUsername(e.target.value)}
        helperText={COMMON_INPUT_CONTENT.nameHelperText}
      />

      <div className="mt-6">
        <Button
          variant="outline"
          className="bg-foreground/30 hover:bg-foreground/50 cursor-pointer btn w-32"
          onClick={() => setActiveTab("settings")}
        >
          <Settings className="size-4" />
          {ACCOUNT_PROFILE_CONTENT.tabs.settings}
        </Button>
      </div>
    </div>
  );
};

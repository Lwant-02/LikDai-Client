import { cn } from "@/lib/utils";
import { formatJoinedDate } from "@/util/formatJoinedDate";
import { useState } from "react";
import { CertificateSubmitDialog } from "./CertificateSubmitDialog";

interface AchievementProps {
  category: AchievementCategory;
  name: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt: string | Date | undefined;
}

const getIcon = (category: string) => {
  switch (category) {
    case "speed":
      return "svg/speed.svg";
    case "accuracy":
      return "svg/accuracy.svg";
    case "consistency":
      return "svg/consistency.svg";
    case "practice":
      return "svg/practice.svg";
    case "certificate":
      return "svg/certificate.svg";
  }
};

export const Achievement = ({
  name,
  requirement,
  unlocked,
  category,
  unlockedAt,
}: AchievementProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  return (
    <>
      <div
        className={cn(
          "p-4 rounded-lg border ",
          unlocked
            ? "border-yellow bg-yellow/10"
            : "border-primary/20 bg-foreground/20 opacity-60"
        )}
      >
        <div className="flex items-center gap-3">
          <div
            className={`rounded-full shrink-0 flex justify-center items-center  w-10 h-10 ${
              unlocked ? "bg-yellow/20" : "bg-foreground/30"
            }`}
          >
            <img
              src={getIcon(category)}
              alt="Logo"
              className="size-6 object-cover"
            />
          </div>
          <div className="flex justify-between items-center w-full">
            <div>
              <h3 className="font-bold">{name}</h3>
              <p className="text-sm opacity-70">{requirement}</p>
            </div>
            {category === "certificate" && (
              <div className="flex items-center gap-2 ">
                <button
                  type="button"
                  disabled={unlocked}
                  className={cn(
                    "text-sm text-green",
                    unlocked
                      ? " cursor-not-allowed"
                      : "cursor-pointer hover:underline"
                  )}
                  onClick={() => setIsDialogOpen(true)}
                >
                  Get Certificate
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-xs opacity-70">
            Unlocked at:{" "}
            {unlockedAt ? formatJoinedDate(unlockedAt as string) : "N/A"}
          </span>
          <span
            className={`text-xs ${unlocked ? "text-green" : "text-primary/50"}`}
          >
            {unlocked ? "Unlocked" : "Locked"}
          </span>
        </div>
      </div>
      <CertificateSubmitDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
      />
    </>
  );
};

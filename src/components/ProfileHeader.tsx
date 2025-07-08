import { formatName } from "@/util/formatName";
import { formatJoinedDate } from "@/util/formatJoinedDate";

interface ProfileHeaderProps {
  id: string;
  username: string;
  joinedAt: string;
  averageWpm?: number;
}

export const ProfileHeader = ({ username, joinedAt }: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="relative">
          <div className="size-16 rounded-full border-2 border-yellow flex justify-center items-center ">
            <p className="text-2xl font-bold text-yellow">
              {formatName(username)}
            </p>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            85
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-sm opacity-70">
            Member since - {formatJoinedDate(joinedAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

import { formatName } from "@/util/formatName";
import { formatJoinedDate } from "@/util/formatJoinedDate";

interface ProfileHeaderProps {
  id: string;
  username: string;
  joinedAt: string;
  averageWpm: number;
  bio: string;
}

export const ProfileHeader = ({
  username,
  joinedAt,
  averageWpm,
  bio,
}: ProfileHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row  items-center mb-8">
      <div className="flex items-center gap-4 mb-4 md:mb-0">
        <div className="relative">
          <div className="size-16 rounded-full border-2 border-yellow flex justify-center items-center ">
            <p className="text-2xl font-bold text-yellow">
              {formatName(username)}
            </p>
          </div>
          <div className="absolute -bottom-1 -right-1 bg-green text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {averageWpm}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-sm opacity-70">
            Member since - {formatJoinedDate(joinedAt)}
          </p>
        </div>
      </div>
      <div className=" w-auto md:mb-0 mb-4 text-center md:ml-96">
        <h1 className="text-xl font-bold">User Bio</h1>
        <p className="text-sm opacity-70 ">
          {bio ? bio : "This user has not set the bio yet."}
        </p>
      </div>
    </div>
  );
};

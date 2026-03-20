import { ACCOUNT_HISTORY_CONTENT } from "@/content/account.content";
import { useGetPublicHistory } from "@/hooks/useProfile";

interface ProfileHistoryTabProps {
  username: string;
}

export const ProfileHistoryTab = ({ username }: ProfileHistoryTabProps) => {
  const { history, isFetchingHistory } = useGetPublicHistory({ username });

  if (isFetchingHistory) {
    return (
      <div className="w-full h-96  flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {ACCOUNT_HISTORY_CONTENT.publicHistory}
      </h2>

      <div className="overflow-x-auto rounded-3xl border border-primary/20 overflow-hidden bg-foreground/80">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left py-3 px-5 font-medium opacity-70">
                {ACCOUNT_HISTORY_CONTENT.date}
              </th>
              <th className="text-left py-3 px-5 font-medium opacity-70">
                {ACCOUNT_HISTORY_CONTENT.wpm}
              </th>
              <th className="text-left py-3 px-5 font-medium opacity-70">
                {ACCOUNT_HISTORY_CONTENT.accuracy}
              </th>
              <th className="text-left py-3 px-5 font-medium opacity-70">
                {ACCOUNT_HISTORY_CONTENT.language}
              </th>
              <th className="text-left py-3 px-5 font-medium opacity-70">
                {ACCOUNT_HISTORY_CONTENT.lessonLevel}
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((test, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 hover:bg-foreground/20 transition-colors"
              >
                <td className="py-3 px-5">
                  {new Date(test.createdAt).toLocaleDateString()}
                </td>
                <td className="py-3 px-5 font-medium text-blue">{test.wpm}</td>
                <td className="py-3 px-5 font-medium text-green">
                  {test.accuracy}%
                </td>
                <td className="py-3 px-5">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        test.mode === "eng"
                          ? "/images/UK-Flag.jpg"
                          : "/svg/Shan-Flag.svg"
                      }
                      alt={test.mode === "eng" ? "English" : "Shan"}
                      className="size-4 rounded-full object-cover"
                    />
                    <span>{test.mode === "eng" ? "English" : "Shan"}</span>
                  </div>
                </td>
                <td className="py-3 px-5 font-medium text-yellow capitalize">
                  {test.lessonLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {history.length === 0 && (
        <div className="w-full h-96 flex justify-center items-center ">
          <p className="text-center text-lg opacity-70">
            {ACCOUNT_HISTORY_CONTENT.noPublicHistory}
          </p>
        </div>
      )}
    </div>
  );
};

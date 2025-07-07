import { useGetHistorys } from "@/hook/useUser";
import { useLocation } from "react-router-dom";

export const HistoryTab = () => {
  const { history, isFetchingHistory } = useGetHistorys();
  const { pathname } = useLocation();

  if (isFetchingHistory) {
    return (
      <div className="w-full h-96 my-28 flex justify-center items-center ">
        <div className="loader" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {pathname.endsWith("/account")
          ? "Your Recent Tests"
          : "User's Recent Tests"}
      </h2>
      {history.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary/20">
                <th className="text-left py-2 px-4 font-medium opacity-70">
                  Date
                </th>
                <th className="text-left py-2 px-4 font-medium opacity-70">
                  WPM
                </th>
                <th className="text-left py-2 px-4 font-medium opacity-70">
                  Accuracy
                </th>
                <th className="text-left py-2 px-4 font-medium opacity-70">
                  Language
                </th>
              </tr>
            </thead>
            <tbody>
              {history.map((test, index) => (
                <tr
                  key={index}
                  className="border-b border-primary/10 hover:bg-foreground/20 transition-colors"
                >
                  <td className="py-3 px-4">
                    {new Date(test.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 font-medium text-blue">
                    {test.wpm}
                  </td>
                  <td className="py-3 px-4 font-medium text-green">
                    {test.accuracy}%
                  </td>
                  <td className="py-3 px-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center ">
          <p className="text-center text-lg opacity-70">
            You do not have any test history yet!
          </p>
        </div>
      )}
    </div>
  );
};

import { useLocation } from "react-router-dom";

const userData = {
  recentTests: [
    { date: "2023-06-15", wpm: 88, accuracy: 97.2, mode: "eng" },
    { date: "2023-06-14", wpm: 92, accuracy: 95.8, mode: "eng" },
    { date: "2023-06-12", wpm: 78, accuracy: 98.1, mode: "shan" },
    { date: "2023-06-10", wpm: 85, accuracy: 96.3, mode: "eng" },
    { date: "2023-06-08", wpm: 90, accuracy: 96.7, mode: "eng" },
  ],
};

export const HistoryTab = () => {
  const { pathname } = useLocation();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">
        {pathname.endsWith("/account")
          ? "Your Recent Tests"
          : "User's Recent Tests"}
      </h2>

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
            {userData.recentTests.map((test, index) => (
              <tr
                key={index}
                className="border-b border-primary/10 hover:bg-foreground/20 transition-colors"
              >
                <td className="py-3 px-4">
                  {new Date(test.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 font-medium text-blue">{test.wpm}</td>
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
    </div>
  );
};

import { settingStore } from "@/store/settingStore";
import { useEffect } from "react";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = settingStore();
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [theme]);
  return <>{children}</>;
};

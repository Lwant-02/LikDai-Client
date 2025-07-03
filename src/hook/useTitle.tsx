import { useEffect } from "react";

export const useTitle = ({ pathName }: { pathName: string }): string => {
  const routeTitles = {
    "/": "LikDai - Pro | Master Shan Typing",
    "/about": "About | LikDai - Pro",
    "/typing-test": "Typing | LikDai - Pro",
    "/leaderboards": "Leaderboards | LikDai - Pro",
    "/account": "Account | LikDai - Pro",
    "/login": "Login | LikDai - Pro",
  };
  const title = routeTitles[pathName as keyof typeof routeTitles];
  useEffect(() => {
    document.title = title;
  }, [title]);

  return title;
};

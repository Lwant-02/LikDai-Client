import { useEffect } from "react";

interface UseTitleProps {
  pathName: string;
}

export const useTitle = ({ pathName }: UseTitleProps) => {
  let title = "";
  const routeTitles: Record<string, string> = {
    "/": "LikDai - Pro | Master Shan Typing",
    "/about": "About | LikDai - Pro",
    "/typing-test": "Typing | LikDai - Pro",
    "/leaderboards": "Leaderboards | LikDai - Pro",
    "/account": "Account | LikDai - Pro",
    "/login": "Login | LikDai - Pro",
  };
  if (routeTitles[pathName]) {
    title = routeTitles[pathName];
  } else if (pathName.includes("/profile/")) {
    const username = pathName.split("/")[2];
    title = `${username} | Profile`;
  } else {
    title = "LikDai - Pro";
  }
  useEffect(() => {
    document.title = title;
  }, [title]);
};

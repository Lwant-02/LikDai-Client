export const formatTotalPracticeTime = (totalSeconds: number): string => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let parts = "";
  if (hours > 0) parts = `${hours} hour${hours !== 1 ? "s" : ""}`;
  if (minutes > 0) parts = `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  if (seconds > 0) parts = `${seconds} second${seconds !== 1 ? "s" : ""}`;
  if (seconds === 0 && minutes === 0 && hours === 0) parts = "0 second";

  return parts;
};

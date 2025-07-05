export const formatJoinedDate = (dateStr: string | Date): string => {
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch (e) {
    return dateStr as string;
  }
};

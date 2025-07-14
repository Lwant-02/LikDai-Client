import { shanWords } from "@/constant/shan.words.constant";

export const getShanRandomWords = (count: number) => {
  const shuffled = [...shanWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(" ");
};

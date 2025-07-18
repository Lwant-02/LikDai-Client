import { englishWords } from "@/resources/eng.words";

export const getRandomWords = (count: number) => {
  const shuffled = [...englishWords].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join(" ");
};

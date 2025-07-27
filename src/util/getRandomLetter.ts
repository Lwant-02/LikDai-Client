import { englishLetters } from "@/resources/eng.letter";

export const getRandomLetter = (): string => {
  const shuffled = [...englishLetters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 28).join(" ");
};

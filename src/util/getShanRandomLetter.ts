import { shanLetters } from "@/resources/shan.letter";

export const getShanRandomLetter = (): string => {
  const shuffled = [...shanLetters].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 19).join(" ");
};

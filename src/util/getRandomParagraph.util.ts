import { englishParagraphs } from "@/constant/paragraph.constant";

export const getRandomParagraph = (): string => {
  return englishParagraphs[
    Math.floor(Math.random() * englishParagraphs.length)
  ];
};

import { englishParagraphs } from "@/resources/eng.paragraph";

export const getRandomParagraph = (): string => {
  return englishParagraphs[
    Math.floor(Math.random() * englishParagraphs.length)
  ];
};

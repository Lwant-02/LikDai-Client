import { shanParagraphs } from "@/resources/shan.paragraph";

export const getShanRandomParagraph = (): string => {
  return shanParagraphs[Math.floor(Math.random() * shanParagraphs.length)];
};

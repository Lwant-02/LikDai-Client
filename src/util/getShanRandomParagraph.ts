import { shanParagraphs } from "@/constant/shan.paragraph.constant";

export const getShanRandomParagraph = (): string => {
  return shanParagraphs[Math.floor(Math.random() * shanParagraphs.length)];
};

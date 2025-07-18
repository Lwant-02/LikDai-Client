import { shanQuotes } from "@/resources/shan.quotes";

export const getShanRandomQuote = (): string => {
  return shanQuotes[Math.floor(Math.random() * shanQuotes.length)];
};

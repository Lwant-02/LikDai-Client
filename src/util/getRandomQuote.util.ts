import { englishQuotes } from "@/resources/eng.quotes";

export const getRandomQuote = (): string => {
  return englishQuotes[Math.floor(Math.random() * englishQuotes.length)];
};

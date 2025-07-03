import { englishQuotes } from "@/constant/quotes.constant";

export const getRandomQuote = (): string => {
  return englishQuotes[Math.floor(Math.random() * englishQuotes.length)];
};

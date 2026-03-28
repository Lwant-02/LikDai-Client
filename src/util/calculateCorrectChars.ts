// Normalize typographic/smart quotes to plain ASCII equivalents.
// The target text may contain curly apostrophes (U+2019 etc.) from the content
// file, while the user always types straight ASCII quotes/apostrophes.
const normalizeQuotes = (text: string): string =>
  text
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // curly single → '
    .replace(/[\u201C\u201D\u201E]/g, '"'); // curly double → "

export const calculateCorrectChars = (
  userInput: string,
  targetText: string
) => {
  const normalizedTarget = normalizeQuotes(targetText);
  let count = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === normalizedTarget[i]) {
      count++;
    }
  }
  return count;
};

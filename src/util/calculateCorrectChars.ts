export const calculateCorrectChars = (
  userInput: string,
  targetText: string
) => {
  let count = 0;
  for (let i = 0; i < userInput.length; i++) {
    if (userInput[i] === targetText[i]) {
      count++;
    }
  }
  return count;
};

import React, { useState, useEffect } from "react";

function TypingGame() {
  const [userInput, setUserInput] = useState("");
  const [targetText, setTargetText] = useState(
    "The quick brown fox jumps over the lazy dog"
  );
  const [totalTypedWords, setTotalTypedWords] = useState(0);
  const [incorrectChar, setIncorrectChar] = useState(0);
  const [totalChar, setTotalChar] = useState(0);

  useEffect(() => {
    const input = userInput;
    const target = targetText;

    // --- Calculate Total Typed Words (based on user's input words) ---
    // Split the user input by spaces. This will give us an array of words the user has typed.
    // .filter(word => word.length > 0) is important to handle multiple spaces
    // and leading/trailing spaces correctly, preventing empty strings from being counted as words.
    const inputWords = input.split(" ").filter((word) => word.length > 0);

    // The total typed words is simply the number of "words" in the user's input.
    // If the input ends with a space, it implies the user has completed a word and is
    // moving to the next, so we count it.
    // If it doesn't end with a space, the last "word" might be partial, but we still count it
    // as an attempted word.
    let currentWordCount = inputWords.length;

    // Special handling for when the user input is empty or only contains spaces
    if (input.trim() === "") {
      currentWordCount = 0;
    }

    setTotalTypedWords(currentWordCount);

    // --- Calculate Incorrect Characters and Total Characters (one by one) ---
    let currentIncorrectCharCount = 0;
    // Iterate character by character up to the length of the user input
    for (let i = 0; i < input.length; i++) {
      // If the character at the current position in userInput does not match
      // the character at the same position in targetText, increment incorrect count.
      // Also, ensure target[i] exists to prevent errors if userInput is longer than targetText.
      if (target[i] && input[i] !== target[i]) {
        currentIncorrectCharCount++;
      }
      // If userInput is longer than targetText, the extra characters are also incorrect.
      if (!target[i] && input[i]) {
        currentIncorrectCharCount++;
      }
    }
    setIncorrectChar(currentIncorrectCharCount);

    // Total characters typed is simply the length of the userInput string
    setTotalChar(input.length);
  }, [userInput, targetText]); // Depend on userInput and targetText to re-run when they change

  return (
    <div>
      <p>Target Text: {targetText}</p>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        rows={5}
        cols={50}
      />
      <p>Total Typed Words (including partial/incorrect): {totalTypedWords}</p>
      <p>Incorrect Characters: {incorrectChar}</p>
      <p>Total Characters Typed: {totalChar}</p>
    </div>
  );
}

export default TypingGame;

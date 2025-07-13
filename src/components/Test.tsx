import { useTimer } from "@/hook/useTimer";
import { useState } from "react";

export const TypingGame = () => {
  const targetText = "The quick brown fox jumps over the lazy dog"; // Your quote
  const [typedText, setTypedText] = useState("");
  const { elapsedTime, finished } = useTimer({ value: typedText, targetText });
  // Start timer on first input
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTypedText(value);
  };

  return (
    <div>
      <p>
        <strong>Target:</strong> {targetText}
      </p>
      <textarea
        placeholder="Start typing..."
        value={typedText}
        onChange={handleChange}
        disabled={finished}
        rows={4}
        cols={50}
      />
      <p>
        {finished ? `Finished in ${elapsedTime}s` : `Time: ${elapsedTime}s`}
      </p>
    </div>
  );
};

import { KeyMaps } from "@/keymaps/KeyMaps";

const normalizeKey = (key: string): string => {
  const map: Record<string, string> = {
    "\u2018": "'", // LEFT  SINGLE QUOTATION MARK  '
    "\u2019": "'", // RIGHT SINGLE QUOTATION MARK  '
    "\u201A": "'", // SINGLE LOW-9 QUOTATION MARK  ‚
    "\u201B": "'", // SINGLE HIGH-REVERSED-9 MARK  ‛
    "\u201C": '"', // LEFT  DOUBLE QUOTATION MARK  “
    "\u201D": '"', // RIGHT DOUBLE QUOTATION MARK  ”
    "\u201E": '"', // DOUBLE LOW-9 QUOTATION MARK  „
    "\u2032": "'", // PRIME  ′
    "\u2035": "'", // REVERSED PRIME  ‵
  };
  return map[key] ?? key;
};

export const handleEngKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  playKeySound: () => void,
  setUserInput: (input: string) => void,
  userInput: string,
) => {
  const rawKey = e.key;
  const key = normalizeKey(rawKey);

  if (rawKey === "Backspace" || rawKey.length === 1) {
    playKeySound();
  }

  if (rawKey === "Backspace") {
    setUserInput(userInput.slice(0, -1));
  } else if (key.length === 1) {
    setUserInput(userInput + key);
  }

  e.preventDefault();
};

export const handleShanKeyDown = (
  e: React.KeyboardEvent<HTMLInputElement>,
  playKeySound: () => void,
  setUserInput: (input: string) => void,
  userInput: string,
  selectedKeyMap: keyof typeof KeyMaps,
) => {
  const key = e.key;
  const keyMap = KeyMaps[selectedKeyMap];
  const mappedKey = key === " " ? " " : keyMap.map[key];

  if (key === "Backspace" || key.length === 1) {
    playKeySound();
  }
  if (key === "Backspace") {
    setUserInput(userInput.slice(0, -1));
  } else if (mappedKey && key.length === 1) {
    setUserInput(userInput + mappedKey);
  }
  e.preventDefault();
};

import { create } from "zustand";

interface ResultState {
  finalWpm: number | null;
  finalAccuracy: number | null;
  finalRawWpm: number | null;
  finalConsistency: number | null;
  finalTimeTaken: number | null; // In seconds
  finalCorrectCharacters: number | null;
  finalTestType: TestType | null;
  finalMode: LanguageMode | null;
  finalTypedCharacters: number | null;
  setFinalTypedCharacters: (chars: number | null) => void;
  setFinalMode: (mode: LanguageMode | null) => void;
  setFinalWpm: (wpm: number | null) => void;
  setFinalAccuracy: (accuracy: number | null) => void;
  setFinalRawWpm: (rawWpm: number | null) => void;
  setFinalConsistency: (consistency: number | null) => void;
  setFinalTimeTaken: (time: number | null) => void;
  setFinalCorrectCharacters: (chars: number | null) => void;
  setFinalTestType: (type: TestType | null) => void;
}

export const resultStore = create<ResultState>((set) => ({
  finalWpm: null,
  finalAccuracy: null,
  finalRawWpm: null,
  finalConsistency: null,
  finalTimeTaken: null,
  finalCorrectCharacters: null,
  finalTestType: null,
  finalMode: null,
  finalTypedCharacters: null,
  setFinalTypedCharacters: (chars) => set({ finalTypedCharacters: chars }),
  setFinalMode: (mode) => set({ finalMode: mode }),
  setFinalWpm: (wpm) => set({ finalWpm: wpm }),
  setFinalAccuracy: (accuracy) => set({ finalAccuracy: accuracy }),
  setFinalRawWpm: (rawWpm) => set({ finalRawWpm: rawWpm }),
  setFinalConsistency: (consistency) => set({ finalConsistency: consistency }),
  setFinalTimeTaken: (time) => set({ finalTimeTaken: time }),
  setFinalCorrectCharacters: (chars) => set({ finalCorrectCharacters: chars }),
  setFinalTestType: (type) => set({ finalTestType: type }),
}));

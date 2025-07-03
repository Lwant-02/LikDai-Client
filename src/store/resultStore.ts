import { create } from "zustand";

interface ResultState {
  wpm: number;
  accuracy: number;
  raw: number;
  characters: number;
  correctChars: number;
  timeTaken: number;
  testType: string;
  wordCount: number;
  consistency: number;
  totalWords: number;
  errorWords: number;
  
  setResults: (results: Omit<ResultState, 'setResults'>) => void;
}

export const useResultStore = create<ResultState>((set) => ({
  wpm: 0,
  accuracy: 0,
  raw: 0,
  characters: 0,
  correctChars: 0,
  timeTaken: 0,
  testType: "words",
  wordCount: 0,
  consistency: 0,
  totalWords: 0,
  errorWords: 0,
  
  setResults: (results) => set(results),
}));
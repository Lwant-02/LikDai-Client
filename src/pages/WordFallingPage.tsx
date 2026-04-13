import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

import { cn } from "@/lib/utils";
import { useSettingStore } from "@/store/settingStore";
import { useKeySound } from "@/hooks/useKeySound";
import { useGameSound } from "@/hooks/useGameSound";
import { handleEngKeyDown, handleShanKeyDown } from "@/util/handleKeydown";
import { englishWords } from "@/resources/eng.words";
import { shanWords } from "@/resources/shan.words";
import { HeadsUpDisplay } from "@/components/HeadsUpDisplay";
import { LevelUp } from "@/components/LevelUp";
import { ComboDisplay } from "@/components/ComboDisplay";
import { GameOver } from "@/components/GameOver";
import { PauseOverlay } from "@/components/PauseOverlay";
import { StartScreenOverlay } from "@/components/StartScreenOverlay";
import { DIFFICULTY_CONFIG } from "@/util/gameConfig";
import { LESSONS_CONTENT } from "@/content/lessons.content";

interface FallingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  isCaught: boolean;
}

export const WordFallingPage = () => {
  const { playKeySound } = useKeySound();
  const {
    playBackground,
    pauseBackground,
    resumeBackground,
    playGameOver,
    stopBackground,
  } = useGameSound({
    backgroundPath: "/sounds/game-background.mp3",
    gameOverPath: "/sounds/game-over.mp3",
  });
  const { mode, lessonLevel } = useSettingStore();
  const { selectedKeyMap, setUserInput, userInput } = useSettingStore();

  // Game state
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState(1);
  const [fallingWords, setFallingWords] = useState<FallingWord[]>([]);
  const [currentTarget, setCurrentTarget] = useState<FallingWord | null>(null);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [wordsCaught, setWordsCaught] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number; vx: number; vy: number }[]
  >([]);

  // Refs
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const wordIdCounter = useRef(0);
  const fallingWordsRef = useRef<FallingWord[]>([]);

  // Keep ref in sync for the game loop
  useEffect(() => {
    fallingWordsRef.current = fallingWords;
  }, [fallingWords]);

  // Get words based on mode
  const wordList = mode === "eng" ? englishWords : shanWords;

  // Get random word based on difficulty
  const getRandomWord = () => {
    const config = DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG];
    const filteredWords = wordList.filter(
      (word) =>
        word.length >= config.wordLength.min &&
        word.length <= config.wordLength.max,
    );
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex] || wordList[0];
  };

  // Spawn a new falling word
  const spawnWord = () => {
    if (!gameAreaRef.current) return;

    const gameWidth = gameAreaRef.current.clientWidth;
    const word = getRandomWord();
    const maxX = gameWidth - 150; // Keep within bounds
    const randomX = Math.random() * maxX;

    const config = DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG];

    const newFallingWord: FallingWord = {
      id: wordIdCounter.current++,
      text: word,
      x: randomX,
      y: -50,
      speed: config.fallSpeed * (1 + level * 0.05),
      isCaught: false,
    };

    setFallingWords((prev) => [...prev, newFallingWord]);
  };

  // Create explosion particles
  const createParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
      );
    }, 1000);
  };

  // Handle word caught
  const handleWordCaught = (word: FallingWord) => {
    createParticles(word.x + 50, word.y + 20);
    playKeySound();

    const comboMultiplier = 1 + combo * 0.1;
    const points = Math.floor(word.text.length * 10 * comboMultiplier);

    setScore((prev) => prev + points);
    setCombo((prev) => prev + 1);
    setMaxCombo((prev) => Math.max(prev, combo + 1));
    setWordsCaught((prev) => prev + 1);
    setUserInput("");

    // Check for level up
    if (wordsCaught > 0 && (wordsCaught + 1) % 10 === 0) {
      setLevel((prev) => prev + 1);
      setShowLevelUp(true);
      setTimeout(() => setShowLevelUp(false), 2000);
    }

    // Remove the caught word
    setFallingWords((prev) => prev.filter((w) => w.id !== word.id));
    setCurrentTarget(null);
  };

  // Auto-target: find the falling word whose text starts with userInput
  useEffect(() => {
    if (!isGameStarted || isPaused || !userInput) {
      setCurrentTarget(null);
      return;
    }

    // Find word whose text starts with current input
    const target = fallingWords.find((word) =>
      word.text.toLowerCase().startsWith(userInput.toLowerCase()),
    );

    setCurrentTarget(target || null);
  }, [userInput, fallingWords, isGameStarted, isPaused]);

  // Check if user input matches any falling word fully
  useEffect(() => {
    if (!isGameStarted || isPaused || !userInput) return;

    const matchingWord = fallingWords.find(
      (word) => word.text.toLowerCase() === userInput.toLowerCase(),
    );

    if (matchingWord) {
      handleWordCaught(matchingWord);
    }
  }, [userInput, fallingWords, isGameStarted, isPaused, handleWordCaught]);

  // Game loop - update word positions
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    const gameLoop = () => {
      const currentWords = fallingWordsRef.current;
      const updated = currentWords.map((word) => ({
        ...word,
        y: word.y + word.speed * 16,
      }));

      const missed = updated.filter(
        (word) => word.y > (gameAreaRef.current?.clientHeight || 600),
      );

      const remaining = updated.filter(
        (word) => word.y <= (gameAreaRef.current?.clientHeight || 600),
      );

      if (missed.length > 0) {
        setLives((l) => {
          const newLives = l - missed.length;
          if (newLives <= 0) {
            setIsGameOver(true);
            setIsPaused(true);
            playGameOver();
          }
          return Math.max(0, newLives);
        });
        setCombo(0);
        setUserInput("");
        setCurrentTarget(null);
      }

      setFallingWords(remaining);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isGameStarted, isPaused, setUserInput]);

  // Spawn words interval
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    const config = DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG];
    const adjustedSpawnRate = config.spawnRate / (1 + level * 0.05);

    spawnIntervalRef.current = setInterval(spawnWord, adjustedSpawnRate);

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [isGameStarted, isPaused, lessonLevel, level, spawnWord]);

  // Start game
  const startGame = () => {
    setIsPaused(false);
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setLives(5);
    setLevel(1);
    setFallingWords([]);
    setCurrentTarget(null);
    setCombo(0);
    setMaxCombo(0);
    setWordsCaught(0);
    setUserInput("");
    wordIdCounter.current = 0;

    // Initial spawn
    setTimeout(spawnWord, 500);

    // Play background music
    playBackground();
  };

  // Toggle pause
  const togglePause = () => {
    if (isGameOver) return;
    setIsPaused((prev) => {
      const next = !prev;
      if (next) {
        pauseBackground();
      } else {
        resumeBackground();
      }
      return next;
    });
  };

  // Focus input on mount and when paused state changes
  useEffect(() => {
    if (isGameStarted && !isPaused) {
      inputRef.current?.focus();
    }
  }, [isGameStarted, isPaused]);

  // Clean up sounds on unmount
  useEffect(() => {
    return () => {
      stopBackground();
    };
  }, [stopBackground]);

  // Keyboard handler wrapper
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isGameStarted || isPaused) return;

    if (mode === "eng") {
      handleEngKeyDown(e, playKeySound, setUserInput, userInput);
    } else {
      handleShanKeyDown(
        e,
        playKeySound,
        setUserInput,
        userInput,
        selectedKeyMap,
      );
    }
  };

  return (
    <>
      <Helmet>
        <title>Word Falling Game - LikDai</title>
        <meta
          name="description"
          content="Play the Word Falling typing game. Type falling words before they reach the bottom!"
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div
          ref={gameAreaRef}
          className="layout relative rounded-4xl overflow-hidden border border-purple/50 mt-12"
          style={{ height: "calc(100vh - 100px)" }}
        >
          <HeadsUpDisplay
            score={score}
            lives={lives}
            level={level}
            isPaused={isPaused}
            isGameOver={isGameOver}
            togglePause={togglePause}
          />
          <LevelUp showLevelUp={showLevelUp} />

          <ComboDisplay combo={combo} maxCombo={maxCombo} />

          <div className="absolute inset-0">
            <AnimatePresence>
              {fallingWords.map((word) => {
                const isTargeted = currentTarget?.id === word.id;
                const matchLen = isTargeted ? userInput.length : 0;

                return (
                  <motion.div
                    key={word.id}
                    className={cn(
                      "absolute px-3 py-1.5 rounded-xl font-medium text-lg whitespace-nowrap",
                      "backdrop-blur-sm border transition-colors duration-150",
                      isTargeted
                        ? "bg-red-500/20 border-red-400/60 shadow-[0_0_20px_-4px_rgba(239,68,68,0.5)]"
                        : "bg-purple/10 border-purple/50",
                    )}
                    style={{
                      left: word.x,
                      top: word.y,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{
                      scale: 1.5,
                      opacity: 0,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Render letters individually for partial highlight */}
                    <span className="text-lg font-semibold tracking-wide">
                      {word.text.split("").map((char, i) => (
                        <span
                          key={i}
                          className={cn(
                            "transition-colors duration-100",
                            isTargeted && i < matchLen
                              ? "text-red-400 drop-shadow-[0_0_6px_rgba(234,179,8,0.8)]"
                              : isTargeted
                                ? "text-red-200/70"
                                : "text-purple",
                          )}
                        >
                          {char}
                        </span>
                      ))}
                    </span>

                    {/* Targeting indicator */}
                    {isTargeted && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-yellow"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40">
            <AnimatePresence mode="wait">
              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 5 }}
                  className="bg-background/40 backdrop-blur-xl px-10 py-4 rounded-3xl border border-purple/50 shadow-[0_0_40px_-10px_rgba(234,179,8,0.3)]"
                >
                  <span className="text-3xl font-bold text-purple  drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
                    {userInput}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="absolute inset-0 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-2 h-2 bg-yellow rounded-full"
                initial={{ x: particle.x, y: particle.y, opacity: 1 }}
                animate={{
                  x: particle.x + particle.vx * 20,
                  y: particle.y + particle.vy * 20,
                  opacity: 0,
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            ))}
          </div>

          {!isGameStarted && !isGameOver && (
            <StartScreenOverlay
              startGame={startGame}
              title={LESSONS_CONTENT.categories[1].title}
            />
          )}

          {isPaused && !isGameOver && (
            <PauseOverlay togglePause={togglePause} />
          )}

          {isGameOver && (
            <GameOver
              score={score}
              level={level}
              wordsCaught={wordsCaught}
              maxCombo={maxCombo}
              restartGame={startGame}
            />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          id="word-falling-input"
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute pointer-events-none"
          aria-label="Game typing input"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          disabled={!isGameStarted || isPaused}
        />
      </div>
    </>
  );
};

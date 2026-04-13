import { useEffect, useRef, useState, useCallback } from "react";
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

type SpawnEdge = "top" | "left" | "right";

interface EnemyWord {
  id: number;
  text: string;
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  isTargeted: boolean;
}

interface Bullet {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  createdAt: number;
}

interface Explosion {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

// Turret position (bottom center, relative)
const TURRET_BOTTOM = 60; // px from bottom

export const ShooterPage = () => {
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
  const { mode } = useSettingStore();
  const { selectedKeyMap, setUserInput, userInput } = useSettingStore();

  // Game state
  const [isPaused, setIsPaused] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [level, setLevel] = useState(1);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [wordsCaught, setWordsCaught] = useState(0);
  const [showLevelUp, setShowLevelUp] = useState(false);

  // Shooter-specific state
  const [enemies, setEnemies] = useState<EnemyWord[]>([]);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const [explosions, setExplosions] = useState<Explosion[]>([]);
  const [turretAngle, setTurretAngle] = useState(-90); // degrees, -90 = pointing up
  const [currentTarget, setCurrentTarget] = useState<EnemyWord | null>(null);

  // Refs
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const wordIdCounter = useRef(0);
  const enemiesRef = useRef<EnemyWord[]>([]);

  // Keep ref in sync
  useEffect(() => {
    enemiesRef.current = enemies;
  }, [enemies]);

  // Word list
  const wordList = mode === "eng" ? englishWords : shanWords;

  const getRandomWord = useCallback(() => {
    const config =
      DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG] ||
      DIFFICULTY_CONFIG[4];
    const filteredWords = wordList.filter(
      (word) =>
        word.length >= config.wordLength.min &&
        word.length <= config.wordLength.max,
    );
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex] || wordList[0];
  }, [level, wordList]);

  // --- Spawn enemies from edges ---
  const spawnEnemy = useCallback(() => {
    if (!gameAreaRef.current) return;

    const gameWidth = gameAreaRef.current.clientWidth;
    const gameHeight = gameAreaRef.current.clientHeight;
    const word = getRandomWord();
    const config =
      DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG] ||
      DIFFICULTY_CONFIG[4];
    const speed = config.fallSpeed * (1 + level * 0.04);

    // Target area: bottom center (where turret is)
    const targetX = gameWidth / 2;
    const targetY = gameHeight - TURRET_BOTTOM;

    // Pick random edge
    const edges: SpawnEdge[] = ["top", "left", "right"];
    const edge = edges[Math.floor(Math.random() * edges.length)];

    let startX: number;
    let startY: number;

    switch (edge) {
      case "top":
        startX = 80 + Math.random() * (gameWidth - 160);
        startY = -40;
        break;
      case "left":
        startX = -80;
        startY = 40 + Math.random() * (gameHeight * 0.5);
        break;
      case "right":
        startX = gameWidth + 40;
        startY = 40 + Math.random() * (gameHeight * 0.5);
        break;
    }

    // Direction towards target
    const dx = targetX - startX;
    const dy = targetY - startY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const vx = (dx / dist) * speed;
    const vy = (dy / dist) * speed;

    const newEnemy: EnemyWord = {
      id: wordIdCounter.current++,
      text: word,
      x: startX,
      y: startY,
      vx,
      vy,
      isTargeted: false,
    };

    setEnemies((prev) => [...prev, newEnemy]);
  }, [getRandomWord, level]);

  // --- Turret aiming ---
  const aimTurret = useCallback((targetX: number, targetY: number) => {
    if (!gameAreaRef.current) return;
    const gameWidth = gameAreaRef.current.clientWidth;
    const gameHeight = gameAreaRef.current.clientHeight;
    const turretX = gameWidth / 2;
    const turretY = gameHeight - TURRET_BOTTOM;

    const dx = targetX - turretX;
    const dy = targetY - turretY;
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    setTurretAngle(angle);
  }, []);

  // --- Auto-target: find the enemy whose text starts with userInput ---
  useEffect(() => {
    if (!isGameStarted || isPaused || !userInput) {
      setCurrentTarget(null);
      return;
    }

    // Find enemy whose text starts with current input
    const target = enemies.find((e) =>
      e.text.toLowerCase().startsWith(userInput.toLowerCase()),
    );

    if (target) {
      setCurrentTarget(target);
      aimTurret(target.x + 40, target.y + 15);
    } else {
      setCurrentTarget(null);
    }
  }, [userInput, enemies, isGameStarted, isPaused, aimTurret]);

  // --- Fire bullet & destroy ---
  const fireAtEnemy = useCallback(
    (enemy: EnemyWord) => {
      if (!gameAreaRef.current) return;
      const gameWidth = gameAreaRef.current.clientWidth;
      const gameHeight = gameAreaRef.current.clientHeight;
      const turretX = gameWidth / 2;
      const turretY = gameHeight - TURRET_BOTTOM;

      // Create bullet
      const bullet: Bullet = {
        id: Date.now(),
        startX: turretX,
        startY: turretY,
        endX: enemy.x + 40,
        endY: enemy.y + 15,
        createdAt: Date.now(),
      };
      setBullets((prev) => [...prev, bullet]);

      // Create explosion at enemy position (delayed to match bullet travel)
      setTimeout(() => {
        setExplosions((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: enemy.x + 40,
            y: enemy.y + 15,
            createdAt: Date.now(),
          },
        ]);
        // Remove explosion after animation
        setTimeout(() => {
          setExplosions((prev) => prev.filter((e) => e.id !== bullet.id));
        }, 600);
      }, 150);

      // Remove bullet after animation
      setTimeout(() => {
        setBullets((prev) => prev.filter((b) => b.id !== bullet.id));
      }, 300);

      playKeySound();

      const comboMultiplier = 1 + combo * 0.1;
      const points = Math.floor(enemy.text.length * 10 * comboMultiplier);
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);
      setMaxCombo((prev) => Math.max(prev, combo + 1));
      setWordsCaught((prev) => prev + 1);
      setUserInput("");

      // Level up check
      if (wordsCaught > 0 && (wordsCaught + 1) % 10 === 0) {
        setLevel((prev) => prev + 1);
        setShowLevelUp(true);
        setTimeout(() => setShowLevelUp(false), 2000);
      }

      // Remove enemy
      setEnemies((prev) => prev.filter((e) => e.id !== enemy.id));
      setCurrentTarget(null);
    },
    [combo, wordsCaught, playKeySound, setUserInput],
  );

  // --- Check if user input matches any enemy word fully ---
  useEffect(() => {
    if (!isGameStarted || isPaused || !userInput) return;

    const matchingEnemy = enemies.find(
      (enemy) => enemy.text.toLowerCase() === userInput.toLowerCase(),
    );

    if (matchingEnemy) {
      fireAtEnemy(matchingEnemy);
    }
  }, [userInput, enemies, isGameStarted, isPaused, fireAtEnemy]);

  // --- Game loop: move enemies & check base collision ---
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    const gameLoop = () => {
      const currentEnemies = enemiesRef.current;
      if (!gameAreaRef.current) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const gameHeight = gameAreaRef.current.clientHeight;
      const gameWidth = gameAreaRef.current.clientWidth;

      // Base zone (near turret)
      const baseCenterX = gameWidth / 2;
      const baseCenterY = gameHeight - TURRET_BOTTOM;
      const baseRadius = 60;

      const updated = currentEnemies.map((e) => ({
        ...e,
        x: e.x + e.vx * 16,
        y: e.y + e.vy * 16,
      }));

      // Check which enemies reached the base
      const reached = updated.filter((e) => {
        const dx = e.x + 40 - baseCenterX;
        const dy = e.y + 15 - baseCenterY;
        return Math.sqrt(dx * dx + dy * dy) < baseRadius;
      });

      const remaining = updated.filter((e) => {
        const dx = e.x + 40 - baseCenterX;
        const dy = e.y + 15 - baseCenterY;
        return Math.sqrt(dx * dx + dy * dy) >= baseRadius;
      });

      if (reached.length > 0) {
        setLives((l) => {
          const newLives = l - reached.length;
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

      setEnemies(remaining);
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isGameStarted, isPaused, setUserInput, playGameOver]);

  // --- Spawn interval ---
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    const config =
      DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG] ||
      DIFFICULTY_CONFIG[4];
    const adjustedSpawnRate = config.spawnRate / (1 + level * 0.04);

    spawnIntervalRef.current = setInterval(spawnEnemy, adjustedSpawnRate);

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [isGameStarted, isPaused, level, spawnEnemy]);

  // --- Start game ---
  const startGame = () => {
    setIsPaused(false);
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setLives(5);
    setLevel(1);
    setEnemies([]);
    setBullets([]);
    setExplosions([]);
    setCurrentTarget(null);
    setCombo(0);
    setMaxCombo(0);
    setWordsCaught(0);
    setUserInput("");
    setTurretAngle(-90);
    wordIdCounter.current = 0;

    setTimeout(spawnEnemy, 500);
    playBackground();
  };

  // --- Toggle pause ---
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

  // Focus input
  useEffect(() => {
    if (isGameStarted && !isPaused) {
      inputRef.current?.focus();
    }
  }, [isGameStarted, isPaused]);

  // Cleanup sounds on unmount
  useEffect(() => {
    return () => {
      stopBackground();
    };
  }, [stopBackground]);

  // Keyboard handler
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

  // --- Turret position helper ---
  const getTurretPos = () => {
    if (!gameAreaRef.current) return { x: 0, y: 0 };
    return {
      x: gameAreaRef.current.clientWidth / 2,
      y: gameAreaRef.current.clientHeight - TURRET_BOTTOM,
    };
  };

  return (
    <>
      <Helmet>
        <title>Shooter Game - LikDai</title>
        <meta
          name="description"
          content="Play the Shooter typing game. Type to shoot word enemies before they reach your base!"
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div
          ref={gameAreaRef}
          className="layout relative rounded-4xl overflow-hidden border border-cyan-500/30 mt-12"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {/* Radial grid background */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 90%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            }}
          />

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

          {/* === Enemy words === */}
          <div className="absolute inset-0">
            <AnimatePresence>
              {enemies.map((enemy) => {
                const isTargeted = currentTarget?.id === enemy.id;
                const matchLen = isTargeted ? userInput.length : 0;

                return (
                  <motion.div
                    key={enemy.id}
                    className={cn(
                      "absolute px-3 py-1.5 rounded-lg font-medium text-base whitespace-nowrap select-none",
                      "border transition-colors duration-150",
                      isTargeted
                        ? "bg-red-500/20 border-red-400/60 shadow-[0_0_20px_-4px_rgba(239,68,68,0.5)]"
                        : "bg-cyan-500/10 border-cyan-500/20 backdrop-blur-sm",
                    )}
                    style={{
                      left: enemy.x,
                      top: enemy.y,
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
                      {enemy.text.split("").map((char, i) => (
                        <span
                          key={i}
                          className={cn(
                            "transition-colors duration-100",
                            isTargeted && i < matchLen
                              ? "text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.8)]"
                              : isTargeted
                                ? "text-red-200/70"
                                : "text-cyan-300",
                          )}
                        >
                          {char}
                        </span>
                      ))}
                    </span>

                    {/* Targeting indicator */}
                    {isTargeted && (
                      <motion.div
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-red-500"
                        animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* === Bullet trails === */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
            <defs>
              <linearGradient
                id="laserGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(239, 68, 68, 0)" />
                <stop offset="50%" stopColor="rgba(239, 68, 68, 1)" />
                <stop offset="100%" stopColor="rgba(255, 200, 50, 1)" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <AnimatePresence>
              {bullets.map((bullet) => (
                <motion.line
                  key={bullet.id}
                  x1={bullet.startX}
                  y1={bullet.startY}
                  x2={bullet.startX}
                  y2={bullet.startY}
                  stroke="url(#laserGradient)"
                  strokeWidth="3"
                  filter="url(#glow)"
                  initial={{
                    x2: bullet.startX,
                    y2: bullet.startY,
                    opacity: 1,
                  }}
                  animate={{
                    x2: bullet.endX,
                    y2: bullet.endY,
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
              ))}
            </AnimatePresence>
          </svg>

          {/* === Explosions === */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <AnimatePresence>
              {explosions.map((exp) => (
                <motion.div
                  key={exp.id}
                  className="absolute"
                  style={{ left: exp.x, top: exp.y }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Explosion ring */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-red-400/60" />
                  {/* Explosion glow */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-orange/40 blur-lg" />
                  {/* Sparks */}
                  {Array.from({ length: 6 }).map((_, i) => {
                    const angle = (i * 60 * Math.PI) / 180;
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-full bg-yellow"
                        style={{
                          left: -3,
                          top: -3,
                        }}
                        initial={{ x: 0, y: 0, opacity: 1 }}
                        animate={{
                          x: Math.cos(angle) * 30,
                          y: Math.sin(angle) * 30,
                          opacity: 0,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* === Turret === */}
          {isGameStarted && (
            <div
              className="absolute z-20 pointer-events-none"
              style={{
                left: getTurretPos().x,
                top: getTurretPos().y,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Base glow ring */}
              <motion.div
                className="absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)",
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Turret barrel */}
              <motion.div
                className="absolute"
                style={{
                  width: 40,
                  height: 6,
                  left: "50%",
                  top: "50%",
                  originX: 0,
                  originY: "50%",
                  marginLeft: 0,
                  marginTop: -3,
                }}
                animate={{ rotate: turretAngle }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-cyan-400 to-cyan-200 shadow-[0_0_12px_rgba(6,182,212,0.6)]" />
              </motion.div>

              {/* Turret base */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-cyan-400 border-2 border-cyan-200 shadow-[0_0_16px_rgba(6,182,212,0.5)]" />
            </div>
          )}

          {/* === Base defense zone indicator === */}
          {isGameStarted && (
            <div
              className="absolute pointer-events-none z-10"
              style={{
                left: getTurretPos().x,
                top: getTurretPos().y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className="w-32 h-32 rounded-full border border-cyan-500/10"
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          )}

          {/* === User input display === */}
          <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-40">
            <AnimatePresence mode="wait">
              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 5 }}
                  className={cn(
                    "px-8 py-3 rounded-2xl border backdrop-blur-xl",
                    currentTarget
                      ? "bg-red-500/10 border-red-400/40 shadow-[0_0_30px_-8px_rgba(239,68,68,0.3)]"
                      : "bg-cyan-500/10 border-cyan-500/30 shadow-[0_0_30px_-8px_rgba(6,182,212,0.3)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-2xl font-bold",
                      currentTarget
                        ? "text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                        : "text-cyan-300 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]",
                    )}
                  >
                    {userInput}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* === Scan lines overlay === */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.015] z-40"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(6, 182, 212, 0.3) 2px, rgba(6, 182, 212, 0.3) 4px)",
            }}
          />

          {/* Overlays */}
          {!isGameStarted && !isGameOver && (
            <StartScreenOverlay startGame={startGame} />
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
          id="shooter-game-input"
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute pointer-events-none"
          aria-label="Shooter game typing input"
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

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

interface Obstacle {
  id: number;
  text: string;
  x: number;
  lane: number;
  speed: number;
  isTargeted: boolean;
}

interface GroundLine {
  id: number;
  x: number;
  width: number;
}

interface SmashEffect {
  id: number;
  x: number;
  y: number;
  createdAt: number;
}

// Runner config
const RUNNER_X = 120; // runner's fixed x position
const GROUND_Y_RATIO = 0.75; // ground at 75% of game height
const RUNNER_SIZE = 48;

export const RunningPage = () => {
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
  const [distance, setDistance] = useState(0);

  // Running-specific state
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [smashEffects, setSmashEffects] = useState<SmashEffect[]>([]);
  const [currentTarget, setCurrentTarget] = useState<Obstacle | null>(null);
  const [isHit, setIsHit] = useState(false); // flash red when hit
  const [groundLines, setGroundLines] = useState<GroundLine[]>([]);
  const [bgOffset, setBgOffset] = useState(0);

  // Refs
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spawnIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  const wordIdCounter = useRef(0);
  const obstaclesRef = useRef<Obstacle[]>([]);
  const distanceRef = useRef(0);

  // Keep refs in sync
  useEffect(() => {
    obstaclesRef.current = obstacles;
  }, [obstacles]);

  useEffect(() => {
    distanceRef.current = distance;
  }, [distance]);

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

  // --- Initialize ground lines ---
  const initGroundLines = useCallback(() => {
    const lines: GroundLine[] = [];
    for (let i = 0; i < 20; i++) {
      lines.push({
        id: i,
        x: i * 80 + Math.random() * 40,
        width: 20 + Math.random() * 30,
      });
    }
    setGroundLines(lines);
  }, []);

  // --- Spawn obstacle from right ---
  const spawnObstacle = useCallback(() => {
    if (!gameAreaRef.current) return;

    const gameWidth = gameAreaRef.current.clientWidth;
    const word = getRandomWord();

    // Prevent overlap: check if any existing obstacle is too close to spawn point
    const spawnX = gameWidth + 80 + Math.random() * 150;
    const currentObs = obstaclesRef.current;
    const estimatedWordWidth = word.length * 14 + 40; // rough px width of the word label
    const tooClose = currentObs.some(
      (o) => Math.abs(o.x - spawnX) < estimatedWordWidth,
    );
    if (tooClose) return;

    const config =
      DIFFICULTY_CONFIG[level as keyof typeof DIFFICULTY_CONFIG] ||
      DIFFICULTY_CONFIG[4];
    const speed = (config.fallSpeed * 3 + 0.8) * (1 + level * 0.03);

    const newObstacle: Obstacle = {
      id: wordIdCounter.current++,
      text: word,
      x: spawnX,
      lane: 0,
      speed,
      isTargeted: false,
    };

    setObstacles((prev) => [...prev, newObstacle]);
  }, [getRandomWord, level]);

  // --- Create smash effect ---
  const createSmashEffect = useCallback((x: number, y: number) => {
    const effect: SmashEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      createdAt: Date.now(),
    };
    setSmashEffects((prev) => [...prev, effect]);
    setTimeout(() => {
      setSmashEffects((prev) => prev.filter((e) => e.id !== effect.id));
    }, 600);
  }, []);

  // --- Handle obstacle destroyed ---
  const handleObstacleDestroyed = useCallback(
    (obstacle: Obstacle) => {
      if (!gameAreaRef.current) return;
      const groundY = gameAreaRef.current.clientHeight * GROUND_Y_RATIO;

      createSmashEffect(obstacle.x, groundY - 30);
      playKeySound();

      const comboMultiplier = 1 + combo * 0.1;
      const points = Math.floor(obstacle.text.length * 10 * comboMultiplier);
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

      setObstacles((prev) => prev.filter((o) => o.id !== obstacle.id));
      setCurrentTarget(null);
    },
    [combo, wordsCaught, playKeySound, setUserInput, createSmashEffect],
  );

  // --- Auto-target: highlight obstacle that matches typed prefix ---
  useEffect(() => {
    if (!isGameStarted || isPaused || !userInput) {
      if (!userInput) setCurrentTarget(null);
      return;
    }

    const target = obstacles.find((o) =>
      o.text.toLowerCase().startsWith(userInput.toLowerCase()),
    );

    setCurrentTarget(target || null);
  }, [userInput, obstacles, isGameStarted, isPaused]);

  // --- Check full word match ---
  useEffect(() => {
    if (!isGameStarted || isPaused || !userInput) return;

    const matchingObstacle = obstacles.find(
      (o) => o.text.toLowerCase() === userInput.toLowerCase(),
    );

    if (matchingObstacle) {
      handleObstacleDestroyed(matchingObstacle);
    }
  }, [userInput, obstacles, isGameStarted, isPaused, handleObstacleDestroyed]);

  // --- Game loop ---
  useEffect(() => {
    if (!isGameStarted || isPaused) return;

    let lastTime = performance.now();
    let frameCount = 0;

    const gameLoop = (now: number) => {
      const delta = now - lastTime;
      lastTime = now;
      frameCount++;

      const currentObstacles = obstaclesRef.current;
      if (!gameAreaRef.current) {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return;
      }

      const gameWidth = gameAreaRef.current.clientWidth;

      // Update distance
      setDistance((prev) => prev + delta * 0.01);

      // Scroll background
      setBgOffset((prev) => (prev + delta * 0.05) % 80);

      // Move ground lines
      setGroundLines((prev) =>
        prev.map((line) => {
          let newX = line.x - delta * 0.08;
          if (newX < -60) newX += gameWidth + 120;
          return { ...line, x: newX };
        }),
      );

      // Move obstacles
      const updated = currentObstacles.map((obs) => ({
        ...obs,
        x: obs.x - obs.speed * delta * 0.06,
      }));

      // Check collision with runner
      const hitZone = RUNNER_X + RUNNER_SIZE;
      const hit = updated.filter(
        (obs) => obs.x <= hitZone && obs.x > hitZone - 30,
      );
      const remaining = updated.filter(
        (obs) => obs.x > hitZone || obs.x <= hitZone - 30,
      );

      // Also remove obstacles that went off screen left
      const visible = remaining.filter((obs) => obs.x > -200);

      if (hit.length > 0) {
        setIsHit(true);
        setTimeout(() => setIsHit(false), 300);

        setLives((l) => {
          const newLives = l - hit.length;
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

      setObstacles(visible);
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
    const adjustedSpawnRate = config.spawnRate / (1.5 + level * 0.05); // Increased frequency divisor from 1 to 1.5

    spawnIntervalRef.current = setInterval(spawnObstacle, adjustedSpawnRate);

    return () => {
      if (spawnIntervalRef.current) {
        clearInterval(spawnIntervalRef.current);
      }
    };
  }, [isGameStarted, isPaused, level, spawnObstacle]);

  // --- Start game ---
  const startGame = () => {
    setIsPaused(false);
    setIsGameStarted(true);
    setIsGameOver(false);
    setScore(0);
    setLives(5);
    setLevel(1);
    setDistance(0);
    setObstacles([]);
    setSmashEffects([]);
    setCurrentTarget(null);
    setCombo(0);
    setMaxCombo(0);
    setWordsCaught(0);
    setUserInput("");
    setIsHit(false);
    setBgOffset(0);
    wordIdCounter.current = 0;

    initGroundLines();
    setTimeout(spawnObstacle, 1000);
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

  // Cleanup sounds
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

  return (
    <>
      <Helmet>
        <title>Running Game - LikDai</title>
        <meta
          name="description"
          content="Play the Running typing game. Type words to smash through obstacles as you run!"
        />
      </Helmet>

      <div className="min-h-screen relative overflow-hidden">
        <div
          ref={gameAreaRef}
          className="layout relative rounded-4xl overflow-hidden border border-emerald-500/30 mt-12"
          style={{ height: "calc(100vh - 100px)" }}
        >
          {/* Sky gradient */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(6, 78, 59, 0.15) 0%, rgba(16, 185, 129, 0.05) 40%, transparent 70%)",
            }}
          />

          {/* Moving grid lines on ground — only when game is active */}
          {isGameStarted && (
            <div
              className="absolute pointer-events-none opacity-[0.08]"
              style={{
                left: 0,
                right: 0,
                top: `${75}%`,
                height: "25%",
                backgroundImage: `
                  linear-gradient(90deg, rgba(16, 185, 129, 0.5) 1px, transparent 1px),
                  linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: "80px 40px",
                transform: `translateX(-${bgOffset}px)`,
              }}
            />
          )}

          {/* === Ground line — only when game is active === */}
          {isGameStarted && (
            <div
              className="absolute left-0 right-0 pointer-events-none z-10"
              style={{ top: `${GROUND_Y_RATIO * 100}%` }}
            >
              <div className="w-full h-[2px] bg-gradient-to-r from-emerald-500/60 via-emerald-400/40 to-emerald-500/60" />
              {/* Ground texture dashes */}
              <div className="relative h-2 overflow-hidden">
                {groundLines.map((line) => (
                  <div
                    key={line.id}
                    className="absolute top-1 h-[1px] bg-emerald-500/20 rounded-full"
                    style={{
                      left: line.x,
                      width: line.width,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* === Distance counter === */}
          {isGameStarted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-14 left-1/2 -translate-x-1/2 z-30"
            >
              <div className="text-center">
                <span className="text-3xl md:text-4xl font-bold text-emerald-400 font-mono tabular-nums drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]">
                  {Math.floor(distance)}
                </span>
                <span className="text-sm text-emerald-400/60 ml-1">m</span>
              </div>
            </motion.div>
          )}

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

          {/* === Runner character === */}
          {isGameStarted && (
            <motion.div
              className="absolute z-20 pointer-events-none"
              style={{
                left: RUNNER_X,
                top: gameAreaRef.current
                  ? gameAreaRef.current.clientHeight * GROUND_Y_RATIO -
                    RUNNER_SIZE
                  : 0,
              }}
              animate={isHit ? { x: [-5, 5, -3, 3, 0] } : { y: [0, -3, 0] }}
              transition={
                isHit
                  ? { duration: 0.3 }
                  : { duration: 0.3, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <img
                src="/svg/runner.svg"
                alt="Runner"
                width={RUNNER_SIZE}
                height={RUNNER_SIZE}
                className={cn(
                  "transition-all duration-150",
                  isHit &&
                    "brightness-50 sepia saturate-[10] hue-rotate-[-50deg]",
                )}
                style={{
                  filter: isHit
                    ? "drop-shadow(0 0 10px rgba(239, 68, 68, 0.6)) brightness(0.5) sepia(1) saturate(10) hue-rotate(-50deg)"
                    : "none",
                }}
              />

              {/* Runner glow */}
              <div
                className={cn(
                  "absolute -inset-3 rounded-full blur-xl opacity-30 transition-colors duration-150",
                  isHit ? "bg-red-500" : "bg-emerald-500",
                )}
              />
            </motion.div>
          )}

          {/* === Obstacles (word walls from right) === */}
          <div className="absolute inset-0">
            <AnimatePresence>
              {obstacles.map((obs) => {
                const isTargeted = currentTarget?.id === obs.id;
                const matchLen = isTargeted ? userInput.length : 0;
                const groundY = gameAreaRef.current
                  ? gameAreaRef.current.clientHeight * GROUND_Y_RATIO
                  : 0;

                return (
                  <motion.div
                    key={obs.id}
                    className={cn(
                      "absolute flex flex-col items-center pointer-events-none",
                    )}
                    style={{
                      left: obs.x,
                      bottom: gameAreaRef.current
                        ? gameAreaRef.current.clientHeight - groundY
                        : 0,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 1.3,
                      y: -20,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Word label */}
                    <div
                      className={cn(
                        "px-4 py-2 rounded-lg text-lg font-semibold whitespace-nowrap mb-1",
                        "border transition-all duration-150",
                        isTargeted
                          ? "bg-orange/15 border-orange/50 shadow-[0_0_16px_-4px_rgba(251,191,36,0.4)]"
                          : "bg-emerald-500/10 border-emerald-500/25",
                      )}
                    >
                      <span className="tracking-wide">
                        {obs.text.split("").map((char, i) => (
                          <span
                            key={i}
                            className={cn(
                              "transition-colors duration-100",
                              isTargeted && i < matchLen
                                ? "text-orange drop-shadow-[0_0_6px_rgba(251,191,36,0.8)]"
                                : isTargeted
                                  ? "text-amber-200/70"
                                  : "text-emerald-300",
                            )}
                          >
                            {char}
                          </span>
                        ))}
                      </span>
                    </div>

                    {/* Wall / barrier block */}
                    <div
                      className={cn(
                        "w-5 rounded-t-sm transition-colors duration-150",
                        isTargeted
                          ? "bg-gradient-to-b from-orange/60 to-orange/30"
                          : "bg-gradient-to-b from-emerald-500/40 to-emerald-500/15",
                      )}
                      style={{ height: 36 }}
                    />

                    {/* Targeting indicator */}
                    {isTargeted && (
                      <motion.div
                        className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-orange"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* === Smash effects === */}
          <div className="absolute inset-0 pointer-events-none z-30">
            <AnimatePresence>
              {smashEffects.map((effect) => (
                <motion.div
                  key={effect.id}
                  className="absolute"
                  style={{ left: effect.x, top: effect.y }}
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  {/* Impact ring */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-emerald-400/50" />
                  {/* Glow */}
                  <div className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-emerald-400/40 blur-lg" />
                  {/* Debris particles */}
                  {Array.from({ length: 8 }).map((_, i) => {
                    const angle = (i * 45 * Math.PI) / 180;
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 rounded-sm bg-emerald-300"
                        style={{ left: -3, top: -3 }}
                        initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
                        animate={{
                          x: Math.cos(angle) * (20 + Math.random() * 15),
                          y: Math.sin(angle) * (20 + Math.random() * 15),
                          opacity: 0,
                          rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    );
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* === Speed lines (when game is active) === */}
          {isGameStarted && !isPaused && !isGameOver && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06]">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[1px] bg-emerald-400"
                  style={{
                    top: `${20 + i * 12}%`,
                    width: "30%",
                    right: "-30%",
                  }}
                  animate={{
                    x: [0, -window.innerWidth * 1.5],
                  }}
                  transition={{
                    duration: 0.8 + i * 0.1,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          )}

          {/* === User input display === */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40">
            <AnimatePresence mode="wait">
              {userInput && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 5 }}
                  className={cn(
                    "px-8 py-3 rounded-2xl border backdrop-blur-xl",
                    currentTarget
                      ? "bg-orange/10 border-orange/40 shadow-[0_0_30px_-8px_rgba(251,191,36,0.3)]"
                      : "bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_30px_-8px_rgba(16,185,129,0.3)]",
                  )}
                >
                  <span
                    className={cn(
                      "text-2xl font-bold",
                      currentTarget
                        ? "text-orange drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]"
                        : "text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]",
                    )}
                  >
                    {userInput}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
          id="running-game-input"
          onKeyDown={handleKeyDown}
          className="opacity-0 absolute pointer-events-none"
          aria-label="Running game typing input"
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

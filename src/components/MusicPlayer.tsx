import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  X,
  Dot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SONGS } from "@/constant";

const formatTime = (timeInSeconds: number) => {
  if (isNaN(timeInSeconds)) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const MusicPlayer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentSong = SONGS[currentIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch((e) => console.error("Play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SONGS.length);
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
    if (audioRef.current) audioRef.current.currentTime = 0;
    setIsPlaying(true);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    handleNext();
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div>
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: 40 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-44 md:right-10 right-4 p-3 rounded-full border border-yellow bg-background/50 backdrop-blur-md hover:bg-yellow transition-colors duration-300 cursor-pointer text-primary hover:text-background z-50 shadow-lg"
      >
        <Music className="size-6" />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-60 md:right-10 right-4 w-[calc(100vw-32px)] md:w-80 bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-3xl p-5 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2 items-center">
                <div className="flex items-center gap-2">
                  <Music className="size-5 text-yellow" />
                  <h3 className="font-bold text-sm">ၽဵင်းၵႂၢမ်း</h3>
                </div>
                <Dot className="size-5 text-yellow" />
                <span className="text-xs text-muted-foreground font-medium">
                  {currentIndex + 1} / {SONGS.length}
                </span>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div
              className={cn(
                "w-full aspect-video rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden",
                currentSong.bg,
              )}
            >
              {isPlaying ? (
                <div className="flex gap-1.5 items-end h-16">
                  {[...Array(5)].map((_, i) => (
                    <motion.span
                      key={i}
                      animate={{ height: ["12px", "48px", "12px"] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + i * 0.1,
                        ease: "linear",
                        delay: i * 0.1,
                      }}
                      className={cn(
                        "w-2 rounded-full",
                        currentSong.bg.replace("/10", ""),
                      )}
                    />
                  ))}
                </div>
              ) : (
                <Music
                  className={cn("size-20 opacity-50", currentSong.color)}
                />
              )}
            </div>

            <div className="text-center mb-6">
              <h4 className="font-bold text-lg truncate px-2">
                {currentSong.title}
              </h4>
              <p className="text-sm text-muted-foreground truncate">
                {currentSong.artist}
              </p>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1.5 px-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="w-full h-1.5 bg-foreground rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                  className="h-full bg-yellow"
                />
              </div>
            </div>

            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handlePrev}
                className="p-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors active:scale-95"
              >
                <SkipBack className="size-6 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="size-14 bg-yellow hover:bg-yellow/90 cursor-pointer text-primary rounded-full flex items-center justify-center shadow-[0_0_20px_-5px_rgba(234,179,8,0.5)] transition-transform active:scale-95"
              >
                {isPlaying ? (
                  <Pause className="size-6 fill-current" />
                ) : (
                  <Play className="size-6 fill-current ml-1" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-2 text-muted-foreground cursor-pointer hover:text-foreground transition-colors active:scale-95"
              >
                <SkipForward className="size-6 fill-current" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import {
  Search,
  Music,
  Play,
  Pause,
  Info,
  SkipForward,
  SkipBack,
  Volume2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
const MOCK_SONGS = [
  {
    id: "1",
    title: "Lofi Study Focus",
    artist: "Chill Beats",
    duration: "3:45",
    category: "Lofi",
    color: "text-blue",
    bg: "bg-blue/10",
  },
  {
    id: "2",
    title: "Deep Work Vibes",
    artist: "Synthwave",
    duration: "4:20",
    category: "Electronic",
    color: "text-purple",
    bg: "bg-purple/10",
  },
  {
    id: "3",
    title: "Nature Ambient",
    artist: "Earth Sounds",
    duration: "5:15",
    category: "Nature",
    color: "text-green",
    bg: "bg-green/10",
  },
  {
    id: "4",
    title: "Acoustic Morning",
    artist: "Guitar Guy",
    duration: "2:50",
    category: "Acoustic",
    color: "text-orange",
    bg: "bg-orange/10",
  },
  {
    id: "5",
    title: "Shan Traditional",
    artist: "Sai Mao",
    duration: "3:30",
    category: "Traditional",
    color: "text-yellow",
    bg: "bg-yellow/10",
  },
  {
    id: "6",
    title: "Rainy Cafe",
    artist: "Cozy Corner",
    duration: "4:00",
    category: "Lofi",
    color: "text-blue",
    bg: "bg-blue/10",
  },
  {
    id: "7",
    title: "Typing Rhythm",
    artist: "Keyboard Clickers",
    duration: "2:30",
    category: "Electronic",
    color: "text-purple",
    bg: "bg-purple/10",
  },
  {
    id: "8",
    title: "River Flowing",
    artist: "Zen Space",
    duration: "6:05",
    category: "Nature",
    color: "text-green",
    bg: "bg-green/10",
  },
];

const CATEGORIES = [
  "All",
  "Lofi",
  "Electronic",
  "Nature",
  "Acoustic",
  "Traditional",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const SongPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Player state
  const [currentSong, setCurrentSong] = useState<(typeof MOCK_SONGS)[0] | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  // Filter logic
  const filteredSongs = useMemo(() => {
    return MOCK_SONGS.filter((song) => {
      const matchesSearch =
        song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === "All" || song.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handlePlaySong = (song: (typeof MOCK_SONGS)[0]) => {
    if (currentSong?.id === song.id) {
      // Toggle play/pause if clicking the same song
      setIsPlaying(!isPlaying);
    } else {
      // Play new song
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <>
      <Helmet>
        <title>Songs | LikDai</title>
        <meta
          name="description"
          content="Find the perfect background music while you practice typing on LikDai."
        />
      </Helmet>

      <main className="min-h-screen py-20 relative">
        <motion.div
          className="layout space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header Section */}
          <motion.section
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              ထွမ်ႇၽဵင်းၵႂၢမ်း
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              ထွမ်ႇၽဵင်းၵႂၢမ်း မိူဝ်ႈၽိုၵ်းပေႃႉလိၵ်ႈသေ လဵပ်ႈႁဵၼ်းၵႂႃႇ
              လွင်ႈငမ်းယဵၼ် တႃႇတေၸွၺ်ႈပိုတ်ႇပၼ် လွင်ႈမၢႆတွင်းလႄႈ လွင်ႈတႅတ်ႈၼႅတ်ႈ
              ၸဝ်ႈၵဝ်ႇမႃးၶႃႈ။
            </p>
          </motion.section>

          {/* Filters & Search */}
          <motion.section
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-end sm:items-center justify-end gap-4"
          >
            <div className="relative w-full sm:w-96">
              <Input
                id="search_lesson"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by song name or artist..."
                className="bg-foreground border border-primary/10 rounded-full focus:ring-1! ring-primary/30 h-10 w-full pl-10"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-60 size-5" />
            </div>

            {/* Category Dropdown */}
            <div className="w-full sm:w-48">
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full flex items-center justify-between bg-foreground border border-primary/10 outline-none focus:ring-1! ring-primary/30 h-10! cursor-pointer rounded-full px-5 transition-all shadow-sm text-base text-primary">
                  <span>
                    {activeCategory === "All" ? "Categories" : activeCategory}
                  </span>
                  <ChevronDown className="size-4 opacity-50" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-48 rounded-xl border-foreground bg-background/95 backdrop-blur-md shadow-xl"
                >
                  <DropdownMenuRadioGroup
                    value={activeCategory}
                    onValueChange={setActiveCategory}
                  >
                    {CATEGORIES.map((category) => (
                      <DropdownMenuRadioItem
                        key={category}
                        value={category}
                        className="cursor-pointer hover:bg-foreground! rounded-lg hover:text-primary! transition-colors duration-300 py-2"
                      >
                        {category}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.section>

          {/* Songs Grid */}
          <motion.section variants={itemVariants}>
            {filteredSongs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSongs.map((song) => {
                  const isActive = currentSong?.id === song.id;

                  return (
                    <div
                      key={song.id}
                      className={cn(
                        "group flex items-center p-4 rounded-2xl border transition-all duration-300 backdrop-blur-sm cursor-pointer",
                        isActive
                          ? "border-yellow bg-yellow/5 shadow-[0_0_20px_-5px_rgba(234,179,8,0.2)]"
                          : "border-primary/20 bg-background/40 hover:border-yellow/50 hover:bg-background/60",
                      )}
                      onClick={() => handlePlaySong(song)}
                    >
                      {/* Album Art Placeholder */}
                      <div
                        className={cn(
                          "size-14 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105",
                          song.bg,
                          song.color,
                        )}
                      >
                        {isActive && isPlaying ? (
                          <div className="flex gap-1 items-end h-5">
                            <motion.span
                              animate={{ height: ["4px", "20px", "4px"] }}
                              transition={{ repeat: Infinity, duration: 0.8 }}
                              className={cn(
                                "w-1 rounded-t-sm",
                                song.bg.replace("/10", ""),
                              )}
                            />
                            <motion.span
                              animate={{ height: ["12px", "4px", "12px"] }}
                              transition={{ repeat: Infinity, duration: 0.6 }}
                              className={cn(
                                "w-1 rounded-t-sm",
                                song.bg.replace("/10", ""),
                              )}
                            />
                            <motion.span
                              animate={{ height: ["8px", "16px", "8px"] }}
                              transition={{ repeat: Infinity, duration: 0.7 }}
                              className={cn(
                                "w-1 rounded-t-sm",
                                song.bg.replace("/10", ""),
                              )}
                            />
                          </div>
                        ) : (
                          <Music className="size-6" />
                        )}
                      </div>

                      {/* Song Info */}
                      <div className="ml-4 flex-1 min-w-0">
                        <h3 className="font-bold truncate text-base">
                          {song.title}
                        </h3>
                        <p className="text-sm truncate">{song.artist}</p>
                      </div>

                      {/* Play Action */}
                      <div className="flex-shrink-0 ml-3">
                        <button
                          className={cn(
                            "size-10 rounded-full flex items-center justify-center transition-all",
                            isActive
                              ? "bg-yellow text-primary shadow-md"
                              : "bg-primary/10 text-primary group-hover:bg-yellow group-hover:text-primary",
                          )}
                        >
                          {isActive && isPlaying ? (
                            <Pause className="size-5 fill-current" />
                          ) : (
                            <Play className="size-5 fill-current ml-0.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-20 px-4 bg-foreground/5 rounded-3xl border border-foreground/10 border-dashed max-w-2xl mx-auto">
                <Info className="size-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-bold mb-2">No songs found</h3>
                <p className="text-muted-foreground">
                  We couldn't find any tracks matching "{searchQuery}". Try a
                  different search term or category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 px-6 py-2 bg-yellow/20 hover:bg-yellow text-primary rounded-full font-medium transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </motion.section>
        </motion.div>
      </main>

      {/* Floating Music Player */}
      <AnimatePresence>
        {currentSong && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="fixed bottom-4 inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl z-50 pointer-events-none "
          >
            <div className="bg-background/80 backdrop-blur-xl border border-primary/20 shadow-2xl rounded-2xl p-4 flex flex-col pointer-events-auto overflow-hidden">
              {/* Progress bar mock */}
              <div className="w-full h-1 bg-foreground/10 rounded-full mb-3 overflow-hidden absolute top-0 inset-x-0 rounded-b-none">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: isPlaying ? "100%" : "30%" }}
                  transition={{ duration: 180, ease: "linear" }}
                  className="h-full bg-yellow"
                />
              </div>

              <div className="flex items-center justify-between gap-4 mt-1">
                {/* Current Song Info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={cn(
                      "size-12 rounded-lg flex items-center justify-center flex-shrink-0",
                      currentSong.bg,
                      currentSong.color,
                    )}
                  >
                    <Music className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm sm:text-base truncate">
                      {currentSong.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                      {currentSong.artist}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                    <SkipBack className="size-5 fill-current" />
                  </button>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="size-12 bg-yellow hover:bg-yellow/90 text-primary rounded-full flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause className="size-6 fill-current" />
                    ) : (
                      <Play className="size-6 fill-current ml-1" />
                    )}
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors hidden sm:block">
                    <SkipForward className="size-5 fill-current" />
                  </button>
                </div>

                {/* Extra Controls */}
                <div className="hidden md:flex items-center justify-end flex-1 gap-3">
                  <span className="text-xs text-muted-foreground font-medium">
                    0:00 / {currentSong.duration}
                  </span>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Volume2 className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Zap, Languages, Library } from "lucide-react";

import { settingStore } from "@/store/settingStore";
import { LessonPagination } from "@/features/Lessons/components/LessonPagination";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { shanBeginnerLessons } from "@/resources/shan.beginner";
import { shanIntermediateLessons } from "@/resources/shan.intermediate";
import { shanAdvancedLessons } from "@/resources/shan.advancend";
import { shanQuoteLessons } from "@/resources/shan.quoteLessons";
import { engQuotesLessons } from "@/resources/eng.quoteLessons";
import { engBeginnerLessons } from "@/resources/eng.beginner";
import { engIntermediateLessons } from "@/resources/eng.intermediate";
import { engAdvancedLessons } from "@/resources/eng.advancend";
import { cn } from "@/lib/utils";
import { NORMAL_CONTENT } from "@/content/normal.content";
import { LessonCard } from "@/features/Lessons/components/LessonCard";

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

export const NormalTypingPage = () => {
  const { lessonLevel, setLessonLevel, mode, setMode } = settingStore();
  const [lessons, setLessons] = useState<{ content: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 10;

  const getLevelLessons = () => {
    let newLessons: { content: string }[] = [];
    switch (lessonLevel) {
      case "beginner":
        newLessons = mode === "eng" ? engBeginnerLessons : shanBeginnerLessons;
        break;
      case "intermediate":
        newLessons =
          mode === "eng" ? engIntermediateLessons : shanIntermediateLessons;
        break;
      case "advanced":
        newLessons = mode === "eng" ? engAdvancedLessons : shanAdvancedLessons;
        break;
      case "quotes":
        newLessons = mode === "eng" ? engQuotesLessons : shanQuoteLessons;
        break;
      default:
        newLessons = mode === "eng" ? engBeginnerLessons : shanBeginnerLessons;
        break;
    }
    setLessons(newLessons);
  };

  useMemo(() => {
    getLevelLessons();
  }, [lessonLevel, mode]);

  useEffect(() => {
    setCurrentPage(1);
  }, [lessonLevel, mode]);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const languageOption = [
    {
      imageUrl: "/svg/Shan-Flag.svg",
      lng: "shan",
      title: NORMAL_CONTENT.shn,
    },
    {
      imageUrl: "/images/UK-Flag.jpg",
      lng: "eng",
      title: NORMAL_CONTENT.eng,
    },
  ];

  const levelOptions = [
    {
      value: "beginner",
      label: NORMAL_CONTENT.type.beginner,
      color: "text-green",
    },
    {
      value: "intermediate",
      label: NORMAL_CONTENT.type.intermediate,
      color: "text-blue",
    },
    {
      value: "advanced",
      label: NORMAL_CONTENT.type.advanced,
      color: "text-purple",
    },
    {
      value: "quotes",
      label: NORMAL_CONTENT.type.quotes,
      color: "text-orange",
    },
  ];

  return (
    <>
      <Helmet>
        <title>{NORMAL_CONTENT.metaTitle}</title>
        <meta name="description" content={NORMAL_CONTENT.metaDescription} />
      </Helmet>

      <div className="min-h-screen pb-10">
        <motion.div
          className="layout py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-start mb-10">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
              {NORMAL_CONTENT.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {NORMAL_CONTENT.subtitle}
            </p>
          </motion.div>

          {/* Filters Bar */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-end mb-10 w-full"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full sm:w-fit">
              <div className="flex sm:w-[220px] w-full items-center gap-2 text-sm bg-background/80 px-4 py-2 rounded-full border border-primary/20">
                <Zap className="size-4 text-yellow" />
                <span className="font-medium">
                  {lessons.length} {NORMAL_CONTENT.lesson}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="sm:w-[220px] w-full h-10 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 cursor-pointer transition-all duration-300 rounded-full flex items-center justify-start px-4"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Languages
                        className={cn(
                          "size-4",
                          mode === "shan" ? "text-yellow" : "text-blue",
                        )}
                      />
                      <span className="font-semibold">
                        {mode === "shan"
                          ? NORMAL_CONTENT.shn
                          : NORMAL_CONTENT.eng}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="sm:w-[220px] w-full rounded-xl border-primary/20 bg-background/80 backdrop-blur-xl"
                >
                  <DropdownMenuLabel className="flex items-center gap-2 text-sm opacity-70">
                    <Languages className="size-4" />{" "}
                    {NORMAL_CONTENT.languageSetting}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {languageOption.map((option) => (
                    <DropdownMenuItem
                      key={option.lng}
                      className={cn(
                        "cursor-pointer py-2.5 rounded-lg mb-1 hover:bg-white/5",
                        mode === option.lng && "bg-white/5",
                      )}
                      onClick={() => setMode(option.lng as LanguageMode)}
                    >
                      <img
                        src={option.imageUrl}
                        alt={option.title}
                        className="size-5 rounded-full object-cover mr-2 border border-foreground"
                      />
                      <span
                        className={cn(
                          "font-medium",
                          mode === "shan" && "text-yellow",
                        )}
                      >
                        {option.title}
                      </span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="sm:w-[220px] w-full h-10 bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-full flex items-center justify-start cursor-pointer px-4"
                  >
                    <div className="flex items-center gap-2">
                      <Library className="size-4 text-yellow" />
                      <span className="font-semibold capitalize">
                        {NORMAL_CONTENT.type[lessonLevel]}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  className="sm:w-[220px] w-full rounded-xl border-primary/20 bg-background/80 backdrop-blur-xl"
                >
                  <DropdownMenuLabel className="flex items-center gap-2 text-sm opacity-70">
                    <Library className="size-4" /> {NORMAL_CONTENT.lessonLevel}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-white/10" />
                  {levelOptions.map((opt) => (
                    <DropdownMenuCheckboxItem
                      key={opt.value}
                      checked={lessonLevel === opt.value}
                      onCheckedChange={() => setLessonLevel(opt.value as any)}
                      className={cn(
                        "cursor-pointer py-2.5 rounded-lg my-1 transition-colors",
                        lessonLevel === opt.value && "bg-white/5",
                      )}
                    >
                      <span className={cn("font-medium capitalize", opt.color)}>
                        {opt.label}
                      </span>
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </motion.div>

          {/* Lessons Grid */}
          <motion.div variants={itemVariants} className="space-y-8 mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lessonLevel}-${mode}-${currentPage}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                  {lessons
                    .slice(
                      (currentPage - 1) * lessonsPerPage,
                      currentPage * lessonsPerPage,
                    )
                    .map((lesson, index) => (
                      <LessonCard
                        key={index}
                        content={lesson.content}
                        index={(currentPage - 1) * lessonsPerPage + index}
                      />
                    ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <LessonPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(lessons.length / lessonsPerPage) || 1}
          />
        </motion.div>
      </div>
    </>
  );
};

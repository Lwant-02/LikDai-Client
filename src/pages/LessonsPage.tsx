import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { CircleGauge, Search, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";

import { settingStore } from "@/store/settingStore";
import { LessonHeader } from "@/features/Lessons/components/LessonHeader";
import { LessonLanguageSelector } from "@/features/Lessons/components/LessonLanguageSelector";
import { LevelCard } from "@/features/Lessons/components/LevelCard";
import { LessonGrid } from "@/features/Lessons/components/LessonGrid";
import { Input } from "@/components/ui/input";
import { LessonPagination } from "@/features/Lessons/components/LessonPagination";
import { shanBeginnerLessons } from "@/resources/shan.beginner";
import { shanIntermediateLessons } from "@/resources/shan.intermediate";
import { shanAdvancedLessons } from "@/resources/shan.advancend";
import { shanQuoteLessons } from "@/resources/shan.quoteLessons";
import { engQuotesLessons } from "@/resources/eng.quoteLessons";
import { engBeginnerLessons } from "@/resources/eng.beginner";
import { engIntermediateLessons } from "@/resources/eng.intermediate";
import { engAdvancedLessons } from "@/resources/eng.advancend";
import { shanMusicLessons } from "@/resources/shan.musicLesson";
import { engMusicLessons } from "@/resources/eng.musicLesson";
import { cn } from "@/lib/utils";

export const LessonsPage = () => {
  const { lessonLevel, mode } = settingStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [lessons, setLessons] = useState<{ content: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();
  const lessonsPerPage = 10;

  const getLevelLessons = () => {
    let lessons: { content: string }[] = [];
    switch (lessonLevel) {
      case "beginner":
        lessons = mode === "eng" ? engBeginnerLessons : shanBeginnerLessons;
        break;
      case "intermediate":
        lessons =
          mode === "eng" ? engIntermediateLessons : shanIntermediateLessons;
        break;
      case "advanced":
        lessons = mode === "eng" ? engAdvancedLessons : shanAdvancedLessons;
        break;
      case "quotes":
        lessons = mode === "eng" ? engQuotesLessons : shanQuoteLessons;
        break;
      case "music":
        lessons = mode === "eng" ? engMusicLessons : shanMusicLessons;
        break;
      default:
        lessons = mode === "eng" ? engBeginnerLessons : shanBeginnerLessons;
        break;
    }
    setLessons(lessons);
  };

  useMemo(() => {
    getLevelLessons();
  }, [lessonLevel, mode]);

  //Filter lessons
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return lessons;
    return lessons.filter((lesson) =>
      lesson.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, lessons]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, lessonLevel, mode]);

  //Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Lessons - LikDai | လွင်ႈသွၼ်ႁဵၼ်း</title>
        <meta
          name="description"
          content="Start your Shan / Dai / Tai typing lessons (ၽိုၵ်းပေႃႉလိၵ်ႈတႆး) with LikDai. Step-by-step guides to mastering the keyboard."
        />
      </Helmet>

      <div className="min-h-screen pb-10">
        {/* Header */}
        <div className="layout py-8">
          <LessonHeader />

          {/* Language Selection */}
          <LessonLanguageSelector />

          {/* Level Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className=" mb-9 flex justify-center items-center w-full py-2"
          >
            <LevelCard />
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-8"
          >
            <div className="relative max-w-xl mx-auto">
              <Input
                id="search_lesson"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("lesson_page.search_btn")}
                className="bg-foreground border-none focus:ring-1! ring-primary/30 h-12 rounded-lg pl-10"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-60 size-5" />
            </div>
          </motion.div>

          {/* Lessons Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8 mb-10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow to-orange">
                  <CircleGauge className="size-6 text-white" />
                </div>
                <h2 className={cn("text-3xl font-bold")}>
                  {t(`lesson_page.${lessonLevel}.title`)}
                </h2>
              </div>
              <div className="flex items-center gap-2 text-sm opacity-80 bg-foreground/40 backdrop-blur-sm px-4 py-2 rounded-full">
                <Zap className="size-4" />
                <span>
                  {filteredLessons.length} {t("lesson_page.lessons")}
                </span>
              </div>
            </div>

            {filteredLessons.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-16"
              >
                <Search className="size-16 opacity-60 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  {t("lesson_page.not_found.title")}
                </h3>
                <p className="opacity-80 text-lg">
                  {t("lesson_page.not_found.description")}
                </p>
              </motion.div>
            ) : (
              <div className="grid xl:grid-cols-2 grid-cols-1 gap-3">
                {filteredLessons
                  .slice(
                    (currentPage - 1) * lessonsPerPage,
                    currentPage * lessonsPerPage,
                  )
                  .map((lesson, index) => (
                    <LessonGrid
                      key={index}
                      content={lesson.content}
                      index={(currentPage - 1) * lessonsPerPage + index}
                    />
                  ))}
              </div>
            )}
          </motion.div>
          <LessonPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={Math.ceil(filteredLessons.length / lessonsPerPage) || 1}
          />
        </div>
      </div>
    </>
  );
};

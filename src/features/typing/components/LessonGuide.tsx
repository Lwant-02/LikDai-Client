import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "react-router-dom";

import { settingStore } from "@/store/settingStore";
import { shanBeginnerLessons } from "@/resources/shan.beginner";
import { shanIntermediateLessons } from "@/resources/shan.intermediate";
import { shanAdvancedLessons } from "@/resources/shan.advancend";
import { shanQuoteLessons } from "@/resources/shan.quoteLessons";
import { shanMusicLessons } from "@/resources/shan.musicLesson";
import { engBeginnerLessons } from "@/resources/eng.beginner";
import { engIntermediateLessons } from "@/resources/eng.intermediate";
import { engAdvancedLessons } from "@/resources/eng.advancend";
import { engQuotesLessons } from "@/resources/eng.quoteLessons";
import { engMusicLessons } from "@/resources/eng.musicLesson";

export const LessonGuide = () => {
  const { setTargetText, mode } = settingStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const lessonNumber = Number(searchParams.get("lesson")) || 1;
  const level = searchParams.get("level") || "beginner";

  const lessonMap = {
    beginner: mode === "shan" ? shanBeginnerLessons : engBeginnerLessons,
    intermediate:
      mode === "shan" ? shanIntermediateLessons : engIntermediateLessons,
    advanced: mode === "shan" ? shanAdvancedLessons : engAdvancedLessons,
    quotes: mode === "shan" ? shanQuoteLessons : engQuotesLessons,
    music: mode === "shan" ? shanMusicLessons : engMusicLessons,
  };

  const lessons = lessonMap[level as keyof typeof lessonMap] || [];
  const lessonIndex = lessonNumber - 1;

  const goToLesson = (index: number) => {
    if (index >= 0 && index < lessons.length) {
      const newLessonNumber = index + 1;
      setSearchParams({ lesson: String(newLessonNumber), level });
      setTargetText(lessons[index].content);
    }
  };

  return (
    <div className="py-2  text-sm gap-7 xl:flex hidden justify-between items-center">
      {/* Prev */}
      <div
        onClick={() => goToLesson(lessonIndex - 1)}
        className={`gap-1 transition-opacity duration-200 cursor-pointer flex justify-center items-center ${
          lessonIndex === 0
            ? "opacity-30 pointer-events-none"
            : "opacity-50 hover:opacity-100"
        }`}
      >
        <ChevronLeft className="size-4 sm:size-5" />
        <p className="text-base notranslate">Prev</p>
      </div>

      {/* Lesson Number */}
      <div className="text-base font-bold text-yellow">
        Lessons - {lessonNumber}
      </div>

      {/* Next */}
      <div
        onClick={() => goToLesson(lessonIndex + 1)}
        className={`gap-1 transition-opacity duration-200 cursor-pointer flex justify-center items-center ${
          lessonIndex === lessons.length - 1
            ? "opacity-30 pointer-events-none"
            : "opacity-50 hover:opacity-100"
        }`}
      >
        <p className="text-base notranslate">Next</p>
        <ChevronRight className="size-4 sm:size-5" />
      </div>
    </div>
  );
};

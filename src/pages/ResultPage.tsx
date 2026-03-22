import { Navigate, useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import { ResultCard } from "@/components/ResultCard";
import { ResultsChart } from "@/components/ResultsChart";
import { authStore } from "@/store/authStore";
import { resultStore } from "@/store/resultStore";
import { saveFinalResults } from "@/service/saveFinalResults";
import { ResultNextButton } from "@/components/ResultNextButton";
import { RESULT_CONTENT } from "@/content/result.content";

export const ResultPage = () => {
  const {
    finalWpm,
    finalAccuracy,
    finalRawWpm,
    finalConsistency,
    finalTimeTaken,
    finalCorrectCharacters,
    finalLevel,
    finalMode,
    finalTypedCharacters,
  } = resultStore();
  const { accessToken } = authStore();
  const navigate = useNavigate();
  const hanSavedRef = useRef(false);

  // Format time for display (e.g., "1:30")
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  const actualTestResults = useMemo(
    () => ({
      wpm: finalWpm || 0,
      accuracy: finalAccuracy || 0,
      raw: finalRawWpm || 0,
      characters: finalTypedCharacters || 0,
      correct_chars: finalCorrectCharacters || 0,
      timeTaken: finalTimeTaken || 0,
      lessonLevel: (finalLevel || "unknown") as LessonLevel,
      consistency: finalConsistency || 0,
      mode: finalMode || "eng",
    }),
    [
      finalWpm,
      finalAccuracy,
      finalRawWpm,
      finalConsistency,
      finalTimeTaken,
      finalTypedCharacters,
      finalCorrectCharacters,
      finalLevel,
      finalMode,
    ],
  );

  //Save results to db
  useEffect(() => {
    if (accessToken && !hanSavedRef.current) {
      const saveResults = async () => {
        hanSavedRef.current = true;
        await saveFinalResults(actualTestResults);
      };
      saveResults();
    }
  }, [accessToken]);

  if (!finalWpm) {
    return <Navigate to="/lessons" replace />;
  }

  return (
    <>
      <Helmet>
        <title>{RESULT_CONTENT.metaTitle}</title>
        <meta name="description" content={RESULT_CONTENT.metaDescription} />
      </Helmet>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate("/normal-typing")}
        className="absolute top-10 left-[80px] flex items-center gap-2 text-primary/70 hover:text-primary transition-colors z-50 px-4 py-2 hover:bg-foreground/10 rounded-full cursor-pointer"
      >
        <ArrowLeft className="size-5" />
        <span className="font-semibold hidden sm:inline">
          {RESULT_CONTENT.back}
        </span>
      </motion.button>

      <motion.article
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full layout min-h-screen flex flex-col gap-8 items-center pt-16"
      >
        <h1 className="text-3xl font-bold mt-4">
          {RESULT_CONTENT.resultDetails}
        </h1>
        {!accessToken && (
          <div className="w-full h-auto flex flex-col gap-4 items-center ">
            <div className="bg-gradient-to-b flex justify-center items-center gap-2 shadow-sm border border-yellow/70 from-yellow/20 to-transparent p-3 text-center w-full rounded-full">
              <UsersIcon className="size-6 text-yellow md:flex hidden" />
              <p className="text-yellow">
                {RESULT_CONTENT.guestMode}{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-purple cursor-pointer underline"
                >
                  {RESULT_CONTENT.guestResultsNotSaved}
                </span>
              </p>
            </div>
            <div className="bg-gradient-to-b shadow-sm border text-red border-red/70 from-red/20 to-transparent p-3 text-center w-full rounded-full">
              {RESULT_CONTENT.loginToSave}
            </div>
          </div>
        )}
        <div className="grid md:grid-cols-3 grid-cols-2 gap-4 w-full">
          <ResultCard
            title="WPM"
            value={actualTestResults.wpm}
            subtitle="Words Per Minute"
            color="blue"
          />
          <ResultCard
            title="ACC"
            value={`${actualTestResults.accuracy}%`}
            subtitle="Accuracy"
            color="green"
          />
          <ResultCard
            title="LEVEL"
            value={actualTestResults.lessonLevel}
            subtitle="Lesson Level"
            color="orange"
            className="md:col-span-1 col-span-2"
          />
        </div>
        <ResultsChart
          wpm={actualTestResults.wpm}
          accuracy={actualTestResults.accuracy}
        />
        <div className="grid md:grid-cols-4 grid-cols-2 gap-4 w-full">
          <ResultCard
            title="RAW"
            value={actualTestResults.raw}
            subtitle="Raw WPM"
            color="blue"
          />
          <ResultCard
            title="CONSISTENCY"
            color="purple"
            value={actualTestResults.consistency}
            subtitle="Consistency"
          />
          <ResultCard
            title="CHARACTERS"
            value={`${actualTestResults.correct_chars}/${actualTestResults.characters}`}
            subtitle="Correct/Typed"
            color="green"
          />
          <ResultCard
            title="TIME"
            value={formatTime(actualTestResults.timeTaken)}
            subtitle="Time Taken"
            color="yellow"
          />
        </div>
        <ResultNextButton />
      </motion.article>
    </>
  );
};

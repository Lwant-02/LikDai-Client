import { RotateCcw } from "lucide-react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";
import { useEffect, useMemo, useRef } from "react";
import { Helmet } from "react-helmet-async";

import { ResultCard } from "@/components/ResultCard";
import { ResultsChart } from "@/components/ResultsChart";
import { authStore } from "@/store/authStore";
import { resultStore } from "@/store/resultStore";
import { saveFinalResults } from "@/service/saveFinalResults";

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

  //Get search params
  const [searchParams] = useSearchParams();
  const lessonNumber = Number(searchParams.get("lesson")) || 1;
  const level = searchParams.get("level") || "beginner";

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
    ]
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
        <title>Results | LikDai</title>
        <meta
          name="description"
          content="View your results and compare with others on the leaderboard."
        />
      </Helmet>

      <article className="w-full min-h-screen flex flex-col gap-8 items-center p-4">
        <h1 className="text-3xl font-bold mt-4">Result Details</h1>
        {!accessToken && (
          <div className="w-full h-auto flex flex-col gap-4 items-center ">
            <div className="bg-gradient-to-b flex justify-center items-center gap-2 shadow-sm border border-yellow/70 from-yellow/20 to-transparent p-3 text-center w-full rounded-lg">
              <UsersIcon className="size-6 text-yellow md:flex hidden" />
              <p className="text-yellow">
                You are in the guest mode.Your results will not be saved.{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-purple cursor-pointer underline"
                >
                  Login to save your results.
                </span>
              </p>
            </div>
            <div className="bg-gradient-to-b shadow-sm border text-red border-red/70 from-red/20 to-transparent p-3 text-center w-full rounded-lg">
              Guest results will not be saved. Please login to save your
              results.
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
        <button
          type="button"
          onClick={() =>
            navigate(`/typing-test?lesson=${lessonNumber}&level=${level}`)
          }
          className="opacity-70 border border-foreground py-1 px-2 mb-20 rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer flex gap-2 justify-center items-center"
        >
          <RotateCcw className="size-5 rotate-40" />
          <p>Retake Test</p>
        </button>
      </article>
    </>
  );
};

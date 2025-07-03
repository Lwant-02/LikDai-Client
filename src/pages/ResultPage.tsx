import { RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/24/solid";

import { ResultCard } from "@/components/ResultCard";
import { ResultsChart } from "@/components/ResultsChart";

export const ResultPage = () => {
  const navigate = useNavigate();
  // Simplified data with just final values
  const testResults = {
    wpm: 95,
    accuracy: 92,
    raw: 100,
    characters: 500,
    correctChars: 460,
    timeTaken: 90,
    testType: "words",
    wordCount: 25,
    consistency: 5,
  };

  // Format time for display (e.g., "1:30")
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <article className="w-full min-h-screen flex flex-col gap-8 items-center p-4">
      <h1 className="text-3xl font-bold mt-4">Result Details</h1>
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
          Guest results will not be saved. Please login to save your results.
        </div>
      </div>

      <div className="grid md:grid-cols-3 grid-cols-2 gap-4 w-full">
        <ResultCard
          title="WPM"
          value={testResults.wpm}
          subtitle="Words Per Minute"
          color="blue"
        />
        <ResultCard
          title="ACC"
          value={`${testResults.accuracy}%`}
          subtitle="Accuracy"
          color="green"
        />
        <ResultCard
          title="TEST"
          value={`Words ${testResults.wordCount}`}
          subtitle="Test Type"
          color="orange"
          className="md:col-span-1 col-span-2"
        />
      </div>
      <ResultsChart wpm={testResults.wpm} accuracy={testResults.accuracy} />
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 w-full">
        <ResultCard
          title="RAW"
          value={testResults.raw}
          subtitle="Raw WPM"
          color="blue"
        />
        <ResultCard
          title="CONSISTENCY"
          color="purple"
          value={testResults.consistency}
          subtitle="Consistency"
        />
        <ResultCard
          title="CHARS"
          value={`${testResults.correctChars}/${testResults.characters}`}
          subtitle="Characters"
          color="green"
        />
        <ResultCard
          title="TIME"
          value={formatTime(testResults.timeTaken)}
          subtitle="Time Taken"
          color="yellow"
        />
      </div>
      <button
        type="button"
        onClick={() => navigate("/typing-test")}
        className="opacity-70 border border-foreground py-1 px-2 mb-20 rounded-lg hover:opacity-100 transition-opacity duration-200 cursor-pointer flex gap-2 justify-center items-center"
      >
        <RotateCcw className="size-5 rotate-40" />
        <p>Take Another Test</p>
      </button>
    </article>
  );
};

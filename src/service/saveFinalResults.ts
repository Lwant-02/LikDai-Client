import { axiosInstance } from "@/lib/axiosInstance";

export const saveFinalResults = async (
  finalResults: TypingTestResult
): Promise<void> => {
  try {
    await axiosInstance.post("/test/save-results", finalResults);
  } catch (error) {
    console.log(error);
    return;
  }
};

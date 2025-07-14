import { axiosInstance } from "@/lib/axiosInstance";

export const saveFinalResults = async (
  finalResults: TypingTestResult
): Promise<boolean | undefined> => {
  try {
    const { data } = await axiosInstance.post(
      "/test/save-results",
      finalResults
    );
    return data.isSuccess;
  } catch (error) {
    console.log(error);
    return;
  }
};

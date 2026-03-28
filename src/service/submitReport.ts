import { authAxios } from "@/lib/axiosInstance";

export const submitReport = async (
  text: string,
  email: string
): Promise<boolean | undefined> => {
  try {
    const { data } = await authAxios.post("/report/submit", { text, email });
    return data.isSuccess;
  } catch (error) {
    console.log(error);
    return;
  }
};

import { format, parseISO } from "date-fns";

export const formatChartDate = (dateStr: string): string => {
  try {
    return format(parseISO(dateStr), "EEE");
  } catch (e) {
    return dateStr;
  }
};

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { motion } from "framer-motion";
import { getChartColor } from "@/util/getChartColor";
import { settingStore } from "@/store/settingStore";

interface ResultsChartProps {
  wpm: number;
  accuracy: number;
}

export const ResultsChart = ({ wpm, accuracy }: ResultsChartProps) => {
  const { theme } = settingStore();
  const data = [
    {
      name: "Your Results",
      wpm: wpm,
      accuracy: accuracy,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="w-full flex flex-col gap-4 mb-10 h-full"
    >
      <div className="w-full h-80 bg-foreground/5 rounded-lg p-4">
        <h3 className="text-xl font-bold mb-2">Performance</h3>
        <p className="text-sm opacity-70 mb-4">
          Final: {wpm} WPM • {accuracy}% accuracy
        </p>
        <ResponsiveContainer width="100%" height="85%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2b2e31" />
            <XAxis
              dataKey="name"
              stroke={theme === "dark" ? "#ffffff" : "#000000"}
            />
            <YAxis stroke={theme === "dark" ? "#ffffff" : "#000000"} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#040303",
                border: "1px solid #2b2e31",
                borderRadius: "8px",
              }}
              formatter={(value, name) => {
                if (name === "wpm") {
                  return [`${value} WPM`, "Words Per Minute"];
                }
                if (name === "accuracy") {
                  return [`${value}%`, "Accuracy"];
                }
                return [value, name];
              }}
            />
            <Legend />
            <Bar dataKey="wpm" name="WPM" fill={getChartColor("blue")} />
            <Bar
              dataKey="accuracy"
              name="Accuracy (%)"
              fill={getChartColor("green")}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

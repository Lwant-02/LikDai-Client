export const getChartColor = (colorName: string): string => {
  const colors = {
    blue: "#3674b5",
    yellow: "#dcb743",
    green: "#1f7d53",
    red: "#ea2f14",
    orange: "#ff7601",
    purple: "#7965c1",
  };
  return colors[colorName as keyof typeof colors] || colors.blue;
};

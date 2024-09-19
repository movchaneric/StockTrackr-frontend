import {
  CartesianGrid,
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGraphData } from "../features/dashboard/hooks/useGraphData";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { formatDateToYYYYMMDD, formatISOToDate } from "../utils/helpers";
import { useLastPurchaseDate } from "../features/dashboard/hooks/useLastPurhchaseDate";
import { useEffect, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const LineChartComp = () => {
  const { id: portfolioId } = useParams();
  const { lastDate: lastActionDate } = useLastPurchaseDate(portfolioId);
  const { graphData, isLoading, refetch } = useGraphData(portfolioId);
  const { isDarkMode } = useDarkMode();

  // Transform and sort graphData by date
  const transformedData = graphData
    ? Object.keys(graphData)
        .map((date) => ({
          date: formatDateToYYYYMMDD(date), // Full date as key
          amount: parseFloat(graphData[date].toFixed(2)), // Limit to 2 decimal places
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date)) // Sort by date
    : [];

  const lastGraphDate =
    transformedData.length > 0
      ? transformedData[transformedData.length - 1].date
      : null;

  // Control when to refetch based on the action date and graph date comparison
  useEffect(() => {
    if (lastGraphDate && lastActionDate <= formatISOToDate(lastGraphDate)) {
      refetch(); // Manually trigger the refetch
    }
  }, [lastActionDate, lastGraphDate, refetch]);

  // Handle color scheme based on dark/light mode
  const colors =
    isDarkMode === "dark-mode"
      ? {
          stroke: "#4f46e5",
          fill: "#4f46e5",
          text: "#e5e7eb",
          background: "#18212f",
          tooltipText: "#ffffff",
        }
      : {
          stroke: "#4f46e5",
          fill: "#c7d2fe",
          text: "#374151",
          background: "#ffffff",
          tooltipText: "#374151",
        };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <ResponsiveContainer width="100%" height={450}>
      <AreaChart
        data={transformedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 120, // Increase bottom margin for rotated labels
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tick={{ fill: colors.text }} // Darken the X-axis labels based on mode
          tickLine={{ stroke: colors.text }}
          angle={-50} // Rotate the dates
          textAnchor="end" // Ensure proper text alignment
          height={100} // Increase height for X-axis labels
        />
        <YAxis
          unit="$"
          tick={{ fill: colors.text }} // Darken the Y-axis labels based on mode
          tickLine={{ stroke: colors.text }}
        />
        <Tooltip
          contentStyle={{ backgroundColor: colors.background }} // Tooltip background color based on mode
          itemStyle={{ color: colors.tooltipText }} // Tooltip text color based on mode
          labelStyle={{ color: colors.tooltipText }} // Date in tooltip color based on mode
        />
        <Area
          dataKey="amount"
          type="monotone"
          stroke={colors.stroke}
          fill={colors.fill}
          strokeWidth={2}
          name="Amount"
          unit="$"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChartComp;

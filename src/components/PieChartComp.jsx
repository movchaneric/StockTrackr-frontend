import { Cell, Pie, PieChart, Tooltip } from "recharts";
import styled from "styled-components";
import { useStocks } from "../features/dashboard/hooks/useStocks";
import { useParams } from "react-router-dom";
import { getColorForTicker } from "../utils/helpers";
import { useBalance } from "../features/dashboard/hooks/useBalance";
import { useEffect } from "react";

const PieChartComp = ({ totalSum }) => {
  const { id } = useParams();
  const { filteredStocks } = useStocks(id);
  const { balance, isLoading } = useBalance(id);

  const data = filteredStocks.map((stock) => ({
    name: stock.companyName,
    value: (stock.totalSum / totalSum) * 100,
    color: getColorForTicker(stock.ticker),
  }));

  if (!data) {
    return <div>No data to display</div>;
  }
  // Add balance to the data array
  data.push({
    name: "Balance",
    value: (balance / totalSum) * 100,
    color: "#69fd2a",
  });

  return (
    <StyledPieChart>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx={150}
          cy={150}
          innerRadius={80}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={4}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => `${value.toFixed(2)}%`}
          contentStyle={{ fontWeight: "bold" }}
        />
      </PieChart>
    </StyledPieChart>
  );
};

const StyledPieChart = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;

export default PieChartComp;

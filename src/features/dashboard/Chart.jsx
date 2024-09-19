import styled from "styled-components";
import PieChartComp from "../../components/PieChartComp";

const Chart = ({ totalSum }) => {
  return (
    <StyledChart>
      <PieChartComp totalSum={totalSum} />
    </StyledChart>
  );
};

const StyledChart = styled.div`
  background-color: light;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default Chart;

import styled from "styled-components";
import LineChartComp from "../../components/LineChartComp";

const Graph = () => {
  return (
    <StyledGraph>
      <LineChartComp />
    </StyledGraph>
  );
};

const StyledGraph = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 100%; // Make sure the graph container takes up the full allocated space
  max-height: 400px; // Constrain the maximum height for the graph
  overflow: hidden; // Prevent overflow of the chart
`;
export default Graph;

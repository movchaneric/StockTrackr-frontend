import styled from "styled-components";

const Ticker = ({ tickerName, color }) => {
  return <StyledTicker color={color}>{tickerName}</StyledTicker>;
};

const StyledTicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: var(--border-radius-sm);
  background-color: ${(props) => props.color};
  color: white;
  font-weight: 400;
  width: 8rem;
  padding: 0.5rem;
`;

export default Ticker;

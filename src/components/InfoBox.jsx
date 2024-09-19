import styled from "styled-components";

const InfoBox = ({ label, value }) => {
  return (
    <StyledInfoBox>
      <Balance>{label}</Balance>
      <TotalAmount>{value}</TotalAmount>
    </StyledInfoBox>
  );
};

const StyledInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-grey-300);
  justify-content: center;
  align-items: start;
  padding: 1.2rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-50);
`;

const Balance = styled.div`
  font-size: 1.3rem;
  color: var(--color-grey-500);
  border-radius: var(--border-radius-lg);
`;

const TotalAmount = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-indigo-700);
  grid-column: 1 / 2;
  grid-row: 2 / 3;
`;

export default InfoBox;

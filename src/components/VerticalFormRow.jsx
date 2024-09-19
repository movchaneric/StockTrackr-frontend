import styled from "styled-components";
import Heading from "./Heading";

const VerticalFormRow = ({ children, label, errors }) => {
  return (
    <StyledVerticalFormRow>
      <Label>{label}</Label>
      <StyledError>{errors}</StyledError>
      {children}
    </StyledVerticalFormRow>
  );
};

const StyledError = styled.p`
  color: red;
`;

const StyledVerticalFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 1.2rem 0;
`;

const Label = styled.div`
  font-weight: 500;
  font-size: 1.6rem;
`;

export default VerticalFormRow;

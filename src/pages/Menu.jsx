import styled from "styled-components";
import Heading from "../components/Heading";
import Portfolios from "../components/Portfolios";
import { useUser } from "../features/login/hooks/useUser";

const Menu = () => {
  const { user } = useUser();
  return (
    <StyledMenu>
      <StyledHeading>
        {/* <Heading as="h1">Welcome, Eric</Heading> */}
        <Heading as="h1">
          <Span>{user?.userName}'s</Span> Portfolios
        </Heading>
      </StyledHeading>

      <Portfolios />
    </StyledMenu>
  );
};

const Span = styled.span`
  text-transform: capitalize;
`;
const StyledHeading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledMenu = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 20rem 35rem;
  background-color: var(--color-grey-50);
  overflow: hidden;
`;

export default Menu;

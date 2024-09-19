import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import Heading from "./Heading";
import IconSmall from "./IconSmall";

const Header = () => {
  return (
    <StyledHeader>
      <LeftHeader>
        <IconSmall />
        <Heading as="h2">StockTrackr</Heading>
      </LeftHeader>

      <HeaderMenu />
    </StyledHeader>
  );
};

const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHeader = styled.div`
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  padding: 0 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
`;

export default Header;

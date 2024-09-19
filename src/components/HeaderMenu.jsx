import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import Heading from "./Heading";
import { useUser } from "../features/login/hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

const HeaderMenu = () => {
  // Logged in user data
  const { user } = useUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // copy this function to apiAuthentication
  const handleLogOut = () => {
    localStorage.clear();
    queryClient.removeQueries(["user"]);
    navigate("/login", { replace: true });
  };

  return (
    <StyledAccount>
      <DarkModeToggle />
      <Span>{user?.userName}</Span>
      <ButtonIcon onClick={() => handleLogOut()}>
        <HiMiniArrowRightOnRectangle />
      </ButtonIcon>
    </StyledAccount>
  );
};

const Span = styled.span`
  text-transform: uppercase;
  font-weight: 700;
`;

const StyledAccount = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 2rem;
`;

export default HeaderMenu;

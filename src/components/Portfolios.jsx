import styled from "styled-components";
import Button from "./Button";
import AddPortfolio from "../features/portfolio-menu/AddPortfolio";
import { usePortfolios } from "../features/portfolio-menu/hooks/usePortfolios";
import Spinner from "./Spinner";
import { useUser } from "../features/login/hooks/useUser";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiOutlineXMark } from "react-icons/hi2";
import { useDeletePorftolio } from "../features/portfolio-menu/hooks/useDeletePortoflio";

const Portfolios = () => {
  const { portfolios, isLoading } = usePortfolios();
  const navigate = useNavigate();
  const { user } = useUser();
  const loggedInUserId = user?.userId;

  // Get all portfolios of the current logged in user
  const filteredPortfolios = portfolios?.filter(
    (portfolio) => portfolio.user.userId === loggedInUserId
  );

  if (isLoading) return <Spinner />;

  return (
    <div>
      <ButtonsContainer>
        {filteredPortfolios?.length === 0 && <div>No portfolios yet...</div>}
        {filteredPortfolios?.map((portfolio) => (
          <ButtonsRowContainer key={portfolio.portfolioId}>
            <StyledButton
              onClick={() => navigate(`/dashboard/${portfolio.portfolioId}`)}
            >
              {portfolio.portfolioName}
            </StyledButton>
          </ButtonsRowContainer>
        ))}
        <AddPortfolio userId={loggedInUserId} />
      </ButtonsContainer>
    </div>
  );
};

const StyledButton = styled(Button)`
  flex-grow: 1;
  text-align: center;
`;

const ButtonsRowContainer = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
  align-items: center;

  .Button {
    display: flex;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin-top: 2rem;
  padding: 2.4rem 1.2rem;

  :last-child {
    margin-top: 5rem;
  }
`;

export default Portfolios;

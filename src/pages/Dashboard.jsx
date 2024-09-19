import styled from "styled-components";
import Button from "../components/Button";
import Heading from "../components/Heading";
import Row from "../components/Row";
import DashboardLayout from "../features/dashboard/DashboardLayout";

import { useNavigate, useParams } from "react-router-dom";
import { HiArrowLongLeft } from "react-icons/hi2";
import { usePortfolio } from "../features/dashboard/hooks/usePortfolio";
import Spinner from "../components/Spinner";
import { useState } from "react";
import Modal from "../components/Modal";
import CashForm from "../features/dashboard/CashForm";
import { useDeletePorftolio } from "../features/portfolio-menu/hooks/useDeletePortoflio";

/**
 * Dashboard component for displaying portfolio details and providing actions
 * such as depositing, withdrawing, and deleting a portfolio.
 *
 * @component
 * @returns {JSX.Element} The rendered dashboard component.
 */
const Dashboard = () => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const { id } = useParams(); // Extracts the portfolio ID from the URL parameters
  const { portfolio, isLoading, error } = usePortfolio(id); // Fetch portfolio details, loading status, and errors using custom hook
  const { deletePortfolio, isDeleting } = useDeletePorftolio(); // Hook to handle portfolio deletion and track the deletion status

  // State to control the visibility of the modal and track the action type
  const [isOpenModal, setIsOpenModal] = useState(false);
  let [actionType, setActionType] = useState("");

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading portfolio</div>;
  if (!portfolio) return <div>Portfolio not found</div>;

  // Handle portfolio deletion
  // @param {string} portfolioId - The ID of the portfolio to delete
  const handleDelete = (portfolioId) => {
    console.log(portfolioId);
    navigate("/");
    deletePortfolio(portfolioId, {
      onSuccess: () => {
        navigate("/");
      },
    });
    console.log("portoflio-deleted");
  };

  // Open the modal and set the type of action (Deposit/Withdraw)
  // @param {string} type - The type of action to perform
  const openModal = (type) => {
    setActionType(type);
    setIsOpenModal(true);
  };

  return (
    <StyledDashboard>
      <Row type="horizontal">
        <StyledHeader>
          <HiArrowLongLeft onClick={() => navigate("/")} />
          <Heading as="h1">Portfolio {portfolio.portfolioName}</Heading>
        </StyledHeader>

        <ButtonContainer>
          <Button
            onClick={() => {
              openModal("Deposite");
            }}
          >
            Deposite
          </Button>
          <Button
            onClick={() => {
              openModal("Withdraw");
            }}
            variation="danger"
          >
            Withdraw
          </Button>
          <Button
            variation="secondary"
            onClick={() => navigate(`/dashboard/history/${id}`)}
          >
            Purchase history
          </Button>

          <Button variation="danger" onClick={() => handleDelete(id)}>
            Delete Porftolio
          </Button>
        </ButtonContainer>
      </Row>

      <DashboardLayout id={id} />

      {isOpenModal && (
        <Modal onClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal}>
          <div>
            <CashForm
              onClose={() => setIsOpenModal(false)}
              type={actionType}
              id={id}
            />
          </div>
        </Modal>
      )}
    </StyledDashboard>
  );
};

/**
 * Styled component for the button container, managing layout and spacing.
 */
const ButtonContainer = styled.div`
  display: flex;
  gap: 1.2rem;
`;

const StyledDashboard = styled.div`
  height: 100vh;
`;

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  font-size: 2.4rem;
  font-weight: 800;

  svg {
    font-size: 4rem;
    background-color: var(--color-brand-600);
    color: white;
    padding: 0 0.8rem;
    border-radius: var(--border-radius-sm);
    cursor: pointer;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default Dashboard;

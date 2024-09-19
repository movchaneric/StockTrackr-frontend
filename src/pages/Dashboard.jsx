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

const Dashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { portfolio, isLoading, error } = usePortfolio(id);
  const [isOpenModal, setIsOpenModal] = useState(false);
  let [actionType, setActionType] = useState("");
  const { deletePortfolio, isDeleting } = useDeletePorftolio();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading portfolio</div>;
  if (!portfolio) return <div>Portfolio not found</div>;

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

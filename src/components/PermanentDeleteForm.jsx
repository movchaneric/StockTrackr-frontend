import styled from "styled-components";
import Form from "./Form";
import Heading from "./Heading";
import Button from "./Button";
import { useDeleteAllActions } from "../features/dashboard/hooks/useDeleteAllActions";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const PermanentDeleteForm = ({ onClose, actionDataToDelete }) => {
  const queryClient = useQueryClient();
  const { id: portfolioId } = useParams();
  const { deleteAllActions, isDeleting } = useDeleteAllActions(portfolioId);

  console.log("actionDataToDelete: ", actionDataToDelete);
  const { transacationId } = actionDataToDelete;

  function handleDeleteActionsSubmit(e) {
    e.preventDefault();
    // console.log("Transaction to delete from: ", transacationId);
    deleteAllActions(transacationId, {
      onSuccess: () => {
        onClose();
      },
    });
  }
  return (
    <Form onSubmit={handleDeleteActionsSubmit}>
      <CenteredDiv>
        <p>
          Are you sure you want to delete all transactions from this point on?
        </p>
      </CenteredDiv>
      <ButtonsBox>
        <Button variation="danger" type="submit">
          Delete
        </Button>
        <Button variation="secondary" onClick={onClose}>
          Cancel
        </Button>
      </ButtonsBox>
    </Form>
  );
};

const ButtonsBox = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.4rem;
`;

const CenteredDiv = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  p {
    text-align: center;
    margin-bottom: 1rem;
    font-size: 16px;
    font-weight: 500;
  }
`;

export default PermanentDeleteForm;

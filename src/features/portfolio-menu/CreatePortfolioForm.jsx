import Form from "../../components/Form";
import VerticalFormRow from "../../components/VerticalFormRow";
import Input from "../../components/Input";
import styled from "styled-components";
import Button from "../../components/Button";
import { useCreatePortfolio } from "./hooks/useCreatePortfolio";
import { useState } from "react";

const CreatePortfolioForm = ({ onClose, userId: user_id }) => {
  const [portfolio_name, setPortfolioName] = useState("");

  const { createPortfolio, isCreating } = useCreatePortfolio();

  function handleAddPortfolio(e) {
    e.preventDefault();
    createPortfolio(
      { user_id, portfolio_name },
      {
        onSettled: () => {
          onClose();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleAddPortfolio}>
      <VerticalFormRow label="Portfolio name">
        <Input
          type="text"
          onChange={(e) => setPortfolioName(e.target.value)}
          disabled={isCreating}
        />
      </VerticalFormRow>
      <Button disabled={isCreating}>Add new portfolio</Button>
    </Form>
  );
};

const Error = styled.span`
  color: var(--color-red-700);
`;

export default CreatePortfolioForm;

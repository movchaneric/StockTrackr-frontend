import { useForm } from "react-hook-form";

import Form from "../../components/Form";
import VerticalFormRow from "../../components/VerticalFormRow";
import Input from "../../components/Input";
import styled from "styled-components";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { useCashAction } from "./hooks/useCashDeposite";
import { useState } from "react";
import FormRow from "../../components/FormRow";
import {
  formatDateTimeLocal,
  formatDateTimeLocalToDB,
  getYesterdayFormattedDate,
} from "../../utils/helpers";
import { useLastPurchaseDate } from "./hooks/useLastPurhchaseDate";
import { useQueryClient } from "@tanstack/react-query";
import { currentDateAndTimestamp } from "../../utils/constVariables";


/**
 * CashForm component is used for handling cash actions (Deposit/Withdraw) in the portfolio.
 * Users can input the amount and choose whether to set a custom date or use the current date.
 *
 * @component
 * @param {Object} props - The component props
 * @param {function} props.onClose - Function to close the form after submission
 * @param {string} props.type - The type of action ("Deposit" or "Withdraw")
 * @param {string} props.id - The ID of the portfolio
 * @returns {JSX.Element} The rendered form component for cash actions.
 */
const CashForm = ({ onClose, type, id: portfolioId }) => {
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState } = useForm(); // Hook for form management (handle submit, validation, etc.)

  const { cashAction, cashActionLoading } = useCashAction(); // Custom hook for handling cash deposit or withdraw action
  
  const [isCustomDate, setIsCustomDate] = useState(false);

  // Get the last purchase date for the portfolio using a custom hook
  const { lastDate } = useLastPurchaseDate(portfolioId);
  const formattedLastDate = formatDateTimeLocal(lastDate);

  // Extract validation errors from the form state
  const { errors } = formState;

  console.log("isCustomDate:", isCustomDate);

  /**
   * Handles the form submission. Formats the data for database storage and triggers the appropriate
   * cash action (Deposit or Withdraw).
   *
   * @param {Object} data - The data submitted from the form
   */
  function onSubmit(data) {
    console.log(data);
    let customData = { ...data };

    // Parse the sum from the input value
    const parsedSum = parseFloat(data.sum);

    if (isCustomDate) {
      // If custom date is selected, format it for the database
      const formattedDate = formatDateTimeLocalToDB(data.date);
      customData = { ...data, date: formattedDate };
      console.log("customData to DB: ", customData);
    } else {
      // Otherwise, use the current date and timestamp
      console.log("Current-date-time: ", currentDateAndTimestamp);
      customData = { ...data, date: currentDateAndTimestamp };
    }

    // Trigger the cash action (Deposit or Withdraw)
    if (type === "Deposite") {
      cashAction(
        {
          sum: parsedSum,
          portfolioId,
          actionId: "1",
          parsedDate: customData.date,
        },
        {
          onSuccess: () => {
            // Invalidate queries to refetch the updated data after the action
            queryClient.invalidateQueries([
              "history-transactions",
              portfolioId,
            ]);
            onClose(); // Close the form
          },
        }
      );
    } else {
      cashAction(
        {
          sum: parsedSum,
          portfolioId,
          actionId: "2", // Withdraw action
          parsedDate: customData.date,
        },
        {
          onSuccess: () => {
            // Invalidate queries to refetch the updated data after the action
            queryClient.invalidateQueries([
              "history-transactions",
              portfolioId,
            ]);
            onClose(); // Close the form
          },
        }
      );
    }
  }

  if (cashActionLoading) {
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <VerticalFormRow label="Amount">
        <Input
          type="number"
          id="sum"
          step="0.01"
          {...register("sum", {
            required: "Amount cannot be empty",
          })}
        />
        {errors.sum && <Error>{errors.sum.message}</Error>}
      </VerticalFormRow>

      <VerticalFormRow label="Date">
        <Input
          type="datetime-local"
          {...register("date", {
            required: isCustomDate ? "Date is required" : false,
          })}
          disabled={!isCustomDate}
          min={formattedLastDate} // Disable dates before lastDate
          max={getYesterdayFormattedDate()}
        />
        {errors.date && <Error>{errors.date.message}</Error>}
      </VerticalFormRow>
      <FormRow label="Set custom date and time">
        <Input
          type="checkbox"
          onChange={() => setIsCustomDate((prevState) => !prevState)}
        />
      </FormRow>

      <Button variation={type === "Withdraw" ? "danger" : "primary"}>
        {type}
      </Button>
    </Form>
  );
};

const Error = styled.span`
  color: var(--color-red-700);
`;

export default CashForm;

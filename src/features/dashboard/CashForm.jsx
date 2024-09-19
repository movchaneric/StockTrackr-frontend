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

const CashForm = ({ onClose, type, id: portfolioId }) => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState } = useForm();
  const { cashAction, cashActionLoading } = useCashAction();
  const [isCustomDate, setIsCustomDate] = useState(false);
  const { lastDate } = useLastPurchaseDate(portfolioId);
  const formattedLastDate = formatDateTimeLocal(lastDate);

  const { errors } = formState;

  console.log("isCustomDate:", isCustomDate);

  function onSubmit(data) {
    console.log(data);
    let customData = { ...data };

    const parsedSum = parseFloat(data.sum);

    if (isCustomDate) {
      // If custom date, format it to match the required format
      const formattedDate = formatDateTimeLocalToDB(data.date);
      customData = { ...data, date: formattedDate };
      console.log("customData to DB: ", customData);
    } else {
      console.log("Current-date-time: ", currentDateAndTimestamp);
      customData = { ...data, date: currentDateAndTimestamp };
    }

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
            queryClient.invalidateQueries([
              "history-transactions",
              portfolioId,
            ]);
            onClose();
          },
        }
      );
    } else {
      cashAction(
        {
          sum: parsedSum,
          portfolioId,
          actionId: "2",
          parsedDate: customData.date,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries([
              "history-transactions",
              portfolioId,
            ]);
            onClose();
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

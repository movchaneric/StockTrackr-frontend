import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import Spinner from "../../components/Spinner";
import { getCurrentDateAndTime } from "../../utils/helpers";

import { useSellStock } from "./hooks/useSellStock";
import { useQueryClient } from "@tanstack/react-query";

const StockActionForm = ({ actionType, ticker, price, quantity, onClose }) => {
  const { sellStock, isSelling } = useSellStock();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange", // Ensures validation is checked on input change
  });
  const { id: portfolioId } = useParams();
  const { errors, isValid } = formState;

  function onSubmit(data) {
    console.log("click sell");
    console.log(data);
    const { amount, currentPrice, ticker } = data;

    const price = parseFloat(currentPrice);
    const parsedAmount = parseInt(amount, 10);

    const dataToApi = {
      portfolioId,
      ticker,
      price,
      amount: parsedAmount,
      date: getCurrentDateAndTime(),
    };

    sellStock(
      { ...dataToApi, actionId: "2" },
      {
        onSuccess: () => {
          onClose();
        },
        onSettled: () => {
          queryClient.invalidateQueries(["history-transactions", portfolioId]);

          reset();
        },
      }
    );
  }

  if (isSelling) {
    console.log("Is selling...");
    return <Spinner />;
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Ticker">
        <Input
          type="text"
          {...register("ticker")}
          value={ticker}
          // disabled={true}
        />
      </FormRow>

      {/* Get the last price i bought this stock */}
      <FormRow label="Price">
        <Input
          type="number"
          id="price"
          step="0.01"
          value={price}
          // disabled={true}
          {...register("currentPrice", {
            required: "Price cannot be empty",
          })}
        />
      </FormRow>

      <FormRow label="Amount" errors={errors?.amount?.message}>
        <Input
          type="number"
          value={quantity}
          // disabled={true}
          {...register("amount")}
        />
      </FormRow>

      <Button type="submit">Sell</Button>
    </Form>
  );
};

export default StockActionForm;

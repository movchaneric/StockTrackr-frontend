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

/**
 * StockActionForm component allows users to sell a specific stock by submitting a form with 
 * the stock's details such as ticker, price, and quantity.
 *
 * @component
 * @param {Object} props - The component props
 * @param {string} props.actionType - The type of action (in this case, "sell")
 * @param {string} props.ticker - The stock ticker
 * @param {number} props.price - The current price of the stock
 * @param {number} props.quantity - The quantity of the stock to sell
 * @param {function} props.onClose - Function to close the form after the action is completed
 * @returns {JSX.Element} The rendered form component for selling a stock.
 */
const StockActionForm = ({ actionType, ticker, price, quantity, onClose }) => {
  // Custom hook for handling the stock selling action
  const { sellStock, isSelling } = useSellStock();
 
  // Hook to manage queries related to stocks and transactions
  const queryClient = useQueryClient();
  
  // React Hook Form setup for form handling, validation, and state management
  const { register, handleSubmit, formState, reset } = useForm({
    mode: "onChange", // Ensures validation is checked on input change
  });
  
  // Get portfolio ID from URL parameters
  const { id: portfolioId } = useParams();
  
  // Extract errors and form validity state
  const { errors, isValid } = formState;


  /**
   * Handles form submission to execute the stock sell action.
   * Prepares the data and triggers the sell stock API call.
   *
   * @param {Object} data - The data submitted from the form
   */
  function onSubmit(data) {
    console.log(data);
    const { amount, currentPrice, ticker } = data;

    const price = parseFloat(currentPrice);
    const parsedAmount = parseInt(amount, 10);

    // Data structure to be sent to the API
    const dataToApi = {
      portfolioId,
      ticker,
      price,
      amount: parsedAmount,
      date: getCurrentDateAndTime(),
    };

    // Trigger the sell stock action
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

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import FormRow from "../../../components/FormRow";
import Input from "../../../components/Input";
import Heading from "../../../components/Heading";
// import SpinnerMini from "../../../components/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentDateAndTimestamp } from "../../../utils/constVariables";
import { useCreateStock } from "../hooks/useCreateStock";
import { formatISOToDate } from "../../../utils/helpers";
import {
  formatDateTimeLocal,
  formatDateTimeLocalToDB,
  getYesterdayFormattedDate,
} from "../../../utils/helpers";
import Error from "../../../components/Error";
import { useLastPurchaseDate } from "../hooks/useLastPurhchaseDate";
import { SERVER_IP_ADDRESS } from "../../../utils/constVariables";
const BuyStockForm = ({ ticker, currentPrice, quantity, onClose }) => {
  // useQueryClient is used to manage cache and refetching after certain operations
  const queryClient = useQueryClient();

  // States to manage custom date, fetching state, and input blur behavior
  const [isCustomDate, setIsCustomDate] = useState(true);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);

  // react-hook-form provides form handling and validation
  const { register, handleSubmit, formState, reset, setValue, watch } = useForm({
    mode: "onChange",
  });

  // Hook for creating stock transactions
  const { createStock, isCreating } = useCreateStock();

  // Extract portfolioId from URL parameters using react-router's useParams hook
  const { id: portfolioId } = useParams();

  // Hook to get the last purchase date for a specific portfolio
  const { lastDate } = useLastPurchaseDate(portfolioId);
  const formattedLastDate = formatDateTimeLocal(lastDate);

  const { errors } = formState;

  // Watch changes in the "date" input field
  const selectedDate = watch("date");
  console.log("selectedDate: ", formatISOToDate(selectedDate));

  useEffect(() => {
    // Set default values for price and ticker when the component mounts or ticker changes
    if (currentPrice && ticker) {
      setValue("price", currentPrice);
      setValue("ticker", ticker);
    }
  }, [currentPrice, ticker, setValue]);

  useEffect(() => {
    // Reset blur state after ticker changes
    if (hasBlurred) {
      setHasBlurred(false);
    }
  }, [ticker, hasBlurred]);

  // Fetch the current price of the stock based on the selected date
  const handleTickerBlurCurrentPrice = async () => {
    if (selectedDate && !hasBlurred) {
      setIsFetchingPrice(true);
      try {
        // Fetch stock price for a given ticker and date
        const response = await axios.get(
          `http://${SERVER_IP_ADDRESS}/stock/last_price?ticker=${ticker}&date=${formatISOToDate(selectedDate)}`
        );
        const fetchedCurrentPrice = response.data;

        setValue("price", fetchedCurrentPrice);
        setHasBlurred(true);
      } catch (error) {
        // Set price to 0 in case of error
        setValue("price", 0);
        console.error("Error fetching current price:", error);
      } finally {
        setIsFetchingPrice(false);
      }
    }
  };

  // Function to handle form submission (buy stock)
  function onSubmit(data) {
    const { price } = data;
    let customData;

    // Assign current timestamp if not using custom date
    if (!isCustomDate) {
      customData = { ...data, date: currentDateAndTimestamp };
    } else {
      // Format custom date for the database
      const { date } = data;
      const formattedDate = formatDateTimeLocalToDB(date);
      customData = { ...data, date: formattedDate };
    }

    const formData = {
      ...customData,
      portfolioId,
      actionId: "1", // Hardcoding actionId for "Buy" action
      price,
    };

    console.log("data to createStock request", formData);

    // Create the stock transaction and refresh relevant data
    createStock(formData, {
      onSuccess: () => {
        // Invalidate cached queries to refetch updated data
        queryClient.invalidateQueries(["stocks", portfolioId]);
        queryClient.invalidateQueries(["balance", portfolioId]);
        queryClient.invalidateQueries(["history-transactions", portfolioId]);

        onClose();  // Close the form
        reset();    // Reset form fields
      },
    });
  }

  return (
    <>
      {/* Form for buying stock */}
      <Heading>Buy stock</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Input for Ticker */}
        <FormRow label="Ticker">
          <Input type="text" {...register("ticker")} />
        </FormRow>

        {/* Input for Amount */}
        <FormRow label="Amount" errors={errors?.amount?.message}>
          <Input
            type="number"
            value={quantity}
            {...register("amount")}
          />
        </FormRow>

        {/* Input for Price */}
        <FormRow label="Price" errors={errors?.price?.message}>
          <Input
            type="number"
            id="price"
            step="0.01"
            {...register("price", {
              required: "Price cannot be empty",
            })}
          />
        </FormRow>

        {/* Input for Date */}
        <FormRow label="Date">
          <Input
            type="datetime-local"
            {...register("date", {
              required: !isCustomDate ? "Date is required" : false,
              validate: (value) => {
                const date = new Date(value);
                const day = date.getDay();
                // Prevent selecting weekend dates
                return (day !== 0 && day !== 6) || "Weekends are not allowed";
              },
            })}
            onBlur={handleTickerBlurCurrentPrice}
            min={formattedLastDate}
            max={getYesterdayFormattedDate()}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </FormRow>

        <Button type="submit">Buy</Button>
      </Form>
    </>
  );
};

export default BuyStockForm;

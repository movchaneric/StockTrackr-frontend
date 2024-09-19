import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Button from "../../../components/Button";
import Form from "../../../components/Form";
import FormRow from "../../../components/FormRow";
import Input from "../../../components/Input";
import Heading from "../../../components/Heading";
import Error from "../../../components/Error";
import SpinnerMini from "../../../components/SpinnerMini";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentDateAndTimestamp } from "../../../utils/constVariables";
import { useCreateStock } from "../hooks/useCreateStock";
import {
  formatDateTimeLocal,
  formatDateTimeLocalToDB,
  getCurrentStockMarketDate,
  getYesterdayFormattedDate,
} from "../../../utils/helpers";
import { useSellStock } from "../hooks/useSellStock";
import { useLastPurchaseDate } from "../hooks/useLastPurhchaseDate";
import { formatISOToDate } from "../../../utils/helpers";
import { SERVER_IP_ADDRESS } from "../../../utils/constVariables";

const SellStockForm = ({ ticker, currentPrice, maxAmount, onClose }) => {
  // UseState
  const [isCustomDate, setIsCustomDate] = useState(true);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  // Custom hooks
  const { id: portfolioId } = useParams();
  const { lastDate } = useLastPurchaseDate(portfolioId);
  const formattedLastDate = formatDateTimeLocal(lastDate);
  const { sellStock, isSelling } = useSellStock();
  // Imported hooks
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState, reset, setValue, watch } = useForm(
    {
      mode: "onChange",
    }
  );
  const { errors } = formState;

  const selectedDate = watch("date");
  console.log("selectedDate: ", formatISOToDate(selectedDate));

  useEffect(() => {
    if (currentPrice && ticker) {
      setValue("price", currentPrice);
      setValue("ticker", ticker);
    }
  }, [currentPrice, ticker, setValue]);

  useEffect(() => {
    if (hasBlurred) {
      setHasBlurred(false);
    }
  }, [ticker, hasBlurred]);

  // Trigger function only when user finished selecting date input
  const handleTickerBlurCurrentPrice = async () => {
    if (selectedDate && !hasBlurred) {
      setIsFetchingPrice(true);
      try {
        // TODO: get the current date if satureday or sunday get last friday
        const response = await axios.get(
          `http://${SERVER_IP_ADDRESS}/stock/last_price?ticker=${ticker}&date=${formatISOToDate(selectedDate)}`
        );
        const fetchedCurrentPrice = response.data;

        setValue("price", fetchedCurrentPrice);
        setHasBlurred(true);
      } catch (error) {
        setValue("price", 0);
        console.error("Error fetching current price:", error);
      } finally {
        setIsFetchingPrice(false);
      }
    }
  };

  //SELL FORM SUBMIT
  function onSubmit(data) {
    const { price } = data;
    let customData;
    if (!isCustomDate) {
      console.log("Chose CUSTOM DATE");
      customData = { ...data, date: currentDateAndTimestamp };
    } else {
      console.log("Chose NOTTTT CUSTOM DATE");
      const { date } = data;
      const formattedDate = formatDateTimeLocalToDB(date);
      customData = { ...data, date: formattedDate };
    }

    const formData = {
      ...customData,
      portfolioId,
      actionId: "2",
      price,
    };

    console.log(formData);

    sellStock(formData, {
      onSuccess: () => {
        // Invalidate queries to refetch data
        queryClient.invalidateQueries(["stocks", portfolioId]);
        queryClient.invalidateQueries(["balance", portfolioId]);
        queryClient.invalidateQueries(["history-transactions", portfolioId]);

        onClose();

        reset();
      },
    });
  }

  return (
    <>
      <Heading>Sell stock</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Ticker">
          <Input type="text" {...register("ticker")} disabled={isSelling} />
        </FormRow>

        <FormRow label="Amount" errors={errors?.amount?.message}>
          <Input
            type="number"
            {...register("amount", {
              required: "Amount is required",
              validate: (value) =>
                value <= maxAmount || "Insufficient stock amount",
            })}
            disabled={isSelling}
          />
        </FormRow>

        <FormRow label="Price" errors={errors?.price?.message}>
          <Input
            type="number"
            id="price"
            step="0.01"
            {...register("price", {
              required: "Price cannot be empty",
              min: {
                value: 0.01, // Ensures price is greater than 0
                message: "Price must be greater than zero",
              },
            })}
            disabled={isSelling}
          />
          <Error>{errors?.currentPrice?.message}</Error>
        </FormRow>

        <FormRow label="Current/Custom date">
          <Input
            type="datetime-local"
            {...register("date", {
              required: !isCustomDate ? "Date is required" : false,
            })}
            disabled={isSelling}
            onBlur={handleTickerBlurCurrentPrice}
            min={formattedLastDate}
            max={getYesterdayFormattedDate()}
          />
          {errors.date && <Error>{errors.date.message}</Error>}
        </FormRow>

        {/* <FormRow label="Set custom date and time">
          <Input
            type="checkbox"
            onChange={() => setIsCustomDate((prevState) => !prevState)}
          />
        </FormRow> */}

        <Button type="submit">{isSelling ? <SpinnerMini /> : "Sell"}</Button>
      </Form>
    </>
  );
};

export default SellStockForm;

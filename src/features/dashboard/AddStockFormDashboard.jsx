import { Controller, useForm } from "react-hook-form";
import Form from "../../components/Form";
import FormRow from "../../components/FormRow";
import Input from "../../components/Input";
import styled from "styled-components";
import Select from "react-select";
import Button from "../../components/Button";
import { useCreateStock } from "./hooks/useCreateStock";
import Spinner from "../../components/Spinner";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  formatDateTimeLocal,
  formatDateTimeLocalToDB,
  formatISOToDate,
  getYesterdayFormattedDate,
} from "../../utils/helpers";
import { useQueryClient } from "@tanstack/react-query";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Heading from "../../components/Heading";
import { SERVER_IP_ADDRESS } from "../../utils/constVariables";
import { useLastPurchaseDate } from "./hooks/useLastPurhchaseDate";

/**
 * AddStockFormDashboard component allows the user to buy or update stock information
 * by submitting a form with stock details such as ticker, amount, price, and date.
 *
 * @component
 * @param {Object} props - The component props
 * @param {function} props.onClose - Function to close the modal after form submission
 * @param {number} props.cashBalance - The current available cash balance in the portfolio
 * @param {function} props.setIsAddFunds - Function to trigger an add-funds action
 * @returns {JSX.Element} The rendered form component for adding or updating stock.
 */
const AddStockFormDashboard = ({ onClose, cashBalance, setIsAddFunds }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState,
    control,
    watch,
  } = useForm();
  const { errors } = formState; // Extracts validation errors from the form state
  const { id: portfolioId } = useParams(); // Retrieves the portfolio ID from the URL parameters
  const { createStock, isCreating } = useCreateStock(portfolioId); // Custom hook to create a stock in the portfolio

  // Local states for managing price fetching, form interactions, and date handling
  const [isFetchingPrice, setIsFetchingPrice] = useState(false);
  const [hasBlurred, setHasBlurred] = useState(false);
  const [isCustomDate, setIsCustomDate] = useState(true);

  // Hook to get the last purchase date of a stock in the portfolio
  const { lastDate } = useLastPurchaseDate(portfolioId);
  const formattedLastDate = formatDateTimeLocal(lastDate);

  // Query client for invalidating and refetching data after stock creation
  const queryClient = useQueryClient();

  // Watch input fields
  const amount = watch("amount");
  const price = watch("price");
  const ticker = watch("ticker");
  const selectedDate = watch("date");

  // Effect to reset blur state when the ticker value changes
  useEffect(() => {
    if (hasBlurred) {
      setHasBlurred(false);
    }
  }, [ticker, hasBlurred]);

  /**
   * Fetches the current price of the stock for the selected date after the ticker input loses focus.
   * If the date is a weekend (Saturday/Sunday), it adjusts to fetch the price for the last Friday.
   */
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

  // Calculates the total cost based on amount and price
  const totalCost =
    amount && price ? parseFloat(amount) * parseFloat(price) : 0;
  const isInsufficientFunds = cashBalance < totalCost;

  /**
   * Handles form submission to create a stock purchase entry.
   * Formats the date appropriately for database storage and triggers the creation of the stock.
   *
   * @param {Object} data - The form data submitted by the user
   */
  function onSubmit(data) {
    let customData;

    const { date } = data;
    const formattedDate = formatDateTimeLocalToDB(date);
    customData = { ...data, date: formattedDate };

    const dataToDB = { ...customData, portfolioId, actionId: "1" };

    console.log("AddStockFormDashboard: ", dataToDB);

    createStock(dataToDB, {
      onSuccess: () => {
        // Invalidate queries to refetch updated portfolio data
        queryClient.invalidateQueries(["stocks", portfolioId]);
        queryClient.invalidateQueries(["balance", portfolioId]);
        queryClient.invalidateQueries(["history-transactions", portfolioId]);

        onClose(); // Close the modal

        reset(); // Reset the form
      },
    });
  }

  // Show loading spinner while the stock is being created
  if (isCreating) return <Spinner />; 

  return (
    <>
      <Heading as="h1">Buy / Update Stock</Heading>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Ticker">
          <Input
            type="text"
            id="ticker"
            {...register("ticker", {
              required: "Ticker is required",
              onChange: (e) => setValue("ticker", e.target.value.toUpperCase()),
            })}
          />
          {errors.ticker && <Error>{errors.ticker.message}</Error>}
        </FormRow>
        <FormRow label="Amount">
          <Input
            tpye="number"
            id="amount"
            {...register("amount", {
              required: "Amount is required",
            })}
            disabled={isFetchingPrice}
          />
          {errors.amount && <Error>{errors.amount.message}</Error>}
        </FormRow>
        <FormRow label="Price">
          <Input
            type="number"
            id="price"
            step="0.01"
            {...register("price", {
              required: "Price is required",
              validate: (value) => {
                const floatValue = parseFloat(value);
                return !isNaN(floatValue) && floatValue > 0
                  ? true
                  : "Price must be a valid positive number";
              },
            })}
            disabled={isFetchingPrice}
          />
          {errors.price && <Error>{errors.price.message}</Error>}
        </FormRow>

        <FormRow label="Date">
          <Input
            type="datetime-local"
            {...register("date", {
              required: !isCustomDate ? "Date is required" : false,
              validate: (value) => {
                const date = new Date(value);
                const day = date.getDay();
                return (day !== 0 && day !== 6) || "Weekends are not allowed";
              },
            })}
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
        {/* Display error if funds are insufficient */}
        {isInsufficientFunds && (
          <Error>
            Insufficient funds. You need {totalCost.toFixed(2)}$ but only have{" "}
            {cashBalance}
            $.
          </Error>
        )}
        {/* BUTTONS SECTION */}
        <FormRow>
          {isInsufficientFunds > 0 && (
            <Button type="button" onClick={() => setIsAddFunds(true)}>
              Add funds
            </Button>
          )}

          <Button
            type="submit"
            disabled={
              isInsufficientFunds || isFetchingPrice || getValues("price") === 0
            }
          >
            Add Stock
          </Button>
        </FormRow>
      </Form>
    </>
  );
};

const Error = styled.span`
  color: var(--color-red-700);
`;

export default AddStockFormDashboard;

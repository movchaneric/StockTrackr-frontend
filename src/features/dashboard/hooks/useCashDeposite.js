import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cashAction as cashActionAPI } from "../../../services/apiPortfolio";

/**
 * Custom hook to handle cash actions (deposit or withdraw) in a portfolio using React Query's `useMutation`.
 * This hook validates the action (e.g., checks for sufficient funds before withdrawing) and handles API interactions.
 *
 * @returns {Object} Contains the `cashAction` function to trigger the mutation and
 * a loading state `cashActionLoading` to indicate if the cash action process is ongoing.
 */

export function useCashAction() {
  const queryClient = useQueryClient();

  const { mutate: cashAction, isLoading: cashActionLoading } = useMutation({
    /**
     * Function that triggers the API call for cash actions (deposit/withdraw).
     * Validates whether there are sufficient funds for withdrawal.
     *
     * @param {Object} payload - The payload for the cash action
     * @param {string} payload.portfolioId - The ID of the portfolio
     * @param {string} payload.actionId - The action type ("1" for deposit, "2" for withdraw)
     * @param {number} payload.sum - The amount of cash for the action
     * @param {string} payload.parsedDate - The date of the cash action
     * @returns {Promise} The API call to perform the cash action
     */
    mutationFn: async ({ portfolioId, actionId, sum, parsedDate }) => {
      // Check if the action is a withdrawal and validate funds
      if (actionId === "2") {
        const currentBalance = queryClient.getQueryData([
          "balance",
          portfolioId,
        ]);

        if (sum > currentBalance) {
          toast.error("Insufficient funds for this action");
          return Promise.reject(new Error("Insufficient funds"));
        }
      }
      // Proceed with the API call if the condition is met
      return cashActionAPI({ portfolioId, actionId, sum, parsedDate });
    },

    /**
     * Called when the cash action API call is successful.
     * Displays a success toast based on whether it was a deposit or withdraw.
     *
     * @param {Object} data - The response data (not used here)
     * @param {Object} variables - The input variables, including `actionId`
     */
    onSuccess: (_, { actionId }) => {
      // Show different success messages based on actionId
      if (actionId === "1") {
        toast.success("Cash has been deposited to your portfolio");
      } else if (actionId === "2") {
        toast.success("Cash has been withdrawn from your portfolio");
      }
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },

    /**
     * Called when the cash action API call fails.
     * Displays an error toast with the error message.
     *
     * @param {Object} err - The error object returned from the API
     */
    onError: (err) => toast.error(err.message),
  });

  return { cashAction, cashActionLoading };
}

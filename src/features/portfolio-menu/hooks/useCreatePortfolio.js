import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewPortfolio as addNewPortfolioAPI } from "../../../services/apiPortfolio";
import toast from "react-hot-toast";

/**
 * Custom hook to handle the creation of a new portfolio using React Query's `useMutation`.
 * It manages the API call to add a portfolio and handles success and error scenarios.
 *
 * @returns {Object} Contains the `createPortfolio` function to trigger the mutation and 
 * a loading state `isCreating` to indicate if the portfolio creation is in progress.
 */
export function useCreatePortfolio() {
  // QueryClient instance to manage and manipulate query cache
  const queryClient = useQueryClient();

  // React Query's useMutation to handle the portfolio creation API request
  const { mutate: createPortfolio, isLoading: isCreating } = useMutation({
    /**
     * Function that triggers the API call to add a new portfolio.
     *
     * @param {Object} portfolio - The portfolio data to be added
     * @returns {Promise} The API call to create the new portfolio
     */
    mutationFn: (portfolio) => addNewPortfolioAPI(portfolio),
    
    /**
     * Called when the portfolio creation API call is successful.
     * Shows a success toast message and invalidates the portfolios query cache.
     */
    onSuccess: () => {
      toast.success("Portfolio has been add");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },

    /**
     * Called when the portfolio creation API call fails.
     * Displays an error toast message.
     *
     * @param {Object} err - The error object returned from the API
     */
    onError: (err) => toast.error(err.message),
  });

  return { createPortfolio, isCreating };
}

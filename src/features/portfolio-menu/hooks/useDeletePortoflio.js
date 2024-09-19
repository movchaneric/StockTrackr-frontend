import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePortfolio as deletePortfolioAPI } from "../../../services/apiPortfolio";

/**
 * Custom hook to handle the deletion of a portfolio using React Query's `useMutation`.
 * This hook manages the API call to delete a portfolio and handles success and error feedback.
 *
 * @param {string} portfolioId - The ID of the portfolio to be deleted
 * @returns {Object} Contains the `deletePortfolio` function to trigger the mutation and 
 * a loading state `isDeleting` to indicate if the deletion process is ongoing.
 */
export function useDeletePorftolio(portfolioId) {
  const queryClient = useQueryClient();
  const { mutate: deletePortfolio, isLoading: isDeleting } = useMutation({
    mutationFn: (portfolioId) => deletePortfolioAPI(portfolioId),
    onSuccess: () => {
      toast.success("Portfolio has been deleted");
      queryClient.invalidateQueries(["portfolios"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { deletePortfolio, isDeleting };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deletePortfolio as deletePortfolioAPI } from "../../../services/apiPortfolio";

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

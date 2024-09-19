import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewPortfolio as addNewPortfolioAPI } from "../../../services/apiPortfolio";
import toast from "react-hot-toast";

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  const { mutate: createPortfolio, isLoading: isCreating } = useMutation({
    mutationFn: (portfolio) => addNewPortfolioAPI(portfolio),
    onSuccess: () => {
      toast.success("Portfolio has been add");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createPortfolio, isCreating };
}

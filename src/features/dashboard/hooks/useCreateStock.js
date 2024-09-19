import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { actionOnStock } from "../../../services/apiPortfolio";

export function useCreateStock(portfolioId) {
  const queryClient = useQueryClient();
  const { mutate: createStock, isLoading: isCreating } = useMutation({
    mutationFn: (newStock) => actionOnStock(newStock),
    onSuccess: () => {
      toast.success("Stock has been added");
      queryClient.invalidateQueries({ queryKey: ["stocks"] }); //Add portoflioId as second parameter
    },
    onError: (err) =>
      toast.error(err.message || "Something went wrong while adding the stock"),
  });

  return { createStock, isCreating };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { actionOnStock } from "../../../services/apiPortfolio";

export function useSellStock() {
  const queryClient = useQueryClient();

  const { mutate: sellStock, isLoading: isSelling } = useMutation({
    mutationFn: (stock) => actionOnStock(stock),
    onSuccess: () => {
      toast.success("Stock has been sold");
      queryClient.invalidateQueries({ queryKey: ["stocks"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { sellStock, isSelling };
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { cashAction as cashActionAPI } from "../../../services/apiPortfolio";

export function useCashAction() {
  const queryClient = useQueryClient();

  const { mutate: cashAction, isLoading: cashActionLoading } = useMutation({
    mutationFn: async ({ portfolioId, actionId, sum, parsedDate }) => {
      // If actionId is 2 (assuming this means withdraw)
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

    onSuccess: (_, { actionId }) => {
      // Show different success messages based on actionId
      if (actionId === "1") {
        toast.success("Cash has been deposited to your portfolio");
      } else if (actionId === "2") {
        toast.success("Cash has been withdrawn from your portfolio");
      }
      queryClient.invalidateQueries({ queryKey: ["balance"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { cashAction, cashActionLoading };
}

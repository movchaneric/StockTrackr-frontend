import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllActionsFromNowOn } from "../../../services/apiPortfolio";
import toast from "react-hot-toast";

export function useDeleteAllActions(portfolioId) {
  const queryClient = useQueryClient();
  const { mutate: deleteAllActions, isLoading: isDeleting } = useMutation({
    mutationFn: (transactionId) => deleteAllActionsFromNowOn(transactionId),
    onSuccess: () => {
      toast.success("Actions has been deleted");
      //Invalidate after success   
      queryClient.invalidateQueries(["all-history-transactions", portfolioId]);
      queryClient.invalidateQueries(["stocks", portfolioId]);
      queryClient.invalidateQueries(["balance", portfolioId]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteAllActions, isDeleting };
}

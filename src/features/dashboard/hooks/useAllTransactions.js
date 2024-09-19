import { useQuery } from "@tanstack/react-query";
import { getAllTransactionsByPortfolioId } from "../../../services/apiPortfolio";

export function useAllTransactions(portoflioId) {
  const { data: allTransactions, isLoading } = useQuery({
    queryKey: ["all-history-transactions", portoflioId],
    queryFn: () => getAllTransactionsByPortfolioId(portoflioId),
    staleTime: 600000,
    cacheTime: 900000,
  });

  return { allTransactions, isLoading };
}

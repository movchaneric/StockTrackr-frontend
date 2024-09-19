import { useQuery } from "@tanstack/react-query";
import { getAllStockTransactionsByPortfolioId } from "../../../services/apiPortfolio";

export function useHistoryStockTransactions(portoflioId) {
  const { data: hisotryTransactions, isLoading } = useQuery({
    queryKey: ["history-transactions", portoflioId],
    queryFn: () => getAllStockTransactionsByPortfolioId(portoflioId),
    staleTime: 600000,
    cacheTime: 900000,
  });

  return { hisotryTransactions, isLoading };
}


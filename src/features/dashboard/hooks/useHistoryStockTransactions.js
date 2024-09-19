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

// import { useQuery } from "@tanstack/react-query";
// import { getAllStocksRelatedToPortfolio } from "../../../services/apiPortfolio";

// export function useStocks(id) {
//   const { data: filteredStocks, isLoading } = useQuery({
//     queryKey: ["stocks", id],
//     queryFn: () => getAllStocksRelatedToPortfolio(id),
//     refetchInterval: 3600000, // Refetch every 1 hour
//     staleTime: 600000, // Set data as fresh for 10 minutes
//     cacheTime: 900000, // Keep data in cache for 15 minutes even if unused
//   });

//   return { filteredStocks, isLoading };
// }

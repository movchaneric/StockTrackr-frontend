import { useQuery } from "@tanstack/react-query";
import { getAllStocksRelatedToPortfolio } from "../../../services/apiPortfolio";

export function useStocks(id) {
  const { data: filteredStocks, isLoading } = useQuery({
    queryKey: ["stocks", id],
    queryFn: () => getAllStocksRelatedToPortfolio(id),

    cacheTime: 900000,
    staleTime: 600000,
    retry: 1,
  });

  return { filteredStocks, isLoading };
}

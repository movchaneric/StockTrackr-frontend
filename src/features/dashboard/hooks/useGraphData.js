import { useQuery } from "@tanstack/react-query";
import { getGraphData } from "../../../services/apiPortfolio";

export function useGraphData(portfolioId) {
  const {
    data: graphData,
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["graph-data", portfolioId],
    queryFn: () => getGraphData(portfolioId),

    staleTime: 5 * 60 * 1000, // 5 minutes, adjust based on your needs
    cacheTime: 10 * 60 * 1000,
  });

  return { graphData, isLoading, refetch };
}

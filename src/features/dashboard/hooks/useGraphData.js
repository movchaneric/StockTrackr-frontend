import { useQuery } from "@tanstack/react-query";
import { getGraphData } from "../../../services/apiPortfolio";


/**
 * Custom hook to fetch and manage the graph data for a specific portfolio using React Query's `useQuery`.
 * This hook handles data fetching, caching, and provides a refetch mechanism.
 *
 * @param {string} portfolioId - The ID of the portfolio to fetch graph data for
 * @returns {Object} Contains the fetched graph data (`graphData`), loading state (`isLoading`), 
 * and a refetch function to manually trigger a data refetch.
 */
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

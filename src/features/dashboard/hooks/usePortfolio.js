import { useQuery } from "@tanstack/react-query";
import { getPortfolioById } from "../../../services/apiPortfolio";

export function usePortfolio(portfolioId) {
  const {
    data: portfolio,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["portfolio", portfolioId], // Query key includes the portfolioId
    queryFn: () => getPortfolioById(portfolioId),
    retry: false,
    enabled: !!portfolioId,
  });

  return { portfolio, isLoading, error };
}

import { useQuery } from "@tanstack/react-query";
import { getPorfolioBalance } from "../../../services/apiPortfolio";

export function useBalance(portfolioId) {
  const { data: balance, isLoading } = useQuery({
    queryKey: ["balance", portfolioId],
    queryFn: () => getPorfolioBalance(portfolioId),
  });

  return { balance, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getAllPortfolios } from "../../../services/apiPortfolio";

export function usePortfolios() {
  const { data: portfolios, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getAllPortfolios,
  });

  return { portfolios, isLoading };
}

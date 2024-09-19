import { useQuery } from "@tanstack/react-query";
import { getAllPortfolios } from "../../../services/apiPortfolio";

/**
 * Custom hook to fetch all portfolios using React Query's `useQuery`.
 * This hook retrieves the list of portfolios from the API and provides a loading state.
 *
 * @returns {Object} Contains the fetched portfolios data (`portfolios`) and 
 * a loading state (`isLoading`) indicating if the portfolios are still being fetched.
 */
export function usePortfolios() {
  const { data: portfolios, isLoading } = useQuery({
    queryKey: ["portfolios"],
    queryFn: getAllPortfolios,
  });

  return { portfolios, isLoading };
}

import { useQuery } from "@tanstack/react-query";
import { getLastTrasnsactionDate } from "../../../services/apiPortfolio";

export function useLastPurchaseDate(id) {
  const { data: lastDate } = useQuery({
    queryKey: ["last-purchase-date", id],
    queryFn: () => getLastTrasnsactionDate(id),
    retry: 1,
  });

  return { lastDate };
}

import { GET_ANALYTICS_SUMMARY } from "@listed-constants";
import { getAnalyticsSummaryService } from "@listed-services";
import { SummaryResponse } from "@listed-types";
import { useQuery } from "@tanstack/react-query";

export const useGetAnalyticsSummary = (storeId?: number) => {
  return useQuery<SummaryResponse>(
    [GET_ANALYTICS_SUMMARY, storeId],
    () => getAnalyticsSummaryService(storeId),
    {
      enabled: !!storeId,
    }
  );
};

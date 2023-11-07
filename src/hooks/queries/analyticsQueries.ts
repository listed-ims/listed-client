import {
  Frequency,
  GET_ANALYTICS_OUTGOING_VALUE,
  GET_ANALYTICS_REVENUE,
  GET_ANALYTICS_SUMMARY,
  GET_ANALYTICS_TOP_PRODUCTS,
} from "@listed-constants";
import {
  getAnalyticsOutgoingValueService,
  getAnalyticsRevenuService,
  getAnalyticsSummaryService,
  getAnalyticsTopProductsService,
} from "@listed-services";
import {
  OutgoingValueResponse,
  RevenueResponse,
  SummaryResponse,
  TopProductResponse,
} from "@listed-types";
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

export const useGetAnalyticsRevenue = (
  storeId: number,
  periodicity: Frequency,
  pageNumber: number,
  pageSize?: number
) => {
  return useQuery<RevenueResponse[]>(
    [GET_ANALYTICS_REVENUE, { storeId, periodicity, pageNumber, pageSize }],
    () => 
      getAnalyticsRevenuService(
        storeId, 
        periodicity, 
        pageNumber, 
        pageSize
        ),
    {
      enabled: !!storeId,
      staleTime: 1000 * 60 * 5,
    }
  );
};

export const useGetAnalyticsTopProducts = (
  storeId: number,
  periodicity: Frequency,
  pageNumber?: number,
  pageSize?: number
) => {
  return useQuery<TopProductResponse[]>(
    [
      GET_ANALYTICS_TOP_PRODUCTS,
      { storeId, periodicity, pageNumber, pageSize },
    ],
    () =>
      getAnalyticsTopProductsService(
        storeId,
        periodicity,
        pageNumber,
        pageSize
      ),
    {
      enabled: !!storeId,
      staleTime: 1000 * 60 * 5,
    }
  );
};

export const useGetAnalyticsOutgoingValue = (
  storeId: number,
  periodicity: Frequency,
  pageNumber?: number,
  pageSize?: number
) => {
  return useQuery<OutgoingValueResponse[]>(
    [
      GET_ANALYTICS_OUTGOING_VALUE,
      { storeId, periodicity, pageNumber, pageSize },
    ],
    () =>
      getAnalyticsOutgoingValueService(
        storeId,
        periodicity,
        pageNumber,
        pageSize
      ),
    {
      enabled: !!storeId,
      staleTime: 1000 * 60 * 5,
    }
  );
};

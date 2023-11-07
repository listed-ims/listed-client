import {
  OutgoingValueResponse,
  RevenueResponse,
  SummaryResponse,
  TopProductResponse,
} from "@listed-types";
import { axiosInstance } from "./axios";
import { Frequency } from "@listed-constants";

export const getAnalyticsSummaryService = async (storeId?: number) => {
  try {
    const response = await axiosInstance.get(`analytics/summary`, {
      params: {
        storeId: storeId,
      },
    });
    return response.data as SummaryResponse;
  } catch (error) {
    throw error;
  }
};

export const getAnalyticsRevenuService = async (
  storeId: number,
  periodicity: Frequency,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`analytics/revenue`, {
      params: {
        storeId: storeId,
        periodicity: periodicity,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return response.data as RevenueResponse[];
  } catch (error) {
    throw error;
  }
};

export const getAnalyticsTopProductsService = async (
  storeId: number,
  periodicity: Frequency,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`analytics/top-products`, {
      params: {
        storeId: storeId,
        periodicity: periodicity,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return response.data as TopProductResponse[];
  } catch (error) {
    throw error;
  }
};

export const getAnalyticsOutgoingValueService = async (
  storeId: number,
  periodicity: Frequency,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`analytics/outgoing-value`, {
      params: {
        storeId: storeId,
        periodicity: periodicity,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return response.data as OutgoingValueResponse[];
  } catch (error) {
    throw error;
  }
};

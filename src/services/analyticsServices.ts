import { SummaryResponse } from "@listed-types";
import { axiosInstance } from "./axios";

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
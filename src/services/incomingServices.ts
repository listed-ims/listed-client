import { IncomingRequest, IncomingResponse } from "@listed-types";
import { axiosInstance } from "./axios";

export const createIncomingService = async (
  incomingRequest: IncomingRequest,
  productId: number
) => {
  try {
    const response = await axiosInstance.post(`incoming`, incomingRequest, {
      params: { productId: productId },
    });
    return response.data as IncomingResponse;
  } catch (error) {
    throw error;
  }
};

export const getIncomingService = async (transactionId: number) => {
  try {
    const response = await axiosInstance.get(`incoming/${transactionId}`);
    return response.data as IncomingResponse;
  } catch (error) {
    throw error;
  }
};

export const getIncomingListService = async (
  storeId: number,
  userIds?: string,
  productId?: number,
  date?: string,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`incoming`, {
      params: {
        storeId: storeId,
        userIds: userIds,
        productId: productId,
        startDate: date,
        endDate: date,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return response.data as IncomingResponse[];
  } catch (error) {
    throw error;
  }
};

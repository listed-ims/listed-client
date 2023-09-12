import { StoreRequest, StoreResponse } from "@listed-types";
import { axiosInstance } from "./axios";
import { StoreStatus } from "@listed-constants";

export const getStoreService = async (storeId?: number) => {
  try {
    const response = await axiosInstance.get(`stores/${storeId}`);
    return response.data as StoreResponse;
  } catch (error) {
    throw error;
  }
};

export const getStoresService = async (
  status?: StoreStatus,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`stores`, {
      params: {
        status: status,
        pageNumber: pageNumber,
        pageSize: pageSize,
      },
    });
    return response.data as StoreResponse[];
  } catch (error) {
    throw error;
  }
};

export const createStoreService = async (storeRequest: StoreRequest) => {
  try {
    const response = await axiosInstance.post(`stores`, storeRequest);
    return response.data as StoreResponse;
  } catch (error) {
    throw error;
  }
};

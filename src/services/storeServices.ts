import { StoreRequest, StoreResponse } from "@listed-types";
import { axiosInstance } from "./axios";

export const getStoreService = async (storeId?: number) => {
  try {
    const response = await axiosInstance.get(`stores/${storeId}`);
    return response.data as StoreResponse;
  } catch (error) {
    throw error;
  }
};

export const getStoresService = async (
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`stores`, {
      params: {
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

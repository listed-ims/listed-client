import { StoreResponse } from "@listed-types";
import { axiosInstance } from "./axios";

export const getStoreService = async (storeId?: number) => {
  try {
    const response = await axiosInstance.get(`stores/${storeId}`);
    return response.data as StoreResponse;
  } catch (error) {
    throw error;
  }
};

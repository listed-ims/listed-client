import { OutgoingRequest, OutgoingResponse } from "@listed-types";
import { axiosInstance } from "./axios";
import { OutgoingCategory } from "@listed-constants";

export const createOutgoingService = async (
  outgoingRequest: OutgoingRequest
) => {
  try {
    const response = await axiosInstance.post(`outgoing`, outgoingRequest);
    return response.data as OutgoingResponse;
  } catch (error) {
    throw error;
  }
};


export const getOutgoingService = async (transactionId: number) => {
  try {
    const response = await axiosInstance.get(`outgoing/${transactionId}`);
    return response.data as OutgoingResponse;
  } catch (error) {
    throw error;
  }
};

export const getOutgoingListService = async (
  storeId: number,
  userIds?: number[],
  productId?: number,
  date?: Date | null,
  categories?: OutgoingCategory[],
  pageNumber?: number,
  pageSize?: number) =>{
    try {
      const response = await axiosInstance.get(`outgoing`,{
        params:{
          storeId: storeId,
          userIds: userIds,
          productId: productId,
          startDate: date,
          endDate: date,
          categories: categories,
          pageNumber: pageNumber,
          pageSize: pageSize
        }
      });
      return response.data as OutgoingResponse[];
    } catch (error) {
      throw error;
    }
  }
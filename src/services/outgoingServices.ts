import { OutgoingRequest, OutgoingResponse } from "@listed-types";
import { axiosInstance } from "./axios";

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

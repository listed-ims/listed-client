import { NotificationResponse, NotificationStatus } from "@listed-types";
import { axiosInstance } from "./axios";

export const getNotificationsService = async (
  status?: NotificationStatus,
  pageNumber?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(`notifications`, {
      params: {
        status,
        pageNumber,
        pageSize,
      },
    });

    return response.data as NotificationResponse[];
  } catch (error) {
    throw error;
  }
};

export const updateNotificationStatusService = async (id: number) => {
    try {
      const response = await axiosInstance.put(`notifications/${id}`);
      return response.data as NotificationResponse;
    } catch (error) {
      throw error;
    }
  };

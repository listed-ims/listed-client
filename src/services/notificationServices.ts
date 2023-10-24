import {
  NotificationResponse,
  NotificationStatus,
  NotificationMetaData,
} from "@listed-types";
import { axiosInstance } from "./axios";

const parseNotificationMetaData = (metaDataString: string) => {
  try {
    return JSON.parse(metaDataString, (_key, value) =>
      typeof value === "string" ? JSON.parse(value) : value
    );
  } catch (error) {
    throw error;
  }
};

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

    const notifications = response.data as NotificationResponse[];

    notifications.forEach((notification) => {
      notification.metaData = parseNotificationMetaData(
        String(notification.metaData)
      ) as NotificationMetaData;
    });

    return notifications;
  } catch (error) {
    throw error;
  }
};

export const updateNotificationStatusService = async (id: number) => {
  try {
    const response = await axiosInstance.put(`notifications/${id}`);
    const notification = response.data as NotificationResponse;

    notification.metaData = parseNotificationMetaData(
      String(notification.metaData)
    ) as NotificationMetaData;
    
    return notification;
  } catch (error) {
    throw error;
  }
};

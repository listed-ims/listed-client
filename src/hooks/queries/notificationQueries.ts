import { GET_NOTIFICATIONS } from "@listed-constants";
import { getNotificationsService} from "@listed-services";
import { NotificationStatus } from "@listed-types";
import {  useQuery } from "@tanstack/react-query";


export const useGetNotifications = (
    status?: NotificationStatus, 
    pageNumber?: number, 
    pageSize?: number
  ) => {
    return useQuery([GET_NOTIFICATIONS, { status, pageNumber, pageSize }], () =>
     getNotificationsService( status, pageNumber, pageSize),
    );
  };
  

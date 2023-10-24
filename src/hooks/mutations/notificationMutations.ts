import { updateNotificationStatusService } from "@listed-services";
import { NotificationResponse, NotificationStatus } from "@listed-types";
import { MutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";


export const useUpdateNotificationStatusMutation = (
    mutationOptions: MutationOptions<
      NotificationResponse,
      AxiosError<{ message: string }>,
      number
    >
  ) => {
    return useMutation(
      (id) => updateNotificationStatusService(id),
      mutationOptions
    );
  };
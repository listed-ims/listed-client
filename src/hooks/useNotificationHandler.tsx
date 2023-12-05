import {
  GET_MEMBERSHIP,
  GET_NOTIFICATIONS,
  GET_STORE,
  GET_STORES,
  GET_USER,
} from "@listed-constants";
import {
  ModalContent,
  NotificationResponse,
  NotificationStatus,
  UserRequest,
  UserResponse,
} from "@listed-types";
import { useQueryClient } from "@tanstack/react-query";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  useUpdateUserMutation,
  useUpdateNotificationStatusMutation,
} from "./mutations";
import { useGetUserMembership } from "./queries";
import { useAuth } from "@listed-contexts";
import ChangeStoreModal from "@listed-components/organisms/ChangeStoreModal";

export const useNotificationHandler = (
  notificationDetails: NotificationResponse,
  onPressCallback?: () => void
) => {

  const queryClient = useQueryClient();
  const { userDetails, setUserDetails, setUserMembership } = useAuth();
  const { id, metaData } = notificationDetails;

  const {
    mutate: updateNotification,
  } = useUpdateNotificationStatusMutation({
    onSuccess: (data) => {
      queryClient.setQueryData<NotificationResponse[]>(
        [GET_NOTIFICATIONS],
        (oldData) => {
          if (!oldData) return [];
          const index = oldData.findIndex(
            (notification) => notification.id === data.id
          );
          if (index === -1) return oldData;
          const newData = [...oldData];
          newData[index] = data;
          return newData;
        }
      );
      queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATIONS] });
    },
    onError: (error) => {
      console.log("Error updating notification status.");
      console.error({ ...error });
    },
  });

  const {
    data: updatedUser,
    mutate: updateUser,
    isSuccess: updateUserSuccess,
  } = useUpdateUserMutation({
    onSuccess: (data) => {
      setUserDetails({
        ...userDetails,
        currentStoreId: data.currentStoreId,
      } as UserResponse);
      queryClient.setQueryData([GET_USER], {
        ...userDetails,
        currentStoreId: data.currentStoreId,
      } as UserResponse);
      queryClient.invalidateQueries({
        queryKey: [GET_MEMBERSHIP],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_STORE, data.currentStoreId],
      });
      queryClient.invalidateQueries({ queryKey: [GET_STORES] });
    },
    onError: (error) => {
      console.log("Make store current error.");
      console.error({ ...error });
    },
  });

  const { data: userMembership, isSuccess: userMembershipSuccess } =
    useGetUserMembership(updatedUser?.currentStoreId!);

  useEffect(() => {
    if (updateUserSuccess) {
      handleOnPress();
    }
    if (userMembershipSuccess) {
      setUserMembership(userMembership);
    }
  }, [userDetails, updateUserSuccess, userMembership]);

  const handleOnPress = () => {
    if (notificationDetails.status === NotificationStatus.UNREAD)
      updateNotification(id);
    if (onPressCallback) onPressCallback();
  };

  const handleChangeStore = () => {
    updateUser({
      name: userDetails?.name,
      username: userDetails?.username,
      password: "string",
      currentStoreId: metaData.store.id,
    } as UserRequest);
  };

  const changeStoreModal = (
    modalContent: ModalContent,
    showChangeStoreModal: boolean,
    setShowChangeStoreModal: Dispatch<SetStateAction<boolean>>
  ) => {
    return <ChangeStoreModal
      modalContent={modalContent}
      isOpen={showChangeStoreModal && !updateUserSuccess}
      onConfirm={handleChangeStore}
      onCancel={() => setShowChangeStoreModal(false)}
    />
  }

  return { handleOnPress, handleChangeStore, changeStoreModal };
};

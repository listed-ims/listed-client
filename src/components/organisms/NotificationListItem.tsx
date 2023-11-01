import {
  CollaboratorRemovalNotification,
  ExpirationNotification,
  InviteReplyNotification,
  LowStockNotification,
  StoreInviteNotification
} from "@listed-components/molecules";
import {
  MembershipStatus,
  ModalContent,
  NotificationResponse,
  NotificationStatus,
  NotificationType,
  UserRequest,
  UserResponse
} from "@listed-types";
import {
  GET_MEMBERSHIP,
  GET_NOTIFICATIONS,
  GET_STORE,
  GET_STORES,
  GET_USER, Routes
} from "@listed-constants";
import { useAuth } from "@listed-contexts";
import {
  useGetUserMembership,
  useUpdateNotificationStatusMutation,
  useUpdateUserMutation
} from "@listed-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { IPressableProps, Pressable } from "native-base";
import ChangeStoreModal from "./ChangeStoreModal";
import { memo, useEffect, useState } from "react";

interface NotificationListItemProps extends IPressableProps {
  notificationDetails: NotificationResponse;
}

const NotificationListItem = ({
  notificationDetails,
  ...props
}: NotificationListItemProps) => {
  const { userDetails, setUserDetails, setUserMembership } = useAuth();
  const queryClient = useQueryClient();
  const { id, sender, metaData, status, type, dateCreated } = notificationDetails;
  const [showChangeStoreModal, setShowChangeStoreModal] = useState(false)
  const [modalContent, setModalContent] = useState<ModalContent>({} as ModalContent)

  let NotificationComponent;

  switch (notificationDetails.type) {
    case NotificationType.LOW_STOCK:
      NotificationComponent = <LowStockNotification
        notificationDetails={notificationDetails}
        {...props} />;
      break;

    case NotificationType.EXPIRATION:
      NotificationComponent = <ExpirationNotification
        notificationDetails={notificationDetails}
        {...props} />;
      break;

    case NotificationType.COLLABORATOR_REMOVAL:
      NotificationComponent = <CollaboratorRemovalNotification
        notificationDetails={notificationDetails}
        {...props} />;
      break;

    case NotificationType.STORE_INVITE:
      NotificationComponent = <StoreInviteNotification
        notificationDetails={notificationDetails}
        {...props} />;
      break;

    case NotificationType.INVITE_REPLY:
      NotificationComponent = <InviteReplyNotification
        notificationDetails={notificationDetails}
        {...props} />;
      break;

    default:
      NotificationComponent = null;
      break;
  }

  const {
    mutate: updateNotification,
    isError: updateNotificationError,
    isLoading: updateNotificationLoading,
  } = useUpdateNotificationStatusMutation({
    onSuccess: (data) => {
      queryClient.setQueryData<NotificationResponse[]>([GET_NOTIFICATIONS],
        (oldData) => {
          if (!oldData) return [];
          const index = oldData.findIndex((
            notification) => notification.id === data.id
          );
          if (index === -1) return oldData;
          const newData = [...oldData];
          newData[index] = data;
          return newData;
        }
      );
      queryClient.invalidateQueries({ queryKey: [GET_NOTIFICATIONS] })
    },
    onError: (error) => {
      console.log("Error updating notification status.");
      console.error({ ...error });
    },
  });

  const handleOnPress = () => {
    if (notificationDetails.status === NotificationStatus.UNREAD)
      updateNotification(id);
    switch (type) {

      case NotificationType.LOW_STOCK:
        if (metaData.store.id !== userDetails?.currentStoreId) {
          setModalContent({
            header: "Change Store",
            body: `This product is from another store. Would you like to change your current store to ${metaData.store.name}?`
          })
          setShowChangeStoreModal(true);
        } else
          router.push(`${Routes.PRODUCTS}/${metaData.product.id}`);
        break;

      case NotificationType.STORE_INVITE:
        if (Number(metaData.invitee.id) === userDetails?.id)
          router.push(`${Routes.STORES}/${metaData.store.id}`);
        else {
          if (metaData.store.id !== userDetails?.currentStoreId) {
            setModalContent({
              header: "Change Store",
              body: `This invite is from another store. Would you like to change your current store to ${metaData.store.name}?`
            })
            setShowChangeStoreModal(true);
          } else
            router.push(`${Routes.COLLABORATORS}/${metaData.membershipId}`)
        }
        break;

      case NotificationType.INVITE_REPLY:
        if (metaData.status === MembershipStatus.ACTIVE) {
          if (metaData.store.id !== userDetails?.currentStoreId) {
            setModalContent({
              header: "Change Store",
              body: `This invite is from another store. Would you like to change your current store to ${metaData.store.name}?`
            })
            setShowChangeStoreModal(true);
          } else {
            router.push(`${Routes.COLLABORATORS}/${metaData.membershipId}`)
          }
        } else if (metaData.status === MembershipStatus.DECLINED) {
          // TODO: route to a separate screen for declined invite deets
          console.log("declined invite")
        }
        break;

      case NotificationType.COLLABORATOR_REMOVAL:
        if (metaData.recipient.id === userDetails?.id) {
          console.log("collaborator removal notif")
          // TODO: route to a separate screen for removal deets
        } else {
          router.push(`${Routes.COLLABORATORS}/${metaData.membershipId}`)
        }
        break;

      case NotificationType.EXPIRATION:
        console.log("expiration notif")
        // TODO: route to a separate screen for expiration deets
        break;

      default:
        break;
    }
  }

  const handleChangeStore = () => {
    updateUser({
      name: userDetails?.name,
      username: userDetails?.username,
      password: "string",
      currentStoreId: metaData.store.id,
    } as UserRequest);
  }

  const {
    data: updatedUser,
    mutate: updateUser,
    isError: updateUserError,
    isLoading: updateUserLoading,
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
      setShowChangeStoreModal(false);

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

  return (
    <>
      <Pressable
        {...props}
        _pressed={{
          background:
            notificationDetails.status === NotificationStatus.UNREAD ? "offWhite.500" : "muted.100",
        }}
        p="4"
        borderRadius="lg"
        background={
          notificationDetails.status === NotificationStatus.UNREAD ? "offWhite.300" : "muted.50"
        }
        my="1"
        onPress={handleOnPress}
      >
        {NotificationComponent}
      </Pressable>
      <ChangeStoreModal
        modalContent={modalContent}
        isOpen={showChangeStoreModal}
        onConfirm={handleChangeStore}
        onCancel={() => { setShowChangeStoreModal(false) }}
      />
    </>
  )
}

export default memo(NotificationListItem);

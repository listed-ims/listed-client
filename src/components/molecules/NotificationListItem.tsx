import {
  Button,
  CollaboratorRemovalIcon,
  ExpirationIcon,
  LowStockIcon,
  SmallMail,
} from "@listed-components/atoms";
import { GET_NOTIFICATIONS, Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useUpdateNotificationStatusMutation } from "@listed-hooks";
import {
  MembershipStatus,
  NotificationResponse,
  NotificationStatus,
  NotificationType,
} from "@listed-types";
import { dateToDay, dateToMMDDYY, dateToReadableTime } from "@listed-utils";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  IPressableProps,
  Text,
  Pressable,
  Badge,
  Column,
  Row,
  Divider,
  Center,
} from "native-base";

interface NotificationListItemProps extends IPressableProps {
  notificationDetails: NotificationResponse;
}

const NotificationListItem = ({
  notificationDetails,
  ...props
}: NotificationListItemProps) => {
  const getIconByNotificationType = (type: NotificationType) => {
    switch (type) {
      case NotificationType.EXPIRATION:
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <ExpirationIcon />
          </Center>
        );

      case NotificationType.LOW_STOCK:
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <LowStockIcon />
          </Center>
        );

      case NotificationType.COLLABORATOR_REMOVAL:
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <CollaboratorRemovalIcon />
          </Center>
        );

      case NotificationType.STORE_INVITE:
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <SmallMail />
          </Center>
        );

      case NotificationType.INVITE_REPLY:
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <SmallMail />
          </Center>
        );

      default:
        return null;
    }
  };

  const { userDetails } = useAuth();
  const queryClient = useQueryClient();

  const {
    product,
    quantity,
    store,
    expirationDate,
    recipient,
    invitee,
    status,
    membershipId,
  } = JSON.parse(notificationDetails.metaData, (_key, value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  });

  const {
    mutate: updateNotification,
    isError: updateNotificationError,
    isLoading: updateNotificationLoading,
  } = useUpdateNotificationStatusMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [GET_NOTIFICATIONS]})
    },
    onError: (error) => {
      console.log("Error updating notification status.");
      console.error({ ...error });
    },
  });

  const handleOnPress = () => {
    if(notificationDetails.status === NotificationStatus.UNREAD)
      updateNotification(notificationDetails.id);

      if (notificationDetails.type === NotificationType.LOW_STOCK){
        router.push(`${Routes.PRODUCTS}/${product.id}}`);
      } else if (notificationDetails.type === NotificationType.STORE_INVITE){
        if (Number(invitee.id) === userDetails?.id)
          router.push(`${Routes.STORES}/${store.id}}`);
        else
          router.push(`${Routes.COLLABORATORS}/${membershipId}}`);
      } else if (notificationDetails.type === NotificationType.INVITE_REPLY){
        if (status)
          router.push(`${Routes.STORES}/${store.id}}`);
        else
          router.push(`${Routes.COLLABORATORS}/${membershipId}}`);
      }
  }

  return (
    <Pressable
      {...props}
      _pressed={{
        background:
          notificationDetails.status === NotificationStatus.UNREAD
            ? "offWhite.500"
            : "muted.100",
      }}
      p="4"
      borderRadius="lg"
      background={
        notificationDetails.status === NotificationStatus.UNREAD
          ? "offWhite.300"
          : "muted.50"
      }
      my="1"
      onPress={handleOnPress}
    >
      <Column>
        <Row alignItems="center" justifyContent="space-between" space="2">
          {getIconByNotificationType(notificationDetails.type)}
          <Column flex="4" alignItems="flex-start">
            <Text
              fontSize="sm"
              fontWeight={
                notificationDetails.status === NotificationStatus.UNREAD
                  ? "semibold"
                  : "normal"
              }
            >
              {notificationDetails.type === NotificationType.LOW_STOCK
                ? product.name
                : notificationDetails.type === NotificationType.EXPIRATION
                ? `${quantity} ${product.unit} - ${product.name}`
                : notificationDetails.type ===
                  NotificationType.COLLABORATOR_REMOVAL
                ? "Collaborator Removed"
                : notificationDetails.type === NotificationType.STORE_INVITE
                ? "New Invite"
                : notificationDetails.type === NotificationType.INVITE_REPLY
                ? status === MembershipStatus.ACTIVE
                  ? "New Collaborator"
                  : "Invite Declined"
                : null}
            </Text>
            <Text
              fontSize="xs"
              color="muted.500"
              fontWeight={
                notificationDetails.status === NotificationStatus.UNREAD
                  ? "medium"
                  : "normal"
              }
            >
              {notificationDetails.type === NotificationType.LOW_STOCK
                ? `Low Stocks: ${quantity}`
                : notificationDetails.type === NotificationType.EXPIRATION
                ? `Expires on ${dateToMMDDYY(
                    new Date(expirationDate.toString()!)
                  )}`
                : notificationDetails.type ===
                  NotificationType.COLLABORATOR_REMOVAL
                ? `${notificationDetails.sender.name} removed ${
                    Number(recipient.id) === userDetails?.id
                      ? "you as a collaborator."
                      : recipient.name + " from your store."
                  }`
                : notificationDetails.type === NotificationType.STORE_INVITE
                ? `${notificationDetails.sender.name} sent ${
                    Number(invitee.id) === userDetails?.id
                      ? "you"
                      : invitee.name
                  } an invite.`
                : notificationDetails.type === NotificationType.INVITE_REPLY
                ? `${invitee.name} ${
                    status === MembershipStatus.ACTIVE ? "accepted" : "declined"
                  } ${
                    Number(notificationDetails.sender.id) === userDetails?.id
                      ? "your"
                      : notificationDetails.sender.name
                  } invite.`
                : null}
            </Text>
          </Column>
          <Column flex="2" alignItems="flex-end">
            <Badge colorScheme="green" variant="solid" alignItems="flex-end">
              {store.name}
            </Badge>
            <Text fontSize="xs" fontWeight="normal" color="muted.500">
              {notificationDetails?.dateCreated && (
                dateToDay(
                  new Date(notificationDetails.dateCreated.toString()!)
              ))}
            </Text>
            <Text fontSize="xs" fontWeight="normal" color="muted.500">
              {notificationDetails?.dateCreated &&
                dateToReadableTime(
                  new Date(notificationDetails.dateCreated.toString()!)
                )}
            </Text>
          </Column>
          {notificationDetails.status === NotificationStatus.UNREAD && (
            <Center
              width="2"
              height="2"
              backgroundColor="primary.700"
              borderRadius="full"
            />
          )}
        </Row>
          {Number(invitee?.id) === userDetails?.id && status === MembershipStatus.PENDING && (
              <Column>
                <Row paddingY="3">
                  <Divider />
                </Row>
                <Row space="1">
                  <Button flex="1">ACCEPT</Button>
                  <Button variant="outline" flex="1">
                    DECLINE
                  </Button>
                </Row>
              </Column>
            )}
      </Column>
    </Pressable>
  );

};

export default NotificationListItem;

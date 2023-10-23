import {
  CollaboratorRemovalIcon,
  ExpirationIcon,
  LowStockIcon,
  SmallMail,
} from "@listed-components/atoms";
import { useAuth } from "@listed-contexts";
import {
  MembershipStatus,
  NotificationResponse,
  NotificationStatus,
  NotificationType,
} from "@listed-types";
import { dateToDay, dateToMMDDYY, dateToReadableTime } from "@listed-utils";
import { useQueryClient } from "@tanstack/react-query";
import {
  IPressableProps,
  Text,
  Pressable,
  Badge,
  Column,
  Row,
  Center,
} from "native-base";

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

interface NotificationListItemProps extends IPressableProps {
  notificationDetails: NotificationResponse;
}

const NotificationListItem = ({
  notificationDetails: { id, sender, metaData, status, type, dateCreated },
  ...props
}: NotificationListItemProps) => {
  const { userDetails } = useAuth();
  const queryClient = useQueryClient();

  return (
    <Pressable
      {...props}
      _pressed={{
        background:
          status === NotificationStatus.UNREAD ? "offWhite.500" : "muted.100",
      }}
      p="4"
      borderRadius="lg"
      background={
        status === NotificationStatus.UNREAD ? "offWhite.300" : "muted.50"
      }
      my="1"
      // onPress={handleOnPress}
    >
      <Column>
        <Row alignItems="center" justifyContent="space-between" space="2">
          {getIconByNotificationType(type)}
          <Column flex="4" alignItems="flex-start">
            <Text
              numberOfLines={1}
              fontSize="sm"
              fontWeight={
                status === NotificationStatus.UNREAD ? "semibold" : "normal"
              }
            >
              {type === NotificationType.LOW_STOCK
                ? metaData.product.name
                : type === NotificationType.EXPIRATION
                ? `${metaData.quantity} ${metaData.product.unit} - ${metaData.product.name}`
                : type === NotificationType.COLLABORATOR_REMOVAL
                ? "Collaborator Removed"
                : type === NotificationType.STORE_INVITE
                ? "New Invite"
                : type === NotificationType.INVITE_REPLY
                ? metaData.status === MembershipStatus.ACTIVE
                  ? "New Collaborator"
                  : "Invite Declined"
                : null}
            </Text>
            <Text
              fontSize="xs"
              color="muted.500"
              fontWeight={
                status === NotificationStatus.UNREAD ? "medium" : "normal"
              }
            >
              {type === NotificationType.LOW_STOCK
                ? `Low Stocks: ${metaData.quantity}`
                : type === NotificationType.EXPIRATION
                ? `Expires on ${dateToMMDDYY(
                    new Date(metaData.expirationDate.toString()!)
                  )}`
                : type === NotificationType.COLLABORATOR_REMOVAL
                ? `${sender.name} removed ${
                    Number(metaData.recipient.id) === userDetails?.id
                      ? "you as a collaborator."
                      : metaData.recipient.name + " from your store."
                  }`
                : type === NotificationType.STORE_INVITE
                ? `${sender.name} sent ${
                    Number(metaData.invitee.id) === userDetails?.id
                      ? "you"
                      : metaData.invitee.name
                  } an invite.`
                : type === NotificationType.INVITE_REPLY
                ? `${metaData.invitee.name} ${
                    metaData.status === MembershipStatus.ACTIVE
                      ? "accepted"
                      : "declined"
                  } ${
                    Number(sender.id) === userDetails?.id ? "your" : sender.name
                  } invite.`
                : null}
            </Text>
          </Column>
          <Column flex="2" alignItems="flex-end">
            <Badge
              colorScheme="green"
              variant="solid"
              alignItems="flex-end"
              _text={{ numberOfLines: 1 }}
            >
              {metaData.store.name}
            </Badge>
            <Text fontSize="xs" fontWeight="normal" color="muted.500">
              {dateCreated && dateToDay(new Date(dateCreated.toString()!))}
            </Text>
            <Text fontSize="xs" fontWeight="normal" color="muted.500">
              {dateCreated &&
                dateToReadableTime(new Date(dateCreated.toString()!))}
            </Text>
          </Column>
          {status === NotificationStatus.UNREAD && (
            <Center
              width="2"
              height="2"
              backgroundColor="primary.700"
              borderRadius="full"
            />
          )}
        </Row>
      </Column>
    </Pressable>
  );
};

export default NotificationListItem;

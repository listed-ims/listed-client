import {
  Button,
  CollaboratorRemovalIcon,
  ExpirationIcon,
  LowStockIcon,
  SmallMail,
} from "@listed-components/atoms";
import { useAuth } from "@listed-contexts";
import {
  NotificationResponse,
  NotificationStatus,
  NotificationType,
  UserPermission,
} from "@listed-types";
import { dateToMonthDDYYYY, dateToReadableTime } from "@listed-utils";

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

  const {
    product,
    quantity,
    store,
    expirationDate,
    sender,
    recipient,
    invitee,
    status,
  } = JSON.parse(notificationDetails.metaData) 
    

  const backgroundColor =
    notificationDetails.status === NotificationStatus.UNREAD
      ? "offWhite.300"
      : "muted.50";

  const { userDetails, userMembership } = useAuth();

  switch (notificationDetails.type) {
    case NotificationType.LOW_STOCK:
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor={backgroundColor}
          my="1"
        >
          <Row alignItems="center" justifyContent="space-between" space="2">
            {getIconByNotificationType(notificationDetails.type)}
            <Column alignItems="flex-start">
              <Text
                fontSize="sm"
                fontWeight={
                  notificationDetails.status === NotificationStatus.UNREAD
                    ? "semibold"
                    : "normal"
                }
              >
                {JSON.parse(product!).name}
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
                Low Stocks: {quantity}
              </Text>
            </Column>
            <Column flex="2" alignItems="flex-end">
              <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {JSON.parse(store!).name}
              </Badge>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {notificationDetails?.dateCreated && (
                  <Text fontSize="xs">
                    {dateToMonthDDYYYY(
                      new Date(notificationDetails.dateCreated.toString()!)
                    )}
                  </Text>
                )}
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
              ></Center>
            )}
          </Row>
        </Pressable>
      );

    case NotificationType.EXPIRATION:
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor={backgroundColor}
          my="1"
        >
          <Row alignItems="center" justifyContent="space-between" space="2">
            {getIconByNotificationType(notificationDetails.type)}
            <Column alignItems="flex-start">
              <Text
                fontSize="sm"
                fontWeight={
                  notificationDetails.status === NotificationStatus.UNREAD
                    ? "semibold"
                    : "normal"
                }
              >
                {product?.name}
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
                Expires on {expirationDate && dateToMonthDDYYYY(expirationDate)}
              </Text>
            </Column>
            <Column flex="2" alignItems="flex-end">
              <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {store?.name}
              </Badge>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {notificationDetails?.dateCreated && (
                  <Text fontSize="xs">
                    {dateToMonthDDYYYY(
                      new Date(notificationDetails.dateCreated.toString()!)
                    )}
                  </Text>
                )}
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
              ></Center>
            )}
          </Row>
        </Pressable>
      );

    case NotificationType.COLLABORATOR_REMOVAL:
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor={backgroundColor}
          my="1"
        >
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
                Removed from {JSON.parse(store!).name}
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
                {`${notificationDetails.sender.name} removed ${
                  Number(JSON.parse(recipient).id) === userDetails?.id
                    ? "you as a collaborator."
                    : JSON.parse(recipient!).name + " from your store."
                }`}
              </Text>
            </Column>

            <Column flex="2" alignItems="flex-end">
            <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {store?.name}
              </Badge>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {notificationDetails?.dateCreated && (
                  <Text fontSize="xs">
                    {dateToMonthDDYYYY(
                      new Date(notificationDetails.dateCreated.toString()!)
                    )}
                  </Text>
                )}
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
              ></Center>
            )}
          </Row>
        </Pressable>
      );

    case NotificationType.STORE_INVITE:
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor={backgroundColor}
          my="1"
        >
          <Column>
            <Row
              alignItems="center"
              justifyContent="space-between"
              space="2"
              pointerEvents="box-none"
            >
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
                  {`${userMembership?.permissions.
                    includes(UserPermission.OWNER) ? "New invite to ":"Join "} ${JSON.parse(store!).name}` }
                  
                   
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
                  {`${notificationDetails.sender.name} sent ${
                    userDetails?.id !== Number(JSON.parse(invitee)?.id)?
                  
                    JSON.parse(invitee!).name: "you"} an invite.`}

                </Text>
              </Column>
                    
              <Column flex="2" alignItems="flex-end">
              <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {JSON.parse(store!).name}
              </Badge>
                <Text fontSize="xs" fontWeight="normal" color="muted.500">
                  {notificationDetails?.dateCreated && (
                    <Text fontSize="xs">
                      {dateToMonthDDYYYY(
                        new Date(notificationDetails.dateCreated.toString()!)
                      )}
                    </Text>
                  )}
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
                ></Center>
              )}
            </Row>

            {!userMembership?.permissions.includes(UserPermission.OWNER) && (
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

    case NotificationType.INVITE_REPLY:
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor={backgroundColor}
          my="1"
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
                  New Collaborator.
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
                  {JSON.parse(invitee).name} accepted your invite.
                </Text>
              </Column>

              <Column flex="2" alignItems="flex-end">
              <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {JSON.parse(store!).name}
              </Badge>
                <Text fontSize="xs" fontWeight="normal" color="muted.500">
                  {notificationDetails?.dateCreated && (
                    <Text fontSize="xs">
                      {dateToMonthDDYYYY(
                        new Date(notificationDetails.dateCreated.toString()!)
                      )}
                    </Text>
                  )}
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
                ></Center>
              )}
            </Row>
            
          </Column>
        </Pressable>
      );
  }
};

export default NotificationListItem;

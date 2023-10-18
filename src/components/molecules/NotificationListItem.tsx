import {
  Button,
  CollaboratorRemovalIcon,
  ExpirationIcon,
  LowStockIcon,
  SmallMail,
} from "@listed-components/atoms";
import { NotificationStatus, NotificationType } from "@listed-types";

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
import React from "react";

interface NotificationListItemProps extends IPressableProps {
  sender: string;
  receiver: string;
  store: string;
  product: string;
  notificationType: NotificationType;
  notificationStatus: NotificationStatus;
  expirationDate: string;
  dateCreated: string;
  time: string;
  quantity: string;
}

const NotificationListItem = ({
  sender,
  receiver,
  store,
  product,
  notificationType,
  notificationStatus,
  expirationDate,
  dateCreated,
  time,
  quantity,
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

  const backgroundColor =
    notificationStatus === NotificationStatus.UNREAD
      ? "offWhite.300"
      : "muted.50";

  switch (notificationType) {
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
            {getIconByNotificationType(notificationType)}
            <Column alignItems="flex-start">
              <Text
                fontSize="sm"
                fontWeight={
                  notificationStatus === NotificationStatus.UNREAD
                    ? "semibold"
                    : "normal"
                }
              >
                {product}
              </Text>
              <Text
                fontSize="xs"
                color="muted.500"
                fontWeight={
                  notificationStatus === NotificationStatus.UNREAD
                    ? "medium"
                    : "normal"
                }
              >
                Low Stocks: {quantity}
              </Text>
            </Column>
            <Column flex="2" alignItems="flex-end">
              <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {store}
              </Badge>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {dateCreated}
              </Text>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {time}
              </Text>
            </Column>
            {notificationStatus === NotificationStatus.UNREAD && (
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
            {getIconByNotificationType(notificationType)}
            <Column alignItems="flex-start">
              <Text
                fontSize="sm"
                fontWeight={
                  notificationStatus === NotificationStatus.UNREAD
                    ? "semibold"
                    : "normal"
                }
              >
                {product}
              </Text>
              <Text
                fontSize="xs"
                color="muted.500"
                fontWeight={
                  notificationStatus === NotificationStatus.UNREAD
                    ? "medium"
                    : "normal"
                }
              >
                Expires on {expirationDate}
              </Text>
            </Column>
            <Column flex="2" alignItems="flex-end">
              <Badge colorScheme="green" variant="solid" alignItems="flex-end">
                {store}
              </Badge>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {dateCreated}
              </Text>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {time}
              </Text>
            </Column>

            {notificationStatus === NotificationStatus.UNREAD && (
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
            {getIconByNotificationType(notificationType)}
            <Column flex="4" alignItems="flex-start">
              <Text
                fontSize="sm"
                fontWeight={
                  notificationStatus === NotificationStatus.UNREAD
                    ? "semibold"
                    : "normal"
                }
              >
                Removed from {store}
              </Text>
              <Text
                fontSize="xs"
                color="muted.500"
                fontWeight={
                  notificationStatus === NotificationStatus.UNREAD
                    ? "medium"
                    : "normal"
                }
              >
                {sender} removed you as a collaborator.
              </Text>
            </Column>

            <Column flex="2" alignItems="flex-end">
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {dateCreated}
              </Text>
              <Text fontSize="xs" fontWeight="normal" color="muted.500">
                {time}
              </Text>
            </Column>
            {notificationStatus === NotificationStatus.UNREAD && (
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
              {getIconByNotificationType(notificationType)}
              <Column flex="4" alignItems="flex-start">
                <Text
                  fontSize="sm"
                  fontWeight={
                    notificationStatus === NotificationStatus.UNREAD
                      ? "semibold"
                      : "normal"
                  }
                >
                  Join {store}
                </Text>
                <Text
                  fontSize="xs"
                  color="muted.500"
                  fontWeight={
                    notificationStatus === NotificationStatus.UNREAD
                      ? "medium"
                      : "normal"
                  }
                >
                  {sender} sent you an invite.
                </Text>
              </Column>

              <Column flex="2" alignItems="flex-end">
                <Text fontSize="xs" fontWeight="normal" color="muted.500">
                  {dateCreated}
                </Text>
                <Text fontSize="xs" fontWeight="normal" color="muted.500">
                  {time}
                </Text>
              </Column>
              {notificationStatus === NotificationStatus.UNREAD && (
                <Center
                  width="2"
                  height="2"
                  backgroundColor="primary.700"
                  borderRadius="full"
                ></Center>
              )}
            </Row>

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
              {getIconByNotificationType(notificationType)}
              <Column flex="4" alignItems="flex-start">
                <Text
                  fontSize="sm"
                  fontWeight={
                    notificationStatus === NotificationStatus.UNREAD
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
                    notificationStatus === NotificationStatus.UNREAD
                      ? "medium"
                      : "normal"
                  }
                >
                  {receiver} accepted your invite.
                </Text>
              </Column>

              <Column flex="2" alignItems="flex-end">
                <Badge
                  colorScheme="green"
                  variant="solid"
                  alignItems="flex-end"
                >
                  {store}
                </Badge>
                <Text fontSize="xs" fontWeight="normal" color="muted.500">
                  {dateCreated}
                </Text>
                <Text fontSize="xs" fontWeight="normal" color="muted.500">
                  {time}
                </Text>
              </Column>
              {notificationStatus === NotificationStatus.UNREAD && (
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

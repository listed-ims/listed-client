import {
  Button,
  CollaboratorRemovalIcon,
  ExpirationIcon,
  LowStockIcon,
  StoreInviteIcon,
} from "@listed-components/atoms";

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
  notificationType:
    | "STORE_INVITE"
    | "COLLABORATOR_REMOVAL"
    | "LOW_STOCK"
    | "EXPIRATION"
    | "INVITE_REPLY";
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
  expirationDate,
  dateCreated,
  time,
  quantity,
  ...props
}: NotificationListItemProps) => {
  const getIconByNotificationType = (
    type:
      | "STORE_INVITE"
      | "COLLABORATOR_REMOVAL"
      | "LOW_STOCK"
      | "EXPIRATION"
      | "INVITE_REPLY"
  ) => {
    switch (type) {
      case "EXPIRATION":
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

      case "LOW_STOCK":
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

      case "COLLABORATOR_REMOVAL":
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

      case "STORE_INVITE":
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <StoreInviteIcon />
          </Center>
        );

        case "INVITE_REPLY":
        return (
          <Center
            width="8"
            height="8"
            backgroundColor="offWhite.700"
            borderRadius="full"
          >
            <StoreInviteIcon />
          </Center>
        );

      default:
        return null;
    }
  };

  switch (notificationType) {
    case "LOW_STOCK":
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor="muted.50"
          my="1"
          
        >
          <Row alignItems="center" justifyContent="space-between" space="2">
            {getIconByNotificationType(notificationType)}
            <Column alignItems="flex-start">
              <Text fontSize="sm" fontWeight="semibold">
                {product}
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="muted.500">
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
          </Row>
        </Pressable>
      );

    case "EXPIRATION":
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor="offWhite.200"
          my="1"
        >
          <Row alignItems="center" justifyContent="space-between" space="2">
            {getIconByNotificationType(notificationType)}
            <Column alignItems="flex-start">
              <Text fontSize="sm" fontWeight="semibold">
                {product}
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="muted.500">
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
        
            <Center width="2" height="2" backgroundColor="primary.700" borderRadius="full">
    
          </Center>
            
          </Row>
        </Pressable>
      );

    case "COLLABORATOR_REMOVAL":
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor="offWhite.200"
          my="1"
        >
          <Row alignItems="center" justifyContent="space-between" space="2">
            {getIconByNotificationType(notificationType)}
            <Column flex="4" alignItems="flex-start">
              <Text fontSize="sm" fontWeight="semibold">
                Removed from {store}
              </Text>
              <Text fontSize="xs" fontWeight="medium" color="muted.500">
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
            <Center width="2" height="2" backgroundColor="primary.700" borderRadius="full">
    
            </Center>
          </Row>
        </Pressable>
      );

    case "STORE_INVITE":
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor="offWhite.200"
          my="1"
      
        >
      
          <Column>
            <Row alignItems="center" justifyContent="space-between" space="2"  pointerEvents="box-none">
              {getIconByNotificationType(notificationType)}
              <Column flex="4" alignItems="flex-start">
                <Text fontSize="sm" fontWeight="semibold">
                  Join {store}
                </Text>
                <Text fontSize="xs" fontWeight="medium" color="muted.500">
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
              <Center width="2" height="2" backgroundColor="primary.700" borderRadius="full">
    
              </Center>
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

    case "INVITE_REPLY":
      return (
        <Pressable
          {...props}
          _pressed={{ background: "muted.100" }}
          p="4"
          borderRadius="lg"
          backgroundColor="muted.50"
          my="1"
        >
          <Column>
            <Row alignItems="center" justifyContent="space-between" space="2">
              {getIconByNotificationType(notificationType)}
              <Column flex="4" alignItems="flex-start">
                <Text fontSize="sm" fontWeight="semibold">
                  New Collaborator.
                </Text>
                <Text fontSize="xs" fontWeight="medium" color="muted.500">
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
            </Row>
          </Column>
        </Pressable>
      );
  }
};

export default NotificationListItem;

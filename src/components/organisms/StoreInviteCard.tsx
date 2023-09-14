import { Button, StoreDetailsInviteIcon } from "@listed-components/atoms";
import { HStack, VStack, Text } from "native-base";
import React from "react";

interface StoreInviteCardProps {
  owner: string | undefined;
  onAccept: () => void;
  onDecline: () => void;
}

const StoreInviteCard = ({
  owner,
  onAccept,
  onDecline,
}: StoreInviteCardProps) => {
  return (
    <VStack
      alignItems="center"
      space="1"
      p="4"
      bgColor="primary.700"
      borderRadius="8"
      borderColor="primary.700"
      borderWidth="1"
    >
      <HStack space="1">
        <StoreDetailsInviteIcon />
        <Text fontSize="sm" fontWeight="semibold" color="white">
          You got an invite.
        </Text>
      </HStack>
      <Text fontSize="xs" color="white">
        {owner} invited you to join this store.
      </Text>
      <HStack space="4" pt="4">
        <Button flex="1" variant="white" onPress={onAccept}>
          ACCEPT
        </Button>
        <Button flex="1" variant="whiteOutline" onPress={onDecline}>
          DECLINE
        </Button>
      </HStack>
    </VStack>
  );
};

export default StoreInviteCard;

import React from "react";
import { HStack, VStack, Text, useTheme } from "native-base";
import { AlertOutlineIcon, Button } from "@listed-components/atoms";

interface CloseStoreCardProps {
  onClose: () => void;
}

const CloseStoreCard = ({ onClose }: CloseStoreCardProps) => {
  const theme = useTheme();

  return (
    <VStack
      space="2"
      borderWidth="1"
      borderRadius="lg"
      borderColor="error.300"
      p="4"
    >
      <HStack space="1">
        <AlertOutlineIcon color={theme.colors.error[500]} />
        <Text fontSize="xs" fontWeight="semibold" color="error.500">
          CLOSE STORE
        </Text>
      </HStack>
      <Text fontSize="sm" color="darkText">
        Closing a store will disable all features for inventory management. This
        will make the store read-only. Closed stores cannot be reopened.
      </Text>
      <Button variant="warnSubtle" onPress={onClose}>
        CLOSE STORE
      </Button>
    </VStack>
  );
};

export default CloseStoreCard;

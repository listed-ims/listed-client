import React from "react";
import { VStack, Text } from "native-base";
import { Button } from "@listed-components/atoms";

interface MakeCurrentStoreCardProps {
  onMakeCurrent: () => void;
}

const MakeCurrentStoreCard = ({ onMakeCurrent }: MakeCurrentStoreCardProps) => {
  return (
    <VStack
      space="2"
      borderWidth="1"
      borderRadius="lg"
      borderColor="primary.300"
      p="4"
    >
      <Text fontSize="xs" fontWeight="semibold" color="muted.500">
        MAKE CURRENT STORE
      </Text>
      <Text fontSize="sm" color="darkText">
        Make this store your current store to manage.
      </Text>
      <Button onPress={onMakeCurrent}>MAKE CURRENT STORE</Button>
    </VStack>
  );
};

export default MakeCurrentStoreCard;

import { StoreResponse } from "@listed-types";
import { toCurrency } from "@listed-utils";
import { VStack, Text, Divider } from "native-base";
import React from "react";

interface StoreSummaryCardProps {
  store: StoreResponse;
  isInvite: boolean;
}

const StoreSummaryCard = ({
  store,
  isInvite
}: StoreSummaryCardProps) => {
  return (
    <VStack
      space="4"
      borderWidth="1"
      borderRadius="lg"
      borderColor="muted.300"
      p="4"
    >
      <VStack space="2">
        <Text fontSize="xs" fontWeight="semibold" color="muted.500">
          STORE OWNER
        </Text>
        <VStack>
          <Text fontSize="sm" fontWeight="bold" color="darkText">
            {store.owner.name}
          </Text>
          <Text fontSize="sm" fontWeight="medium" color="darkText">
            {store.owner.username}
          </Text>
        </VStack>
      </VStack>
      {!isInvite && (
        <>
          <Divider />
          <VStack space="2">
            <Text fontSize="xs" fontWeight="semibold" color="muted.500">
              INVENTORY VALUE
            </Text>
            <Text fontSize="sm" fontWeight="bold" color="darkText">
              {toCurrency(store.inventoryValue as number)}
            </Text>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default StoreSummaryCard;

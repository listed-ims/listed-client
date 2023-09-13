import { StoreStatus } from "@listed-constants";
import { toCurrency } from "@listed-utils";
import { VStack, Text, HStack, Divider } from "native-base";
import React from "react";

interface StoreSummaryCardProps {
  owner?: string;
  status?: StoreStatus;
  totalProducts?: number;
  totalPriceValue?: number;
  isInvite: boolean;
}

const StoreSummaryCard = ({
  owner,
  status,
  totalProducts,
  totalPriceValue,
  isInvite,
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
          STORE DETAILS
        </Text>
        <VStack space="1">
          <HStack>
            <Text flex="2" fontSize="sm" color="darkText">
              Store Owner:
            </Text>
            <Text flex="3" fontSize="sm" fontWeight="bold" color="darkText">
              {owner}
            </Text>
          </HStack>
          <HStack>
            <Text flex="2" fontSize="sm" color="darkText">
              Store Status:
            </Text>
            <Text flex="3" fontSize="sm" fontWeight="bold" color="darkText">
              {status === StoreStatus.OPEN ? "Open" : "Closed"}
            </Text>
          </HStack>
        </VStack>
      </VStack>
      {!isInvite && (
        <>
          <Divider />
          <VStack space="2">
            <Text fontSize="xs" fontWeight="semibold" color="muted.500">
              STORE PRODUCTS
            </Text>
            <VStack space="1">
              <HStack>
                <Text flex="2" fontSize="sm" color="darkText">
                  Total Products:
                </Text>
                <Text flex="3" fontSize="sm" fontWeight="bold" color="darkText">
                  {totalProducts === null ? 0 : totalProducts}
                </Text>
              </HStack>
              <HStack>
                <Text flex="2" fontSize="sm" color="darkText">
                  Total Price Value:
                </Text>
                <Text flex="3" fontSize="sm" fontWeight="bold" color="darkText">
                  {toCurrency(totalPriceValue as number)}
                </Text>
              </HStack>
            </VStack>
          </VStack>
        </>
      )}
    </VStack>
  );
};

export default StoreSummaryCard;

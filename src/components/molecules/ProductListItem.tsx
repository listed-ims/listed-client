import { ProductResponse } from "@listed-types";
import {
  IPressableProps,
  Text,
  Pressable,
  HStack,
  VStack,
  Badge,
} from "native-base";
import React from "react";

interface ProductListItemProps extends IPressableProps {
  product: ProductResponse;
}

const ProductListItem = ({ product, ...props }: ProductListItemProps) => {
  const { name, variant, quantity, threshold, unit } = product;

  return (
    <Pressable {...props} _pressed={{ background: "muted.200" }} p="2">
      <HStack alignItems="flex-end" justifyContent="space-between">
        <VStack>
          <Text fontSize="sm" fontWeight="medium">
            {name}
          </Text>
          <Text fontSize="xs" fontWeight="medium" color="muted.600">
            {variant}
          </Text>
        </VStack>
        <VStack alignItems="flex-end">
          {quantity == 0 ? (
            <Badge colorScheme="error" variant="solid">
              No Stock
            </Badge>
          ) : quantity <= (threshold as number) ? (
            <Badge colorScheme="warning" variant="solid">
              Low Stock
            </Badge>
          ) : (
            <></>
          )}
          <Text fontSize="xs" fontWeight="medium" color="muted.600">
            {quantity} {unit.toLowerCase()}
          </Text>
        </VStack>
      </HStack>
    </Pressable>
  );
};

export default ProductListItem;

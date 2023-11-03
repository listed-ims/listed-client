import { HStack, Skeleton, VStack } from "native-base";
import React from "react";

const ProductDetailsLoadingSkeleton = () => {
  return (
    <VStack space="4" height="full" py="6">
      <VStack space="1" alignItems="center">
        <Skeleton rounded="full" h="12" w="12" />
        <Skeleton rounded="lg" h="6" w="30%" startColor="muted.300" />
        <Skeleton rounded="lg" h="4" w="40%" />
      </VStack>
      <VStack px="4">
        {Array.from({ length: 6 }).map((_, index) => (
          <HStack
            key={index}
            paddingX="4"
            paddingY="2"
            space="4"
            borderBottomWidth={index === 5 ? "0" : "0.5"}
            borderBottomColor={index === 5 ? "" : "#D4D4D4"}
            alignItems="center"
          >
            <Skeleton rounded="full" h="6" w="6" />
            <VStack flex="1" space="1">
              <Skeleton rounded="lg" h="4" w="40%" />
              <Skeleton rounded="lg" h="4" w="20%" startColor="muted.300" />
            </VStack>
          </HStack>
        ))}
      </VStack>
      <VStack mt="8" mb="6" space="4">
      <Skeleton rounded="lg" h="10" startColor="muted.300" />
      <Skeleton rounded="lg" h="10" />
      </VStack>
      
    </VStack>
  );
};

export default ProductDetailsLoadingSkeleton;

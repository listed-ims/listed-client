import { Divider, Skeleton, VStack } from "native-base";
import React from "react";

const StoreDetailsLoadingSkeleton = () => {
  return (
    <VStack space="4" height="full" py="6">
      <VStack space="1" alignItems="center">
        <Skeleton rounded="full" h="12" w="12" />
        <Skeleton rounded="lg" h="6" w="30%" startColor="muted.300" />
        <Skeleton rounded="lg" h="4" w="20%" />
        <Skeleton rounded="lg" h="4" w="40%" />
      </VStack>
      <VStack
        padding="4"
        borderWidth="1"
        borderColor="muted.100"
        borderRadius="lg"
        space="4"
      >
        <VStack space="2" w="75%">
          <Skeleton rounded="lg" h="4" w="50%" />
          <VStack space="1">
            <Skeleton rounded="lg" h="4" startColor="muted.300" />
            <Skeleton rounded="lg" h="4" w="50%" />
          </VStack>
        </VStack>
        <Divider />
        <VStack space="2" w="75%">
          <Skeleton rounded="lg" h="4" w="50%" />
          <Skeleton rounded="lg" h="4" startColor="muted.300" />
        </VStack>
      </VStack>
      <VStack
        padding="4"
        borderWidth="1"
        borderColor="muted.100"
        borderRadius="lg"
        space="4"
      >
        <VStack space="2">
          <Skeleton rounded="lg" h="4" w="50%" />
          <VStack space="1">
            <Skeleton rounded="lg" h="4" />
            <Skeleton rounded="lg" h="4" w="25%" />
          </VStack>

          <Skeleton rounded="lg" h="10" startColor="muted.300" />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default StoreDetailsLoadingSkeleton;

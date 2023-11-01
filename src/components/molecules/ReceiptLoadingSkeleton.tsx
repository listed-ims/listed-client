import { Column, Row, Skeleton } from "native-base";

const ReceiptLoadingSkeleton = () => {
  const skeletonItems = Array.from({ length: 8 }).map((_, index) => (
    <Column padding="1" key={index} rounded="sm" space="1">
      <Row space="8" alignItems="center">
        <Skeleton
          h="3"
          flex="1"
          rounded="full"
          marginLeft="5"
          startColor="muted.300"
        />
        <Skeleton h="3" flex="2" rounded="full" marginRight="10" />
      </Row>
    </Column>
  ));

  return (
    <Column space="2" alignItems="">

      <Column alignItems="center" marginTop="4">
        <Skeleton h="3" w="20" rounded="full" />
      </Column>

      <Column space="2" alignItems="center">
        <Skeleton h="6" width="6" rounded="full" />
        <Skeleton h="3" w="20" rounded="full" />
        <Skeleton h="3" w="20" rounded="full" />
      </Column>

      {skeletonItems}

      <Skeleton h="3" w="10" marginLeft="6" rounded="full" />

      <Column alignItems="center">
        <Skeleton h="10" w="80" rounded="full" />
      </Column>

      <Column space="2" marginY="4" alignItems="center">
        <Skeleton h="2" w="80" rounded="full" />
        <Skeleton h="3" w="40" rounded="full" />
        <Skeleton h="5" w="80" rounded="full" />
      </Column>
      
    </Column>
  );
};

export default ReceiptLoadingSkeleton;

import { Column, Row, Skeleton } from "native-base";

const StoreListLoadingSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }).map((_, index) => (
    <Row
      padding="2"
      borderWidth="1"
      borderColor="muted.100"
      background="muted.50"
      borderRadius="lg"
      key={index}
      space="6"
      alignItems="center"
    >
      <Column flex="2">
        <Skeleton h="4" rounded="full" startColor="muted.300" />
      </Column>
      <Column flex="1" space="1" alignItems="flex-end">
        <Skeleton h="4" rounded="full" />
        <Skeleton h="4" rounded="full" w="75%" />
      </Column>
    </Row>
  ));

  return <Column space="4">{skeletonItems}</Column>;
};

export default StoreListLoadingSkeleton;

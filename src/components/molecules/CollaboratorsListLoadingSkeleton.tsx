import { Column, Row, Skeleton } from "native-base"


const CollaboratorsListLoadingSkeleton = () => {
  const skeletonItems = Array.from({ length: 10 }).map((_, index) =>
    <Column padding="2" borderWidth="1" borderColor="muted.100" background="muted.50" key={index} rounded="sm" space="1">
      <Row space="8" alignItems="center">
        <Skeleton h="4" flex="6" rounded="full" startColor="muted.300" />
        <Skeleton h="4" flex="1" />
      </Row>
      <Row space="16" alignItems="center">
        <Skeleton h="3" flex="3" rounded="full" />
        <Skeleton h="4" flex="1" />
      </Row>
    </Column>
  )

  return (
    <Column space="4">
      {skeletonItems}
    </Column>
  )
}

export default CollaboratorsListLoadingSkeleton
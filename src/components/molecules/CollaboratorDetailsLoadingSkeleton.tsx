import { Column, Divider, Skeleton } from "native-base"

const CollaboratorDetailsLoadingSkeleton = () => {
  const permissions = Array.from({ length: 3 }, (_, i) =>
    <Column key={i} space="4">
      <Column space="2">
        <Skeleton rounded="lg" h="4" startColor="muted.300" />
        <Skeleton height="3" rounded="lg" width="75%" />
        <Skeleton height="3" rounded="lg" width="50%" />
      </Column>
      <Divider background="muted.100" />
      <Column space="2">
        <Skeleton rounded="lg" h="4" startColor="muted.300" />
        <Skeleton height="3" rounded="lg" width="50%" />
        <Skeleton height="3" rounded="lg" width="75%" />
      </Column>
      <Divider background="muted.100" />
    </Column>
  )

  return (
    <Column space="4" height="full" py="6">
      <Column space="1" alignItems="center">
        <Skeleton rounded="full" h="12" w="12" />
        <Skeleton rounded="lg" h="6" w="30%" startColor="muted.300" />
        <Skeleton rounded="lg" h="4" w="20%" />
        <Skeleton rounded="lg" h="4" w="40%" />
      </Column>
      <Column
        padding="4"
        borderWidth="1"
        borderColor="muted.100"
        borderRadius="lg"
        space="4"
      >
        {permissions}
      </Column>
    </Column>
  )
}

export default CollaboratorDetailsLoadingSkeleton
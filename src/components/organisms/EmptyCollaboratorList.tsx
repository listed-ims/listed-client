import { ManIcon } from "@listed-components/atoms"
import { MembershipStatus } from "@listed-types";
import { Column, Text } from "native-base"

interface EmptyCollaboratorListProps {
  filter: Omit<MembershipStatus, "DECLINED">;
}

const EmptyCollaboratorList = ({ filter }: EmptyCollaboratorListProps) => {
  return (
    <Column
      flex="1"
      alignItems="center"
      justifyContent="center">
      <ManIcon />
      <Text fontWeight="semibold" fontSize="lg">No collaborators.</Text>
      <Text fontSize="xs">{`You don't have any ${filter} collaborators.`}</Text>
    </Column>
  )
}

export default EmptyCollaboratorList
import React from "react";
import { Badge, Column, IPressableProps, Pressable, Row, Text } from "native-base"
import { MembershipStatus } from "@listed-types";
import { toTitleCase } from "@listed-utils";

interface CollaboratorItemProps extends IPressableProps {
  name: string;
  userRole?: "owner" | "collaborator" | string;
  membershipStatus: MembershipStatus;
  isYou?: boolean;
}

const CollaboratorListItem = ({
  name,
  userRole = "collaborator",
  membershipStatus,
  isYou = false,
  ...props
}: CollaboratorItemProps) => {

  return (
    <Pressable {...props}
      _pressed={{ background: "muted.100" }}
      background="white"
      p="4"
      shadow="0"
      borderRadius="lg"
      margin="1"
    >
      <Row justifyContent="space-between" alignItems="center">
        <Column>
          <Text fontSize="sm" fontWeight="semibold">{name}</Text>
          <Text fontSize="xs">{toTitleCase(userRole)}</Text>
        </Column>
        <Column space="1" alignItems="flex-end">
          {isYou &&
            <Badge
              colorScheme="success"
              variant="outline">
              YOU
            </Badge>}
          <Badge
            colorScheme={
              membershipStatus === MembershipStatus.ACTIVE ?
                "info" :
                membershipStatus === MembershipStatus.PENDING ?
                  "warning" :
                  "error"
            }
            variant="solid">
            {toTitleCase(membershipStatus)}
          </Badge>
        </Column>
      </Row>
    </Pressable>
  )
}

export default CollaboratorListItem
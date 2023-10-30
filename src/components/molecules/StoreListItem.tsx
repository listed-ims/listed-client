import React from "react";
import {
  Badge,
  Column,
  IPressableProps,
  Pressable,
  Row,
  Text,
} from "native-base";
import { ownerOrCollaborator, toTitleCase } from "@listed-utils";
import { CheckedIcon } from "@listed-components/atoms";
import { useGetUserMembership } from "@listed-hooks";
import { MembershipStatus } from "@listed-types";

interface StoreListItemProps extends IPressableProps {
  storeId?: number;
  userId?: number;
  name: string;
  current: boolean;
}

const StoreListItem = ({
  storeId,
  userId,
  name,
  current,
  ...props
}: StoreListItemProps) => {
  const { data: userMembership, isSuccess: userMembershipSuccess } =
    useGetUserMembership(storeId!, userId!);

  return (
    <Pressable
      {...props}
      _pressed={{ background: "muted.100" }}
      background={current ? "offWhite.400" : "white"}
      p="4"
      shadow="0"
      borderRadius="lg"
      my="1"
      mx="1"
    >
      <Row alignItems="center" justifyContent="space-between" space="2">
        <Row flex="2" alignItems="flex-start" space="4">
          {current && <CheckedIcon />}
          <Text fontSize="sm" fontWeight="semibold" color="darkText">
            {name}
          </Text>
        </Row>
        <Column flex="1" alignItems="flex-end">
          {current ? (
            <Badge colorScheme="success" variant="outline">
              CURRENT STORE
            </Badge>
          ) : userMembership?.membershipStatus === MembershipStatus.PENDING ? (
            <Badge colorScheme="error" variant="outline">
              NEW INVITE
            </Badge>
          ) : null}
          <Text fontSize="xs" color="muted.500">
            {toTitleCase(
              ownerOrCollaborator(userMembership?.permissions || [])
            )}
          </Text>
        </Column>
      </Row>
    </Pressable>
  );
};

export default StoreListItem;

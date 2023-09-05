import React from "react";
import {
  Badge,
  Checkbox,
  Column,
  IPressableProps,
  Pressable,
  Row,
  Text,
} from "native-base";
import { toTitleCase } from "@listed-utils";

interface StoreListItemProps extends IPressableProps {
  name: string;
  userRole: string;
  status: "open" | "closed";
  current: boolean;
}

const StoreListItem = ({
  name,
  userRole,
  status,
  current,
  ...props
}: StoreListItemProps) => {
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
        {current && (
          <Checkbox
            colorScheme="success"
            size="sm"
            defaultIsChecked
            value=""
            borderRadius="full"
          />
        )}
        <Column flex="2" alignItems="flex-start">
          {current && (
            <Badge colorScheme="success" variant="outline">
              CURRENT STORE
            </Badge>
          )}
          <Text fontSize="sm" fontWeight="semibold" color="darkText">
            {toTitleCase(name)}
          </Text>
          <Text fontSize="xs" color="muted.500">
            {toTitleCase(userRole)}
          </Text>
        </Column>
        <Column flex="1" alignItems="flex-end">
          <Text fontSize="xs" color="muted.500">
            Store Status
          </Text>
          <Badge
            colorScheme={status === "open" ? "info" : "error"}
            variant="solid"
          >
            {toTitleCase(status)}
          </Badge>
        </Column>
      </Row>
    </Pressable>
  );
};

export default StoreListItem;

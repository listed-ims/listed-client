import React from "react";
import { HStack } from "native-base";
import { FilterButton } from "@listed-components/atoms";

interface NotificationsFilterProps {
  filter: "all" | "unread";
  handleSetFilter: (filter: "all" | "unread") => void;
}

const NotificationsFilter = ({ filter, handleSetFilter }: NotificationsFilterProps) => {
  
  return (
    <HStack space="2">
      <FilterButton
        label="unread"
        state={filter === "unread" ? "active" : "inactive"}
        onPress={() => {
        
          handleSetFilter(filter === "unread" ? "all" : "unread");
        }}
      />
    </HStack>
  );
};

export default NotificationsFilter;

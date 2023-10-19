import React, { useState } from "react";
import { Box, Column, FlatList, Text } from "native-base";
import {
  NotificationListItem,
  NotificationsFilter,
} from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { NotificationStatus } from "@listed-types";
import { useGetNotifications } from "@listed-hooks";

const Notification = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  
  const {
    data: notificationList,
    isError: notificationListError,
    isFetching: notificationListFetching,
  } = useGetNotifications(
    filter === "all"
      ? undefined
      : NotificationStatus.UNREAD,
      1,
    100
  );


  return (
    <ScreenContainer>
      <Column flex="1">
        <Box marginTop="15" marginBottom="6">
          <Text fontSize="xl" fontWeight="semibold" marginBottom="4">
            Notifications
          </Text>
          <NotificationsFilter
            filter={filter}
            handleSetFilter={(filter) => setFilter(filter)}
          />
        </Box>

        <FlatList
          marginBottom="2"
          contentContainerStyle={{ flexGrow: 1 }}
          data={notificationList}
          renderItem={({ item }) => (
            <NotificationListItem notificationDetails={item} />
          )}
        />
      </Column>
    </ScreenContainer>
  );
};

export default Notification;

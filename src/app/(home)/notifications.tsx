import React, { useCallback, useRef, useState } from "react";
import { Box, Column, FlatList, Text } from "native-base";
import { NotificationsFilter } from "@listed-components/molecules";
import { NotificationListItem, ScreenContainer } from "@listed-components/organisms";
import { NotificationStatus } from "@listed-types";
import { useGetNotifications } from "@listed-hooks";
import { useFocusEffect } from "expo-router";

const Notification = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const firstMount = useRef(true)

  const {
    data: notificationList,
    isError: notificationListError,
    isFetching: notificationListFetching,
    refetch: refetchNotifications,
  } = useGetNotifications(
    filter === "all"
      ? undefined
      : NotificationStatus.UNREAD,
    1,
    100
  );

  useFocusEffect(
    useCallback(() => {
      if (firstMount.current) {
        firstMount.current = false;
        return;
      }

      refetchNotifications();
    }, [refetchNotifications])
  )

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

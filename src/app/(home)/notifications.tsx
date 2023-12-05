import React, { useCallback, useMemo, useRef, useState } from "react";
import { Box, Column, FlatList, Text } from "native-base";
import {
  CollaboratorRemovalNotification,
  ExpirationNotification,
  InviteReplyNotification,
  LowStockNotification,
  NotificationsFilter,
  StoreInviteNotification
} from "@listed-components/molecules";
import { ScreenContainer } from "@listed-components/organisms";
import { NotificationResponse, NotificationStatus, NotificationType } from "@listed-types";
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

  const notificationListMemo = useMemo(() => notificationList, [notificationList]);

  const renderItem = useCallback((
    { item }: { item: NotificationResponse }
  ) => {
    if (item.type === NotificationType.LOW_STOCK) {
      return <LowStockNotification
        key={item.id}
        notificationDetails={item}
      />
    } else if (item.type === NotificationType.EXPIRATION) {
      return <ExpirationNotification
        key={item.id}
        notificationDetails={item}
      />
    }
    else if (item.type === NotificationType.STORE_INVITE) {
      return <StoreInviteNotification
        key={item.id}
        notificationDetails={item}
      />
    }
    else if (item.type === NotificationType.INVITE_REPLY) {
      return <InviteReplyNotification
        key={item.id}
        notificationDetails={item}
      />
    }
    else if (item.type === NotificationType.COLLABORATOR_REMOVAL) {
      return <CollaboratorRemovalNotification
        key={item.id}
        notificationDetails={item}
      />
    }
    else {
      return null;
    }
  }, [])

  const keyExtractor = useCallback((item: NotificationResponse) => item.id.toString(), [])

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
          data={notificationListMemo}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </Column>
    </ScreenContainer>
  );
};

export default Notification;

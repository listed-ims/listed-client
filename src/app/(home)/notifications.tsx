import React, { useState } from "react";
import { Box, Column, FlatList, Text } from "native-base";
import {
  NotificationListItem,
  NotificationsFilter,
} from "@listed-components/molecules";
import { Stack } from "expo-router";
import { ScreenContainer } from "@listed-components/organisms";
import { NotificationStatus, NotificationType } from "@listed-types";

const Notification = () => {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const data = [
    {
      id: "1",
      sender: "JohnDoe",
      receiver: "JaneSmith",
      store: "7/EVELEN",
      product: "EXPO",
      notificationType: NotificationType.EXPIRATION,
      notificationStatus: NotificationStatus.READ,
      expirationDate: "2023-11-15",
      dateCreated: "Oct 1",
      time: "10:00 AM",
    },
    {
      id: "2",
      sender: "JaneSmith",
      receiver: "JohnDoe",
      notificationType: NotificationType.LOW_STOCK,
      notificationStatus: NotificationStatus.UNREAD,
      store: "Nustar",
      product: "360 Coffee",
      expirationDate: "2023-12-10",
      dateCreated: "Yesterday",
      time: "12:30 PM",
      quantity: "10",
    },

    {
      id: "3",
      sender: "Lebron",
      receiver: "James",
      notificationType: NotificationType.STORE_INVITE,
      notificationStatus: NotificationStatus.UNREAD,
      store: "IPROMISE",
      product: "Lobos Coffee",
      expirationDate: "Yesterday",
      dateCreated: "Oct 10",
      time: "12:30 PM",
    },

    {
      id: "4",
      sender: "Lebron",
      receiver: "James",
      notificationType: NotificationType.INVITE_REPLY,
      notificationStatus: NotificationStatus.READ,
      store: "IPROMISE",
      product: "Lobos Coffee",
      expirationDate: "Yesterday",
      dateCreated: "Oct 10",
      time: "12:30 PM",
    },

    {
      id: "5",
      sender: "Stephen",
      receiver: "Durant",
      notificationType: NotificationType.COLLABORATOR_REMOVAL,
      notificationStatus: NotificationStatus.UNREAD,
      store: "NBA",
      product: "Lobos Coffee",
      expirationDate: "Yesterday",
      dateCreated: "Oct 10",
      time: "12:30 PM",
    },

    {
      id: "6",
      sender: "Michael",
      receiver: "Jordan",
      notificationType: NotificationType.EXPIRATION,
      notificationStatus: NotificationStatus.READ,
      store: "IPROMISE",
      product: "Lobos Coffee",
      expirationDate: "Yesterday",
      dateCreated: "Oct 10",
      time: "12:30 PM",
    },

    {
      id: "7",
      sender: "Lebron",
      receiver: "James",
      notificationType: NotificationType.STORE_INVITE,
      notificationStatus: NotificationStatus.UNREAD,
      store: "IPROMISE",
      product: "Lobos Coffee",
      expirationDate: "Yesterday",
      dateCreated: "Oct 10",
      time: "12:30 PM",
    },
  ];

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
          data={data}
          renderItem={({ item }) => (
            <NotificationListItem
              sender={item.sender}
              receiver={item.receiver}
              store={item.store}
              product={item.product}
              notificationType={item.notificationType}
              notificationStatus={item.notificationStatus}
              expirationDate={item.expirationDate}
              dateCreated={item.dateCreated}
              time={item.time}
              quantity={item.quantity ?? ""}
            />
          )}
        />
      </Column>
    </ScreenContainer>
  );
};

export default Notification;

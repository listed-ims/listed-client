import { LowStockIcon } from "@listed-components/atoms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useNotificationHandler } from "@listed-hooks";
import { NotificationResponse, NotificationStatus } from "@listed-types";
import { dateToDay, dateToReadableTime } from "@listed-utils";
import { router } from "expo-router";
import { Badge, Center, Column, IPressableProps, Pressable, Row, Text } from "native-base";
import { memo, useState } from "react";

interface LowStockNotificationProps extends IPressableProps {
  notificationDetails: NotificationResponse;
}

const LowStockNotification = ({ notificationDetails, ...props }: LowStockNotificationProps) => {
  const { userDetails } = useAuth();
  const { metaData, status, dateCreated } = notificationDetails;
  const modalContent = {
    header: "Change Store",
    body: `This product is from another store. Would you like to change your current store to ${metaData.store.name}?`
  }
  const [showChangeStoreModal, setShowChangeStoreModal] = useState(false)

  const onPressCallback = () => {
    if (metaData.store.id !== userDetails?.currentStoreId) {
      setShowChangeStoreModal(true);
    } else {
      router.push(`${Routes.PRODUCTS}/${metaData.product.id}`);
    }
  }

  const { handleOnPress, changeStoreModal } = useNotificationHandler(
    notificationDetails,
    onPressCallback
  );

  return (
    <Pressable {...props}
      _pressed={{
        background:
          notificationDetails.status === NotificationStatus.UNREAD ? "offWhite.600" : "muted.200",
      }}
      p="4"
      borderRadius="lg"
      background={
        notificationDetails.status === NotificationStatus.UNREAD ? "offWhite.300" : "muted.50"
      }
      my="1"
      onPress={handleOnPress}
    >
      <Row alignItems="center" justifyContent="space-between" space="2">
        <Center
          width="8"
          height="8"
          backgroundColor="offWhite.700"
          borderRadius="full"
        >
          <LowStockIcon />
        </Center>
        <Column flex="4" alignItems="flex-start">
          <Text
            numberOfLines={1}
            fontSize="sm"
            fontWeight={
              status === NotificationStatus.UNREAD
                ? "semibold"
                : "normal"
            }
          >
            {metaData.product.name}
          </Text>
          <Text
            fontSize="xs"
            color="muted.500"
            fontWeight={
              status === NotificationStatus.UNREAD
                ? "medium"
                : "normal"
            }
          >
            {`Low Stocks: ${metaData.quantity}`}
          </Text>
        </Column>
        <Column flex="2" alignItems="flex-end">
          <Badge
            colorScheme="green"
            variant="solid"
            alignItems="flex-end"
            _text={{ numberOfLines: 1 }}
          >
            {metaData.store.name}
          </Badge>
          <Text fontSize="xs" fontWeight="normal" color="muted.500">
            {dateCreated && (
              dateToDay(
                new Date(dateCreated.toString()!)
              ))}
          </Text>
          <Text fontSize="xs" fontWeight="normal" color="muted.500">
            {dateCreated &&
              dateToReadableTime(new Date(dateCreated.toString()!))}
          </Text>
        </Column>
        {status === NotificationStatus.UNREAD && (
          <Center
            width="2"
            height="2"
            backgroundColor="primary.700"
            borderRadius="full"
          />
        )}
      </Row>
      {changeStoreModal(modalContent, showChangeStoreModal, setShowChangeStoreModal)}
    </Pressable>
  );

}
export default memo(LowStockNotification);
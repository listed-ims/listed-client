import { ExpirationIcon } from "@listed-components/atoms";
import { useNotificationHandler } from "@listed-hooks";
import { NotificationResponse, NotificationStatus } from "@listed-types";
import { dateToDay, dateToMMDDYY, dateToReadableTime } from "@listed-utils";
import { Badge, Center, Column, IPressableProps, Pressable, Row, Text } from "native-base";
import { memo } from "react";

interface ExpirationNotificationProps extends IPressableProps {
  notificationDetails: NotificationResponse;
}

const ExpirationNotification = ({
  notificationDetails,
  ...props
}: ExpirationNotificationProps) => {
  const { metaData, status, dateCreated } = notificationDetails;

  const onPressCallback = () => {
    console.log("expiration notif")
    // TODO: route to a separate screen for expiration deets
  }

  const { handleOnPress } = useNotificationHandler(
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
          <ExpirationIcon />
        </Center>
        <Column alignItems="flex-start">
          <Text
            numberOfLines={1}
            fontSize="sm"
            fontWeight={
              status === NotificationStatus.UNREAD
                ? "semibold"
                : "normal"
            }
          >
            {`${metaData.quantity} ${metaData.product.unit} - ${metaData.product.name}`}
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
            {`Expires on ${dateToMMDDYY(
              new Date(metaData.expirationDate.toString()!)
            )}`}
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
    </Pressable>
  );

}
export default memo(ExpirationNotification);
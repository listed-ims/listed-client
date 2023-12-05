import { SmallMail } from "@listed-components/atoms";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useNotificationHandler } from "@listed-hooks";
import { MembershipStatus, NotificationResponse, NotificationStatus } from "@listed-types";
import { dateToDay, dateToReadableTime } from "@listed-utils";
import { router } from "expo-router";
import { Badge, Center, Column, IPressableProps, Pressable, Row, Text } from "native-base";
import { memo, useState } from "react";

interface InviteReplyNotificationProps extends IPressableProps {
  notificationDetails: NotificationResponse;
}

const InviteReplyNotification = ({
  notificationDetails,
  ...props
}: InviteReplyNotificationProps) => {
  const { userDetails } = useAuth();
  const { sender, metaData, status, dateCreated } = notificationDetails;
  const modalContent = {
    header: "Change Store",
    body: `This invite is from another store. Would you like to change your current store to ${metaData.store.name}?`
  }
  const [showChangeStoreModal, setShowChangeStoreModal] = useState(false)

  const onPressCallback = () => {
    if (metaData.status === MembershipStatus.ACTIVE) {
      if (metaData.store.id !== userDetails?.currentStoreId) {
        setShowChangeStoreModal(true);
      } else {
        router.push(`${Routes.COLLABORATORS}/${metaData.membershipId}`)
      }
    } else if (metaData.status === MembershipStatus.DECLINED) {
      // TODO: route to a separate screen for declined invite deets
      console.log("declined invite")
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
          <SmallMail />
        </Center>
        <Column flex="4" alignItems="flex-start">
          <Text
            numberOfLines={1}
            fontSize="sm"
            fontWeight={
              status === NotificationStatus.UNREAD ? "semibold" : "normal"
            }
          >
            {
              metaData.status === MembershipStatus.ACTIVE
                ? "New Collaborator"
                : "Invite Declined"
            }
          </Text>
          <Text
            fontSize="xs"
            color="muted.500"
            fontWeight={
              status === NotificationStatus.UNREAD ? "medium" : "normal"
            }
          >
            {`${metaData.invitee.name} ${metaData.status === MembershipStatus.ACTIVE ? "accepted" : "declined"
              } ${Number(sender.id) === userDetails?.id
                ? "your"
                : sender.name
              } invite.`}
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
export default memo(InviteReplyNotification);
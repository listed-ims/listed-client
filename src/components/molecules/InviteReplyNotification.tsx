import { SmallMail } from "@listed-components/atoms";
import { useAuth } from "@listed-contexts";
import { MembershipStatus, NotificationResponse, NotificationStatus } from "@listed-types";
import { dateToDay, dateToReadableTime } from "@listed-utils";
import { Badge, Center, Column, Row, Text } from "native-base";



interface InviteReplyNotificationProps {
  notificationDetails: NotificationResponse;
}

const InviteReplyNotification = ({
  notificationDetails: { id, sender, metaData, status, type, dateCreated }
}: InviteReplyNotificationProps) => {
  const { userDetails } = useAuth();

  return (
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
  );


}
export default InviteReplyNotification;
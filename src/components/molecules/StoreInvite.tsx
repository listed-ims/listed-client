import { Button, SmallMail } from "@listed-components/atoms"
import DeclineInviteModal from "./DeclineInviteModal";
import { GET_MEMBERSHIP, GET_STORES, GET_USER } from "@listed-constants";
import { useUpdateUserMembershipStatusMutation } from "@listed-hooks";
import { MembershipResponse, MembershipStatus, StoreResponse } from "@listed-types"
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Center, Column, Row, Text } from "native-base"
import { useState } from "react";
import { useAuth } from "@listed-contexts";

interface StoreInviteProps {
  storeDetails: StoreResponse;
  storeMembership: MembershipResponse
}

const StoreInvite = ({ storeDetails, storeMembership }: StoreInviteProps) => {
  const [showDeclineInviteModal, setShowDeclineInviteModal] = useState(false)
  const queryClient = useQueryClient();
  const { setUserMembership } = useAuth();

  const handleAccept = () => {
    if (storeMembership) {
      updateMembership([
        storeMembership?.id,
        MembershipStatus.ACTIVE
      ])
    }
  }

  const handleDecline = () => {
    if (storeMembership) {
      updateMembership([
        storeMembership?.id,
        MembershipStatus.DECLINED
      ])
    }
  }

  const {
    mutate: updateMembership,
    isLoading: updateMembershipLoading,
    isError: updateMembershipError,
  } = useUpdateUserMembershipStatusMutation({
    onSuccess: (data) => {
      if (data.membershipStatus === MembershipStatus.ACTIVE) {
        queryClient.invalidateQueries([GET_MEMBERSHIP, {
          storeId: storeDetails?.id,
          userId: storeMembership?.user.id,
        }])
      } else {
        queryClient.invalidateQueries([GET_STORES])
        queryClient.setQueryData([GET_MEMBERSHIP], undefined)
        setUserMembership(undefined)
        queryClient.setQueryData([GET_USER], data.user)

        router.back()
      }
    }
  })


  return (
    <Column>
      <Column backgroundColor="primary.700"
        alignItems="center"
        space="1"
        borderRadius="lg"
        padding="4">
        <Row space="1">
          <Center backgroundColor="white"
            width="6"
            height="6"
            borderRadius="full">
            <SmallMail />
          </Center>
          <Text color="white"
            fontWeight="semibold">
            You got an invite.
          </Text>
        </Row>
        <Text color="white">
          {storeDetails?.owner.name} invited you to join this store.
        </Text>
        <Row space="4" marginTop="2">
          <Button variant="white"
            onPress={handleAccept}
            flex="1">
            ACCEPT
          </Button>
          <Button variant="whiteOutline"
            onPress={() => setShowDeclineInviteModal(true)}
            flex="1">
            DECLINE
          </Button>
        </Row>
      </Column>
      <DeclineInviteModal
        isOpen={showDeclineInviteModal}
        onConfirm={handleDecline}
        onCancel={() => setShowDeclineInviteModal(false)}
      />
    </Column>
  )
}

export default StoreInvite
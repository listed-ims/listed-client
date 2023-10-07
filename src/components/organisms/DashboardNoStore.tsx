import {
  AddStoreIcon,
  Button,
  MailIcon,
  StoreIcon,
} from "@listed-components/atoms";
import {
  CreateStoreButton,
  DeclineInviteModal,
} from "@listed-components/molecules";
import { GET_MEMBERSHIP, Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import {
  useGetStoreDetails,
  useUpdateUserMembershipStatusMutation,
} from "@listed-hooks";
import { MembershipStatus } from "@listed-types";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { Box, Center, Column, Heading, Row, Text } from "native-base";
import { useState } from "react";

const DashboardNoStore = () => {
  const { userMembership, setUserMembership, userDetails } = useAuth();
  const [showDeclineInviteModal, setShowDeclineInviteModal] = useState(false);
  const queryClient = useQueryClient();

  const handleAccept = () => {
    if (userMembership) {
      updateMembership([userMembership?.id, MembershipStatus.ACTIVE]);
    }
  };

  const handleDecline = () => {
    if (userMembership) {
      updateMembership([userMembership?.id, MembershipStatus.DECLINED]);
    }
  };

  const {
    mutate: updateMembership,
    isLoading: updateMembershipLoading,
    isError: updateMembershipError,
  } = useUpdateUserMembershipStatusMutation({
    onSuccess: (data) => {
      setUserMembership(data);
      if (data.membershipStatus !== MembershipStatus.DECLINED) {
        queryClient.invalidateQueries([GET_MEMBERSHIP]);
        router.replace(Routes.HOME);
      }
    },
  });

  const { data: storeDetails } = useGetStoreDetails(
    userDetails?.currentStoreId
  );

  return (
    <Column>
      <Text paddingTop="6" fontWeight="medium" fontSize="md">
        <Text color="muted.400">Welcome </Text>
        {userDetails?.username}!
      </Text>
      <Text fontSize="xl" fontWeight="bold" textAlign="center" paddingTop="8">
        There’s nothing here yet.
      </Text>
      <Center paddingY="6">
        <AddStoreIcon />
      </Center>
      <CreateStoreButton
        onPress={() => {
          router.push(Routes.NEW_STORE);
        }}
      />
      {userMembership?.membershipStatus === MembershipStatus.PENDING && (
        <Column
          borderRadius="lg"
          borderColor="primary.700"
          borderWidth="1"
          alignItems="center"
          padding="4"
          marginTop="8"
        >
          <Center
            width="10"
            height="10"
            backgroundColor="primary.700"
            borderRadius="full"
            marginBottom="1"
          >
            <MailIcon />
          </Center>
          <Heading fontSize="md">You got an invite.</Heading>
          <Box marginY="4">
            <Text>{storeDetails?.owner.name} invited you to join</Text>
            <Row
              alignItems="center"
              justifyContent="center"
              space="2"
              marginTop="2"
            >
              <StoreIcon />
              <Text fontWeight="bold">{storeDetails?.name}</Text>
            </Row>
          </Box>
          <Row width="full" justifyContent="center" space="4" paddingTop="2">
            <Button flex="1" onPress={handleAccept}>
              ACCEPT
            </Button>
            <Button
              flex="1"
              variant="outline"
              onPress={() => setShowDeclineInviteModal(true)}
            >
              DECLINE
            </Button>
          </Row>
        </Column>
      )}
      <DeclineInviteModal
        onConfirm={handleDecline}
        onCancel={() => setShowDeclineInviteModal(false)}
        isOpen={showDeclineInviteModal}
      />
    </Column>
  );
};

export default DashboardNoStore;

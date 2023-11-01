import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { Badge, Column, Heading, VStack, Text, ScrollView } from "native-base";
import {
  StoreSummaryCard,
  MakeCurrentStoreCard,
  ScreenContainer,
  CurrentStoreModal,
} from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import {
  useGetStoreDetails,
  useUpdateUserMutation,
  useGetUserMembership,
} from "@listed-hooks";
import {
  GET_MEMBERSHIP,
  GET_STORE,
  GET_STORES,
  GET_USER,
  Routes,
} from "@listed-constants";
import { useQueryClient } from "@tanstack/react-query";
import { StoreDetailsIcon } from "@listed-components/atoms";
import { stackHeaderStyles } from "@listed-styles";
import {
  MembershipStatus,
  UserPermission,
  UserRequest,
  UserResponse,
} from "@listed-types";
import { StoreInvite } from "@listed-components/molecules";
import { ownerOrCollaborator } from "@listed-utils";

const StoreDetails = () => {
  const queryClient = useQueryClient();
  const [showCurrentStoreModal, setShowCurrentStoreModal] = useState(false);
  const { userDetails, setUserDetails, setUserMembership } = useAuth();
  const { id } = useLocalSearchParams();

  const {
    data: storeDetails,
    isError: storeError,
    isFetching: storeFetching,
  } = useGetStoreDetails(parseInt(id as string));

  const {
    data: storeMembership,
    isFetching: storeMembershipFetching,
    error: storeMembershipErrorDetails,
  } = useGetUserMembership(parseInt(id as string));

  const handleOnMakeCurrent = () => {
    updateUser({
      name: userDetails?.name,
      username: userDetails?.username,
      password: "string",
      currentStoreId: storeDetails?.id,
    } as UserRequest);
  };

  const {
    data: updatedUser,
    mutate: updateUser,
    isError: updateUserError,
    isLoading: updateUserLoading,
  } = useUpdateUserMutation({
    onSuccess: (data) => {
      setUserDetails({
        ...userDetails,
        currentStoreId: data.currentStoreId,
      } as UserResponse);
      queryClient.setQueryData([GET_USER], {
        ...userDetails,
        currentStoreId: data.currentStoreId,
      } as UserResponse);
      queryClient.invalidateQueries({
        queryKey: [GET_MEMBERSHIP],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_STORE, data.currentStoreId],
      });
      queryClient.invalidateQueries({ queryKey: [GET_STORES] });
      setShowCurrentStoreModal(true);
    },
    onError: (error) => {
      console.log("Make store current error.");
      console.error({ ...error });
    },
  });

  const { data: userMembership, isSuccess: userMembershipSuccess } =
    useGetUserMembership(updatedUser?.currentStoreId!);

  useEffect(() => {
    if (userMembershipSuccess) {
      setUserMembership(userMembership);
    }
  }, [userMembership]);

  useEffect(() => {
    if (storeMembershipErrorDetails?.response?.status === 404) {
      router.replace(Routes.COLLABORATOR_NOT_FOUND);
    }
  }, [storeMembershipErrorDetails]);

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Store Details")} />
      {storeMembershipFetching || storeFetching ? (
        <Text>Loading... </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column space="4" height="full" py="6">
            <VStack space="1" alignItems="center">
              <StoreDetailsIcon />
              <Heading size="md">{storeDetails?.name}</Heading>
              {storeDetails?.id === userDetails?.currentStoreId &&
                storeMembership?.membershipStatus !==
                MembershipStatus.PENDING && (
                  <Badge colorScheme="success" variant="solid">
                    CURRENT STORE
                  </Badge>
                )}
              {storeMembership?.membershipStatus !==
                MembershipStatus.PENDING && (
                  <Text fontSize="xs" fontWeight="medium" color="darkText">
                    {`${userDetails?.name}, you are ${ownerOrCollaborator(storeMembership?.permissions || []) ===
                      UserPermission.OWNER
                      ? "the owner"
                      : "a collaborator"
                      }!`}
                  </Text>
                )}
            </VStack>
            {storeMembership?.membershipStatus === MembershipStatus.PENDING && (
              <StoreInvite
                storeDetails={storeDetails!}
                storeMembership={storeMembership!}
              />
            )}
            <StoreSummaryCard
              store={storeDetails!}
              isInvite={
                storeMembership?.membershipStatus === MembershipStatus.PENDING
              }
            />
            {storeDetails?.id !== userDetails?.currentStoreId &&
              storeMembership?.membershipStatus !==
              MembershipStatus.PENDING && (
                <MakeCurrentStoreCard onMakeCurrent={handleOnMakeCurrent} />
              )}
          </Column>
        </ScrollView>
      )}
      <CurrentStoreModal
        name={storeDetails?.name}
        onClose={() => setShowCurrentStoreModal(false)}
        isOpen={showCurrentStoreModal}
      />
    </ScreenContainer>
  );
};

export default StoreDetails;

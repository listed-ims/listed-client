import React, { useEffect, useState } from "react";
import { Redirect, Stack, useLocalSearchParams } from "expo-router";
import { Badge, Column, Heading, VStack, Text, ScrollView } from "native-base";
import {
  StoreSummaryCard,
  MakeCurrentStoreCard,
  CloseStoreCard,
  ScreenContainer,
  CurrentStoreModal,
} from "@listed-components/organisms";
import { useAuth } from "@listed-contexts";
import {
  useGetStoreDetails,
  useCloseStoreMutation,
  useUpdateUserMutation,
  useGetUserMembership,
} from "@listed-hooks";
import CloseStoreModal from "@listed-components/organisms/CloseStoreModal";
import {
  GET_MEMBERSHIP,
  GET_STORE,
  GET_STORES,
  GET_USER,
  StoreStatus,
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
  const [showCloseStoreModal, setShowCloseStoreModal] = useState(false);
  const { userDetails, setUserDetails, setUserMembership } = useAuth();
  const { id } = useLocalSearchParams();

  const {
    data: storeDetails,
    isError: storeError,
    isFetching: storeFetching,
  } = useGetStoreDetails(parseInt(id as string));

  const { data: storeMembership } = useGetUserMembership(
    parseInt(id as string),
    userDetails?.id!
  );

  const handleOnMakeCurrent = () => {
    updateUser({
      name: userDetails?.name,
      username: userDetails?.username,
      password: "string",
      currentStoreId: storeDetails?.id,
    } as UserRequest);
  };

  const handleOnCloseStore = () => {
    closeStore({
      id: storeDetails?.id,
      storeRequest: {
        name: storeDetails?.name,
        status: StoreStatus.CLOSED,
      },
    });
  };

  const {
    mutate: closeStore,
    isError: closeStoreError,
    isLoading: closeStoreLoading,
  } = useCloseStoreMutation({
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [GET_STORES] });
      queryClient.setQueryData([GET_STORE, data.id], data);
      if (data.id === userDetails?.currentStoreId)
        queryClient.invalidateQueries([GET_USER]);
      setShowCloseStoreModal(false);
    },
    onError: (error) => {
      console.log("Close store error.");
      console.error({ ...error });
    },
  });

  const {
    data: newCurrentStore,
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
    useGetUserMembership(newCurrentStore?.currentStoreId!, userDetails?.id!);

  useEffect(() => {
    if (userMembershipSuccess) {
      setUserMembership(userMembership);
    }
  }, [userMembership]);

  if(storeDetails === undefined)
    return <Redirect href={""} />

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Store Details")} />
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
            {storeMembership?.membershipStatus !== MembershipStatus.PENDING && (
              <Text fontSize="xs" fontWeight="medium" color="darkText">
                {`${userDetails?.name}, you are ${
                  ownerOrCollaborator(storeMembership?.permissions || []) ===
                  UserPermission.OWNER
                    ? "the owner"
                    : "a collaborator"
                }!`}
              </Text>
            )}
          </VStack>
          {storeMembership?.membershipStatus !== MembershipStatus.PENDING ? (
            <>
              <StoreSummaryCard
                owner={storeDetails?.owner.name}
                status={storeDetails?.status}
                totalProducts={storeDetails?.totalProducts}
                totalPriceValue={storeDetails?.totalPriceValue}
                isInvite={false}
              />
              {storeDetails?.id !== userDetails?.currentStoreId &&
                storeDetails?.status === StoreStatus.OPEN && (
                  <MakeCurrentStoreCard onMakeCurrent={handleOnMakeCurrent} />
                )}
              {storeDetails?.status === StoreStatus.OPEN &&
                ownerOrCollaborator(storeMembership?.permissions || []) ===
                  UserPermission.OWNER && (
                  <CloseStoreCard
                    onClose={() => setShowCloseStoreModal(true)}
                  />
                )}
            </>
          ) : (
            <StoreInvite
              storeDetails={storeDetails!}
              storeMembership={storeMembership!}
            />
          )}
        </Column>
      </ScrollView>
      <CurrentStoreModal
        name={storeDetails?.name}
        onClose={() => setShowCurrentStoreModal(false)}
        isOpen={showCurrentStoreModal}
      />
      <CloseStoreModal
        onClose={() => setShowCloseStoreModal(false)}
        isOpen={showCloseStoreModal}
        onCloseStore={handleOnCloseStore}
      />
    </ScreenContainer>
  );
};

export default StoreDetails;

import React, { useCallback } from "react";
import { Box, Column, FlatList, HStack, Text, useTheme } from "native-base";
import { Stack, router } from "expo-router";
import { NoStoreFound, ScreenContainer } from "@listed-components/organisms";
import { AddIcon, Button } from "@listed-components/atoms";
import {
  StoreListItem,
  StoreListLoadingSkeleton,
} from "@listed-components/molecules";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetStoreList } from "@listed-hooks";
import { MembershipStatus, StoreResponse } from "@listed-types";

const Stores = () => {
  const { colors } = useTheme();
  const { userDetails, userMembership } = useAuth();

  const {
    data: storeList,
    isError: storeListError,
    isFetching: storeListFetching,
  } = useGetStoreList(
    1,
    100
  );

  const data = storeList?.sort((a, b) => {
    if (a.id === userDetails?.currentStoreId) return -1;
    if (b.id === userDetails?.currentStoreId) return 1;
    return 0;
  });

  const renderItem = useCallback((
    { item }: { item: StoreResponse }
  ) => (
    <StoreListItem
      storeId={item.id}
      userId={userDetails?.id}
      name={item.name}
      current={userDetails?.currentStoreId === item.id && userMembership?.membershipStatus !== MembershipStatus.PENDING}
      onPress={() => {
        router.push(`${Routes.STORES}/${item.id}}`);
      }}
    />
  ), [])

  const emptyList = storeListFetching
    ? <StoreListLoadingSkeleton />
    : <NoStoreFound />

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Column space="4" height="full" py="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Stores
          </Text>
          {storeList && storeList.length > 0 ? (
            <Button
              size="sm"
              px="4"
              startIcon={<AddIcon color={colors.white} />}
              borderRadius="full"
              onPress={() => {
                router.push(Routes.NEW_STORE);
              }}
            >
              Add Store
            </Button>
          ) : undefined}
        </HStack>
        <Box flex={1}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={emptyList}
            data={data}
            renderItem={renderItem}
          />
        </Box>

      </Column>
    </ScreenContainer>
  );
};

export default Stores;

import React, { useState } from "react";
import { Box, Column, FlatList, HStack, Text, useTheme } from "native-base";
import { Stack, router } from "expo-router";
import { ScreenContainer } from "@listed-components/organisms";
import { AddIcon, Button } from "@listed-components/atoms";
import {
  StoreListFilterGroup,
  StoreListItem,
} from "@listed-components/molecules";
import { Routes, StoreStatus } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetStoreList } from "@listed-hooks";

const Stores = () => {
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

  const { userDetails } = useAuth();

  const {
    data: storeList,
    isError: storeListError,
    isFetching: storeListFetching,
  } = useGetStoreList(
    filter === "all"
      ? undefined
      : filter === "open"
      ? StoreStatus.OPEN
      : StoreStatus.CLOSED,
    1,
    100
  );

  const {colors} = useTheme();

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Column space="4" height="full" py="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Stores
          </Text>
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
        </HStack>
        <StoreListFilterGroup
          filter={filter}
          handleSetFilter={(filter) => setFilter(filter)}
        />
        <Box flex={1}>
          <FlatList
            data={storeList?.sort((a, b) => {
              if (a.id === userDetails?.currentStoreId) return -1;
              if (b.id === userDetails?.currentStoreId) return 1;
              return 0;
            })}
            renderItem={({ item }) => (
              <StoreListItem
                name={item.name}
                userRole={"Owner"}
                status={item.status == "OPEN" ? "open" : "closed"}
                current={userDetails?.currentStoreId === item.id}
                onPress={() => {
                  router.push(`${Routes.STORES}/${item.id}}`);
                }}
              />
            )}
          />
        </Box>
      </Column>
    </ScreenContainer>
  );
};

export default Stores;

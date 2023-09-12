import React, { useEffect, useState } from "react";
import { Box, Column, FlatList, HStack, Text } from "native-base";
import { Stack, router } from "expo-router";
import { ScreenContainer } from "@listed-components/organisms";
import { AddIcon, Button } from "@listed-components/atoms";
import { StoreListFilterGroup, StoreListItem } from "@listed-components/molecules";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";

// to be deleted
// mock-data
const mockData = [
  { id: 1, name: "Mueller-Fisher", status: "OPEN", role: "Owner" },
  { id: 2, name: "Kshlerin-Rutherford", status: "OPEN", role: "Collaborator" },
  { id: 3, name: "Rogahn-Kohler", status: "CLOSED", role: "Collaborator" },
  { id: 5, name: "Jaskolski-Waelchi", status: "OPEN", role: "Collaborator" },
  { id: 6, name: "Ratke and Sons", status: "CLOSED", role: "Owner" },
  { id: 7, name: "Gulgowski, Kiehn and Bruen", status: "OPEN", role: "Owner" },
  { id: 8, name: "Nicolas-Barrows", status: "OPEN", role: "Collaborator" },
  { id: 9, name: "Jakubowski LLC", status: "CLOSED", role: "Collaborator" },
  { id: 10, name: "Mertz LLC", status: "OPEN", role: "Collaborator" },
];

const Stores = () => {
  const [stores, setStores] = useState(mockData);
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

  const { userDetails } = useAuth();

  useEffect(() => {
    console.log({ ...userDetails })
  }, [])

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
            startIcon={<AddIcon />}
            borderRadius="full"
            onPress={() => { router.push(Routes.NEW_STORE) }}
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
            data={stores}
            renderItem={({ item, index }) => (
              <StoreListItem
                key={item.id}
                name={item.name}
                userRole={item.role}
                status={item.status == "OPEN" ? "open" : "closed"}
                current={index == 0}
                onPress={() => { router.push(`${Routes.STORES}/1}`) }}
              />
            )}
          />
        </Box>
      </Column>
    </ScreenContainer>
  );
};

export default Stores;

import React, { useState } from "react";
import { Box, Column, FlatList, HStack, Text } from "native-base";
import {
  AddIcon,
  Button,
  ScreenContainer,
  StoreListFilterGroup,
  StoreListItem,
} from "@listed-components";
import { Stack, router } from "expo-router";

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
            onPress={() => { router.push("/stores/new") }}
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
                name={item.name}
                userRole={item.role}
                status={item.status == "OPEN" ? "open" : "closed"}
                current={index == 0}
                onPress={() => { }}
              />
            )}
          />
        </Box>
      </Column>
    </ScreenContainer>
  );
};

export default Stores;

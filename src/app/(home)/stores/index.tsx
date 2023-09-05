import React, { useState } from "react";
import { Box, Column, FlatList, HStack, Text } from "native-base";
import {
  AddIcon,
  Button,
  FilterButton,
  ClearFilterIcon,
  ScreenContainer,
  StoreListItem,
} from "@listed-components";
import { Stack } from "expo-router";
import Animated, {
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

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
  const [filter, setFilter] = useState("all");

  const clearFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "all"
          ? withDelay(250, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all" ? withDelay(200, withTiming(-40)) : withTiming(0),
        },
      ],
    };
  }, [filter]);

  const openFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "closed"
          ? withDelay(300, withTiming(1, { duration: 100 }))
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "open"
              ? withTiming(0)
              : withTiming(-72),
        },
      ],
      zIndex: filter === "closed" ? -1 : 0,
    };
  }, [filter]);

  const closedFilterAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        filter !== "open"
          ? withTiming(1, { duration: 100 })
          : withTiming(0, { duration: 100 }),
      transform: [
        {
          translateX:
            filter === "all"
              ? withTiming(-40)
              : filter === "open"
              ? withTiming(0)
              : withTiming(-72),
        },
      ],
    };
  }, [filter]);

  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Column space="4" height="full" pt="4">
        <HStack justifyContent="space-between" alignItems="center">
          <Text fontSize="xl" fontWeight="semibold">
            Stores
          </Text>
          <Button
            size="sm"
            px="4"
            startIcon={<AddIcon />}
            borderRadius="full"
            onPress={() => {}}
          >
            Add Store
          </Button>
        </HStack>

        <HStack space="2">
          <Animated.View style={[clearFilterAnimatedStyle]}>
            <ClearFilterIcon
              onPress={() => {
                setFilter("all");
              }}
              disabled={filter === "all"}
            />
          </Animated.View>
          <Animated.View style={[openFilterAnimatedStyle]}>
            <FilterButton
              label="open"
              state={filter === "open" ? "active" : "inactive"}
              onPress={() => {
                setFilter("open");
              }}
              disabled={filter === "closed"}
            />
          </Animated.View>
          <Animated.View style={[closedFilterAnimatedStyle]}>
            <FilterButton
              label="closed"
              state={filter === "closed" ? "active" : "inactive"}
              onPress={() => {
                setFilter("closed");
              }}
              disabled={filter === "open"}
            />
          </Animated.View>
        </HStack>

        <Box flex={1}>
          <FlatList
            data={stores}
            renderItem={({ item, index }) => (
              <StoreListItem
                name={item.name}
                userRole={item.role}
                status={item.status == "OPEN" ? "open" : "closed"}
                current={index == 0}
                onPress={() => {}}
              />
            )}
          />
        </Box>
      </Column>
    </ScreenContainer>
  );
};

export default Stores;

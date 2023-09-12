import React from "react";
import { Stack, router } from "expo-router";
import { Column, Text, HStack } from "native-base";
import { ScreenContainer } from "@listed-components/organisms";
import { BackIcon, Button, NewStoreIcon } from "@listed-components/atoms";
import { FormControl, TextField } from "@listed-components/molecules";


const NewStore = () => {
  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          headerBackVisible: false,
          headerShown: true,
          title: "",
          headerShadowVisible: false,
          headerLeft: () => <BackIcon onPress={() => router.back()} />,
        }}
      />
      <Column space="6" height="full" pb="6">
        <HStack py="4">
          <Text fontSize="xl" fontWeight="semibold">
            New Store
          </Text>
        </HStack>
        <HStack justifyContent="center">
          <NewStoreIcon />
        </HStack>
        <HStack flex="1">
          <FormControl label="Store name">
            <TextField placeholder="Enter store name" />
          </FormControl>
        </HStack>
        <Button size="lg">CREATE STORE</Button>
      </Column>
    </ScreenContainer>
  );
};

export default NewStore;

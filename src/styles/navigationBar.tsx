import { BackIcon } from "@listed-components/atoms";
import { Stack, router } from "expo-router";
import { HStack } from "native-base";
import { Text } from "native-base";
import { ComponentProps } from "react";


export const stackHeaderStyles = (headerTitle?: string): ComponentProps<typeof Stack.Screen>["options"] => {
  return {
    animation: "slide_from_right",
    headerBackVisible: false,
    headerShown: true,
    title: "",
    headerShadowVisible: true,
    headerLeft: () => (
      <HStack space="4" alignItems="center">
        <BackIcon onPress={() => router.back()} />
        {
          headerTitle ?
            <Text fontSize="sm" fontWeight="semibold">
              {headerTitle?.toString()}
            </Text>
            : undefined
        }
      </HStack>
    ),
  };
};

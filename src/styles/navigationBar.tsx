import { BackIcon } from "@listed-components/atoms";
import { toTitleCase } from "@listed-utils";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { router } from "expo-router";
import { HStack, useTheme } from "native-base";
import { Text } from "native-base";
import { ReactNode } from "react";

const getTabBarLabel = (name: string, color: string) => {
  const tabLabel = name === "index" ? "home" : name;
  return (
    <Text
      fontSize="xs"
      fontWeight="medium"
      color={color}
    >
      {toTitleCase(tabLabel)}
    </Text>
  );
};

export const stackHeaderStyles = (headerTitle?: string): NativeStackNavigationOptions => {
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

export const tabBarStyles = (
  route: RouteProp<ParamListBase, string>
): BottomTabNavigationOptions => {
  const { colors } = useTheme();
  return {
    headerShown: false,
    tabBarStyle: {
      height: 56,
      paddingBottom: 8,
      paddingTop: 8,
    },
    tabBarActiveTintColor: colors.primary[700],
    tabBarInactiveTintColor: colors.black,
    tabBarLabel: ({ color }) => {
      return getTabBarLabel(route.name, color);
    }
  };
};

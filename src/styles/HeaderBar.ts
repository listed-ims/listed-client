import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";

const commonHeaderStyles: any = {
  headerStyle: {
    backgroundColor: "#fff",
  },
  headerTintColor: "#000",
  headerTitleStyle: {
    fontWeight: "500",
    fontSize: 16,
  },
  headerTitleAlign: "center",
};

export const stackHeaderStyles: NativeStackNavigationOptions = {
  ...commonHeaderStyles,
  headerBackVisible: true,
  animation: "slide_from_right",
};

export const tabHeaderStyles: BottomTabNavigationOptions = {
  ...commonHeaderStyles,
};

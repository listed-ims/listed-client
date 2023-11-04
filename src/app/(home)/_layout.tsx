import React from 'react'
import { Stack, Tabs } from 'expo-router';
import { AccountIcon, HomeIcon, NotificationsIcon, StoresIcon } from '@listed-components/atoms';
import { useTheme, Text } from 'native-base';
import { toTitleCase } from '@listed-utils';
import { Platform, Pressable } from 'react-native';


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

const HomeTabsNav = () => {
  const { colors } = useTheme();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs screenOptions={
        ({ route }) => {
          return {
            headerShown: false,
            tabBarStyle: {
              height: 56,
            },
            tabBarActiveTintColor: colors.primary[700],
            tabBarInactiveTintColor: colors.black,
            tabBarLabel: ({ color }) => {
              return getTabBarLabel(route.name, color);
            },
            detachInactiveScreens: true,
            tabBarButton: (props) => (
              <Pressable
                {...props}
                android_ripple={{ color: colors.muted[200], radius: 48 }}
                style={({ pressed }) => [
                  {
                    paddingTop: 8,
                    paddingBottom: 8,
                    borderColor: colors.muted[200],
                    opacity: Platform.OS === 'ios' ? (pressed ? 0.6 : 1) : 1
                  },
                  props.style,
                ]}
              />
            ),

          };
        }
      }>
        <Tabs.Screen name="home"
          options={{
            tabBarIcon: ({ focused }) => <HomeIcon selected={focused} />
          }} />
        <Tabs.Screen name="stores"
          options={{
            tabBarIcon: ({ focused }) => <StoresIcon selected={focused} />
          }} />
        <Tabs.Screen name="notifications"
          options={{
            tabBarIcon: ({ focused }) =>
              <NotificationsIcon selected={focused} />
          }} />
        <Tabs.Screen name="account"
          options={{
            tabBarIcon: ({ focused }) =>
              <AccountIcon selected={focused} color={colors.primary[700]} />
          }} />
      </Tabs >
    </>
  )
}

export default HomeTabsNav
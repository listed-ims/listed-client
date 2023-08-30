import React from 'react'
import { Tabs } from 'expo-router';
import { Text } from 'native-base';
import { toTitleCase } from '@listed-utils'
import { AccountIcon, HomeIcon, NotificationsIcon, StoresIcon } from '@listed-components';
import { tabHeaderStyles } from '@listed-styles';


const HomeTabsNav = () => {

  const getTabBarLabel = (name: string, color: string) => {
    const tabLabel = name === "index" ? "home" : name
    return (
      <Text fontSize="xs" fontWeight="medium"
        color={color}>
        {toTitleCase(tabLabel)}
      </Text>
    )
  }

  return (
    <Tabs screenOptions={
      ({ route }) => ({
        ...tabHeaderStyles,
        tabBarActiveTintColor: "primary.700",
        tabBarInactiveTintColor: "black",
        tabBarLabel: ({ color }) => { return getTabBarLabel(route.name, color) },
        headerShown: false,
        tabBarStyle: {
          height: 56,
          paddingBottom: 8,
          paddingTop: 8,
        }
      })}>
      <Tabs.Screen name="index"
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
            <AccountIcon selected={focused} />
        }} />
    </Tabs>
  )
}

export default HomeTabsNav
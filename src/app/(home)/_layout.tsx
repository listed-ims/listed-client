import React from 'react'
import { Tabs } from 'expo-router';
import { tabHeaderStyles } from '../../styles/headerBar';
import { Text } from 'native-base';
import AccountIcon from '../../components/atoms/AccountIcon';
import HomeIcon from '../../components/atoms/HomeIcon';
import NotificationsIcon from '../../components/atoms/NotificationsIcon';
import StoresIcon from '../../components/atoms/StoresIcon';
import capitalize from '../../utils/capitalize';


const HomeTabsNav = () => {

  const getTabBarLabel = (name: string, color: string) => {
    if (name === "index") {
      name = "home"
    }
    return (
      <Text fontSize="xs" fontWeight="medium"
        color={color}>
        {capitalize(name)}
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
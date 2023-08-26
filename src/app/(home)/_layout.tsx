import React from 'react'
import { Tabs } from 'expo-router';
import { tabHeaderStyles } from '../../styles/headerBar';
import { Text } from 'native-base';
import HomeIcon from '../../assets/icons/HomeIcon';
import StoresIcon from '../../assets/icons/StoresIcon';
import NotificationsIcon from '../../assets/icons/NotificationsIcon';
import AccountIcon from '../../assets/icons/AccountIcon';


const HomeStack = () => {

  const getTabBarLabel = (name: string, color: string) => {
    if (name === "index") {
      name = "home"
    }
    return (
      <Text fontSize="xs" fontWeight="medium"
        color={color}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
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

export default HomeStack
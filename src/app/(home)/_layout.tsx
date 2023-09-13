import React from 'react'
import { Stack, Tabs } from 'expo-router';
import { AccountIcon, HomeIcon, NotificationsIcon, StoresIcon } from '@listed-components/atoms';
import { tabBarStyles } from '@listed-styles';


const HomeTabsNav = () => {

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs screenOptions={
        ({ route }) => (
          tabBarStyles(route)
        )}>
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
              <AccountIcon selected={focused} />
          }} />
      </Tabs>
    </>
  )
}

export default HomeTabsNav
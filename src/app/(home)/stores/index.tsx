import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';



const Stores = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
      <Stack.Screen options={{ headerShown: true }} />
      <Text>Stores</Text>
      <Text>{tabBarHeight}</Text>
    </View>
  )
}

export default Stores
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const Products = () => {
  return (
    <View>
      <Stack.Screen options={{ headerShown: true }} />
      <Text>Products</Text>
    </View>
  )
}

export default Products
import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import StoresIcon from '../../../assets/icons/StoresIcon'
import HomeIcon from '../../../assets/icons/HomeIcon'
import AccountIcon from '../../../assets/icons/AccountIcon'
import { HStack, Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';



const Stores = () => {
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View>
      <Stack.Screen options={{ headerShown: true }} />
      <Text>Stores</Text>
      <Text>{tabBarHeight}</Text>
      <HStack>
        <StoresIcon selected />
        <HomeIcon selected={false} />
        <Icon as={Ionicons}
          name={"person-outline"}
          color={"black"}
          size={6}
        />
        <AccountIcon selected={false} />
      </HStack>
    </View>
  )
}

export default Stores
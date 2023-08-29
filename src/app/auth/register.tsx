import React from 'react'
import { Button, Text } from 'native-base'
import ScreenContainer from '../../layout/ScreenContainer'
import { Stack, router } from 'expo-router'


const Registration = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text fontSize="xs">Registration</Text>
      <Button
        onPress={() => router.push("/auth/login")}>
        Registration
      </Button>
    </ScreenContainer>
  )
}

export default Registration
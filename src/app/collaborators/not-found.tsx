import React from 'react'
import { ScreenContainer } from '@listed-components/organisms'
import { Stack, router } from 'expo-router'
import { Column, View, Text } from 'native-base'
import { Button, LargeNotFound } from '@listed-components/atoms'

const MembershipNotFound = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ presentation: "modal", headerShown: false, animation: "none" }} />
      <Column
        flex="1"
        alignItems="center"
        justifyContent="center">
        <LargeNotFound />
        <Text fontWeight="semibold" fontSize="lg">Invite Not Found</Text>
        <Text fontSize="xs">This invite no longer exists.</Text>
        <View paddingY="4" width="full">
          <Button width="full"
            onPress={() => router.back()}
          >BACK</Button>
        </View>
      </Column>
    </ScreenContainer>
  )
}

export default MembershipNotFound
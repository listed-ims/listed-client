import React from 'react'
import { Stack, router } from 'expo-router'
import { ScreenContainer } from '@listed-components/organisms'
import { Column, Text, View } from 'native-base'
import { Button, LargeNotFound } from '@listed-components/atoms'

const ProductNotFound = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ presentation: "modal", headerShown: false, animation: "none" }} />
      <Column
        flex="1"
        alignItems="center"
        justifyContent="center">
        <LargeNotFound />
        <Text fontWeight="semibold" fontSize="lg">Product Not Found</Text>
        <Text fontSize="xs">This product no longer exists.</Text>
        <View paddingY="4" width="full">
          <Button width="full"
            onPress={() => router.back()}
          >BACK</Button>
        </View>
      </Column>
    </ScreenContainer>
  )
}

export default ProductNotFound
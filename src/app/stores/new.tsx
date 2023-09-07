import React from 'react'
import { Stack, router } from 'expo-router'
import { Column, View, Text, HStack } from 'native-base'
import { BackIcon, Button, FormControl, NewStoreIcon, ScreenContainer, TextField } from '@listed-components'

const CreateStore = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ 
        headerBackVisible: false,
        headerShown: true,
        title: "",
        headerShadowVisible: false,
        headerLeft: () => (
          <BackIcon onPress={() => router.back()}/>
        )
      }} />
      <Column space="6" height="full">
        <HStack py="4"> 
          <Text fontSize="xl" fontWeight="semibold">New Store</Text>
        </HStack>
        <HStack justifyContent="center">
          <NewStoreIcon />
        </HStack>
        <HStack flex="1">
          <FormControl
            label="Store name"
          >
            <TextField
              placeholder="Enter store name"
            />
          </FormControl>
        </HStack>
        <Button size="lg">CREATE STORE</Button>
      </Column>
    </ScreenContainer>
  )
}

export default CreateStore
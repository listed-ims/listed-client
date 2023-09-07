import React from 'react'
import { Button, Row, Text, View } from 'native-base'
import { Stack, router } from 'expo-router'
import { MainButtons, ScreenContainer, SummaryCard, TransactionButton } from '@listed-components'


const Registration = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text fontSize="xs">Registration</Text>
      <Button
        onPress={() => router.push("/")}>
        Registration
      </Button>
      <View marginY={4} />
      <SummaryCard totalRevenue='1000' totalItemsSold='100' />
      <View marginY={4} />
      <Row width="full" space="4">
        <TransactionButton flex="1" type="incoming" />
        <TransactionButton flex="1" type="outgoing" />
      </Row>
      <View marginY={4} />
      <Row width="full" space="2" >
        <MainButtons flex="1" type="inventory" />
        <MainButtons flex="1" type="products" />
        <MainButtons flex="1" type="collaborators" />
        <MainButtons flex="1" type="transactions" />
      </Row>
    </ScreenContainer>
  )
}

export default Registration
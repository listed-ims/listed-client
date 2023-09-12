import React from 'react'
import { Button, Row, ScrollView, Text, View } from 'native-base'
import { Stack, router } from 'expo-router'
import { ScreenContainer } from '@listed-components/organisms'
import { MainButtons, ProductAlertCard, SummaryCard, TransactionButton } from '@listed-components/molecules'
import { Routes } from '@listed-constants'


const Registration = () => {
  return (
    <ScreenContainer>
      <ScrollView>
        <Stack.Screen options={{ headerShown: false }} />
        <Text fontSize="xs">Registration</Text>
        <Button
          onPress={() => router.push(Routes.LOGIN)}>
          Registration
        </Button>
        <View marginY={4} />
        <SummaryCard totalRevenue='1000' totalItemsSold='100' />
        <View marginY={4} />
        <Row width="full" space="4">
          <TransactionButton flexGrow="1" type="incoming" />
          <TransactionButton flexGrow="1" type="outgoing" />
        </Row>
        <View marginY={1} />
        <Row width="full" space="2" >
          <MainButtons flex="1" type="inventory" />
          <MainButtons flex="1" type="products" />
          <MainButtons flex="1" type="collaborators" />
          <MainButtons flex="1" type="transactions" />
        </Row>
        <View marginY={1} />
        <Row space="4">
          <ProductAlertCard flex="1" type="stocks" value={24} />
          <ProductAlertCard flex="1" type="expiration" value={8} />
        </Row>
      </ScrollView>
    </ScreenContainer>
  )
}

export default Registration
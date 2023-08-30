import React from 'react'
import { Button, Row, Text, View } from 'native-base'
import ScreenContainer from '../../layout/ScreenContainer'
import { Stack, router } from 'expo-router'
import SummaryCard from '../../components/molecules/SummaryCard'
import TransactionButton from '../../components/molecules/TransactionButton'
import MainButtons from '../../components/molecules/MainButtons'


const Registration = () => {
  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <Text fontSize="xs">Registration</Text>
      <Button
        onPress={() => router.push("/auth/login")}>
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
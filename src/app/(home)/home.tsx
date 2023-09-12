import { Stack, router } from 'expo-router';
import React from 'react'
import {
  MainButtons,
  ProductAlertCard,
  SummaryCard,
  TransactionButton
} from '@listed-components/molecules';
import { Column, View, Row, Text } from 'native-base';
import { ScrollView } from 'react-native';
import { ScreenContainer } from '@listed-components/organisms';
import { Routes } from '@listed-constants';
import { useGetStoreDetails, useGetUserDetails } from '@listed-hooks';


const Home = () => {

  const {
    data: userDetails,
    isError: userError,
    isFetching: userFetching } = useGetUserDetails();

  const {
    data: storeDetails,
    isError: storeError,
    isFetching: storeFetching,
  } = useGetStoreDetails(userDetails?.currentStoreId);


  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <Column marginTop="6" space="2">
          <Text fontWeight="medium" fontSize="md">
            <Text color="muted.400">Welcome</Text> {userDetails?.username}
          </Text>
          <SummaryCard totalItemsSold="100" totalRevenue="1,000.00"
            storeName={storeDetails?.name} />
        </Column>
        <View marginY={4} />
        <Row width="full" space="4">
          <TransactionButton flexGrow="1" type="incoming" />
          <TransactionButton flexGrow="1" type="outgoing" />
        </Row>
        <View marginY={3} />
        <Column space="2">
          <Text fontWeight="medium" fontSize="sm">
            Inventory Management
          </Text>
          <Row width="full" space="3" >
            <MainButtons flex="1" type="inventory" />
            <MainButtons flex="1" type="products"
              onPress={() => {
                router.push(Routes.PRODUCTS);
              }}
            />
            <MainButtons flex="1" type="collaborators" />
            <MainButtons flex="1" type="transactions" />
          </Row>
        </Column>
        <View marginY={3} />
        <Column space="2">
          <Text fontWeight="medium" fontSize="sm">
            Product Alerts
          </Text>
          <Row width="full" space="4">
            <ProductAlertCard flex="1" type="stocks" value={24} />
            <ProductAlertCard flex="1" type="expiration" value={8} />
          </Row>
        </Column>
        <View marginY={3} />
      </ScrollView>
    </ScreenContainer >
  )
}


export default Home

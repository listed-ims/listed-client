import { Stack, router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Column, View, Row, Text } from 'native-base';
import { ScrollView } from 'react-native';
import { MainButtons, ProductAlertCard, ScreenContainer, SummaryCard, TransactionButton } from '@listed-components';
import { getToken, getUserService } from '@listed-services';


const Home = () => {

  const [name, setName] = useState("");
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        getUserService(token)
          .then((response) => {
            const name = response.data.name;
            setName(name);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    fetchData();
  }, [])


  return (
    <ScreenContainer>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView>
        <Column marginTop="6" space="2">
          <Text fontWeight="medium" fontSize="md">
            <Text color="muted.400">Welcome</Text> Jem!
          </Text>
          <SummaryCard totalItemsSold="100" totalRevenue="1,000.00" />
        </Column>
        <View marginY={4} />
        <Row width="full" space="4">
          <TransactionButton flexGrow="1" type="incoming"/>
          <TransactionButton flexGrow="1" type="outgoing"/>
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
                router.push("/products");
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
      </ScrollView>
    </ScreenContainer >
  )
}


export default Home

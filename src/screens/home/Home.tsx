import React, { useEffect, useState } from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Box, Column, Heading, Row, ScrollView, Text, VStack } from 'native-base'
import MainButtons from '../../components/MainButtons'
import SummaryCard from '../../components/SummaryCard'
import TransactionActions from '../../components/TransactionButtons'
import { getUserService } from '../../services/UserService'
import { getToken } from '../../services/TokenStorage'


interface HomeProps {
  navigation: NativeStackNavigationProp<any>,
}

const Home = ({ navigation }: HomeProps) => {
  const [username, setUsername] = useState("");

  useEffect(() => { 
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        getUserService(token)
          .then((response) => {
            const username = response.data.username;
            setUsername(username);
            console.log(username);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
    fetchData();
   },[])

  
  return (
    <ScreenContainer>
    <Column space="4" height="full" paddingTop="5">
      <ScrollView>
        <Text fontWeight="bold" color="muted.400" fontSize="lg">Hi, {username}.</Text>
        <Text fontWeight="bold" fontSize="2xl">Welcome!</Text>
        <VStack space="7" overflowX="auto">
          <Box paddingTop="6">
          <SummaryCard totalItemsSold="100 pcs." totalRevenue="Php 10,000" />
          </Box>
          <Box borderWidth="1" borderRadius="2xl" borderColor="muted.200">
            <Column padding="6" display="flex">
              <Heading flex="1" fontWeight="bold" fontSize="sm" marginBottom="8">
                Inventory Management
              </Heading>
                <Row justifyContent="center">
                  <MainButtons type="Inventory" />
                  <MainButtons type="Products" 
                    onPress={() => {
                      navigation.navigate("ProductsRoot");
                    }}
                  />
                  <MainButtons type="Collaborators"
                    onPress={() => {
                      navigation.navigate("CollaboratorsRoot");
                    }}
                  />
                  <MainButtons type="Analytics" />
                </Row>
            </Column>
          </Box>
          <Row paddingTop="2" space="4">
            <TransactionActions flexGrow={1} type="incoming">Incoming</TransactionActions>
            <TransactionActions flexGrow={1} type="outgoing">Outgoing</TransactionActions>
          </Row>
        </VStack>
      </ScrollView>
    </Column>
    </ScreenContainer >
  )
}

export default Home

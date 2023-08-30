import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Column, VStack, Box, Heading, Row, Text } from 'native-base';
import { ScrollView } from 'react-native';
import { MainButtons, ScreenContainer, SummaryCard, TransactionButton } from '@listed-components';
import { getToken, getUserService } from '@listed-services';

interface HomeProps {
  navigation?: NativeStackNavigationProp<any>,
}

const Home = ({ navigation }: HomeProps) => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const params = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        getUserService(token)
          .then((response) => {
            const firstname = response.data.firstname;
            const lastname = response.data.lastname;
            setFirstName(firstname);
            setLastName(lastname);
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
      <Column space="4" height="full" paddingTop="5">
        <ScrollView>
          <Text fontWeight="bold" color="muted.400" fontSize="lg">Hi, {firstname} {lastname}.</Text>
          <Text fontWeight="bold" fontSize="2xl">Welcome!</Text>
          <VStack space="7" overflowX="auto">
            <Box paddingTop="6">
              <SummaryCard totalItemsSold="100" totalRevenue="10000" />
            </Box>
            <Box borderWidth="1" borderRadius="2xl" borderColor="muted.200">
              <Column padding="6" display="flex">
                <Heading flex="1" fontWeight="bold" fontSize="sm" marginBottom="8">
                  {params.iconName}
                </Heading>
                <Row justifyContent="center">
                  <MainButtons type="inventory" />
                  <MainButtons type="products"
                    onPress={() => {
                      router.push("/products");
                    }}
                  />
                  <MainButtons type="collaborators"
                  // onPress={() => {
                  //   navigation.navigate("CollaboratorsRoot");
                  // }}
                  />
                  <MainButtons type="transactions" />
                </Row>
              </Column>
            </Box>
            <Row paddingTop="2" space="4">
              <TransactionButton flexGrow={1} type="incoming">Incoming</TransactionButton>
              <TransactionButton flexGrow={1} type="outgoing">Outgoing</TransactionButton>
            </Row>
          </VStack>
        </ScrollView>
      </Column>
    </ScreenContainer >
  )
}


export default Home

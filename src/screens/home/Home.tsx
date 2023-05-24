import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Box, Column, Heading, Link, Row, ScrollView, Text, VStack, useTheme } from 'native-base'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import FormControl from '../../components/FormControl'
import MainButtons from '../../components/MainButtons'
import SummaryCard from '../../components/SummaryCard'
import TransactionActions from '../../components/TransactionButtons'
import Select from '../../components/Select'
import BarcodeField from '../../components/BarcodeField'
import { Picker } from '@react-native-picker/picker'


interface HomeProps {
  navigation: NativeStackNavigationProp<any>,
}

const Home = ({ navigation }: HomeProps) => {
  const theme = useTheme();
  return (
    <ScreenContainer>
    <Column space="4" height="full" paddingTop="4">
      <ScrollView>
        <Text fontWeight="bold" color="muted.400" fontSize="lg">Hi, John Doe</Text>
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
          <Row space="4">
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

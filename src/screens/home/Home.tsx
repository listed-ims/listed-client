import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Link, Row, ScrollView, Text, VStack, useTheme } from 'native-base'
import Button from '../../components/Button'
import TextField from '../../components/TextField'
import FormControl from '../../components/FormControl'
import MainButtons from '../../components/MainButtons'
import SummaryCard from '../../components/SummaryCard'
import TransactionActions from '../../components/TransactionButtons'
import Select from '../../components/Select'
import BarcodeField from '../../components/BarcodeField'


interface HomeProps {
  navigation: NativeStackNavigationProp<any>,
}

const Home = ({ navigation }: HomeProps) => {
  const theme = useTheme();
  return (
    <ScreenContainer>
      <ScrollView>
        <Text alignSelf="center" fontSize="2xl">Home</Text>
        <VStack space="5" overflowX="auto">
          <Button width="1/2"
            onPress={() => {
              navigation.navigate("ProductsRoot");
            }}>
            Product Management
          </Button>
          <Button onPress={() => {
            navigation.navigate("CollaboratorsRoot");
          }}>
            Collaborators
          </Button>
          <Row space={2} justifyContent="center" >
            <Button flexGrow={1}>Hello</Button>
            <Button flexGrow={1} isDisabled>Disabled</Button>
            <Button flexGrow={1} variant="outline">Hi</Button>
          </Row>
          <SummaryCard totalItemsSold="100 pcs." totalRevenue="Php 10,000" />
          <Row space="2" justifyContent="center">
            <MainButtons type="Inventory" />
            <MainButtons type="Products" />
            <MainButtons type="Collaborators" />
            <MainButtons type="Analytics" />
          </Row>
          <Row space="4">
            <TransactionActions flexGrow={1} type="incoming">Incoming</TransactionActions>
            <TransactionActions flexGrow={1} type="outgoing">Outgoing</TransactionActions>
          </Row>
          <TextField isInvalid />
          <TextField />
          <TextField isDisabled />
          <Link _text={{
            fontSize: "md",
            color: "primary.700",
            fontWeight: "medium"
          }}>
            Hello, I'm a Link
          </Link>
          <FormControl isRequired label="Input here">
            <TextField placeholder="Input someting here" startDataLabel="Php" />
          </FormControl>
          <FormControl label="Size Variant">
            <TextField placeholder="Input someting here"
              endDataLabel="kg" />
          </FormControl>
          <FormControl label="Purchase Price">
            <TextField
              placeholder="Input price"
              startDataLabel="Php"
              variant="underlined" />
          </FormControl>
          <FormControl isInvalid label="Input here" errorMessage="error, sorry">
            <TextField placeholder="Input someting here" />
          </FormControl>
          <FormControl label="Barcode">
            <BarcodeField fieldType="input" placeholder="Input barcode" />
          </FormControl>
          <Select />
        </VStack>
      </ScrollView>
    </ScreenContainer >
  )
}

export default Home

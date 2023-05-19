import React from 'react'
import { Button, Text } from 'native-base'
import ScreenContainer from '../../layout/ScreenContainer'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'


interface TransactionsProps {
  navigation: NativeStackNavigationProp<any>,
}

const Transactions = ({ navigation }: TransactionsProps) => {
  return (
    <ScreenContainer>
      <Text fontSize="xs">Hello</Text>
      <Button onPress={() => {
        navigation.navigate("Transaction Details");
      }}>
        Transaction Details
      </Button>
    </ScreenContainer>
  )
}

export default Transactions
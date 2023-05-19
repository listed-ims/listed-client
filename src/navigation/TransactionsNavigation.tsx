import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { stackHeaderStyles } from '../styles/HeaderBar';
import Transactions from '../screens/transactions/Transactions';
import TransactionDetails from '../screens/transactions/TransactionDetails';


const Stack = createNativeStackNavigator();

const TransactionsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={stackHeaderStyles}>
      <Stack.Screen name="Transactions" component={Transactions} />
      <Stack.Screen name="Transaction Details" component={TransactionDetails} />
    </Stack.Navigator>
  )
}

export default TransactionsNavigation
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import NavigationIcon from '../components/icons/NavigationIcon';
import { tabHeaderStyles } from '../styles/HeaderBar';
import Home from '../screens/home/Home';
import { Text, useTheme } from 'native-base';
import Transactions from '../screens/transactions/Transactions';
import TransactionsNavigation from './TransactionsNavigation';

const Tab = createBottomTabNavigator();


const TabNavigation = () => {

  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused }) => {
            return <NavigationIcon type={route.name} selected={focused ? true : false} />
          },
          ...tabHeaderStyles,
          tabBarActiveTintColor: theme.colors.primary[700],
          tabBarInactiveTintColor: theme.colors.black,
          tabBarLabel: ({ color }) => {
            return (
              <Text fontSize="xs" fontWeight="medium"
                color={color}>
                {route.name}
              </Text>
            )
          },
          headerShown: false
        })
      }
    >
      <Tab.Screen name="Home" component={Home}
        options={{ headerShown: false }} />
      <Tab.Screen name="Transactions" component={TransactionsNavigation} />
      <Tab.Screen name="Notifications" component={Home} />
      <Tab.Screen name="Profile" component={Home} />
    </Tab.Navigator >
  )
}

export default TabNavigation
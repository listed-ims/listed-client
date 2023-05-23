import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { stackHeaderStyles } from '../styles/HeaderBar';
import ProductManagement from '../screens/product_management/ProductManagement';
import Collaborators from '../screens/collaborators/Collaborators';
import TabNavigation from './TabNavigation';
import Login from '../screens/home/Login';
import Registration from '../screens/home/Registration';


const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <Stack.Navigator screenOptions={stackHeaderStyles}>
      {loggedIn ? (
        <>
          <Stack.Screen name="HomeTabs" component={TabNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Products" component={ProductManagement} />
          <Stack.Screen name="Collaborators" component={Collaborators} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login}
            options={{
              headerShown: false
            }} />
          <Stack.Screen name="Registration" component={Registration}
            options={{
              headerShown: false
            }} />
        </>
      )}
    </Stack.Navigator>

  );
}

export default HomeNavigation
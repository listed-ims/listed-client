import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { stackHeaderStyles } from '../styles/HeaderBar';
import ProductManagement from '../screens/product_management/ProductManagement';
import AddProduct from '../screens/product_management/AddProduct';
import ProductDetails from '../screens/product_management/ProductDetails';


const Stack = createNativeStackNavigator();

const ProductsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={stackHeaderStyles}>
      <Stack.Screen name="Products" component={ProductManagement} />
      <Stack.Screen name="Add Product" component={AddProduct} />
      <Stack.Screen name="Product Details" component={ProductDetails} />
    </Stack.Navigator>
  )
}

export default ProductsNavigation
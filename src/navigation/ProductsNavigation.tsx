import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { stackHeaderStyles } from '../styles/HeaderBar';
import ProductManagement from '../screens/product_management/ProductManagement';
import AddProduct from '../screens/product_management/AddProduct';
import ProductDetails from '../screens/product_management/ProductDetails';
import { ProductsNavigationParams } from '../types/navigation/ParamsList';


const Stack = createNativeStackNavigator<ProductsNavigationParams>();

const ProductsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={stackHeaderStyles}>
      <Stack.Screen name="Products" component={ProductManagement} />
      <Stack.Screen name="AddProduct" component={AddProduct} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
    </Stack.Navigator>
  )
}

export default ProductsNavigation
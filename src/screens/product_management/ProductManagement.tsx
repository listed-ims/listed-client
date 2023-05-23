import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Box, Column, Text } from 'native-base'
import { Product } from '../../types/Product'
import ProductList from '../../components/ProductList'
import BarcodeField from '../../components/BarcodeField'
import Button from '../../components/Button'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

const Products: Product[] = [
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
  {
    name: "Summit Water",
    variant: "100ml",
    quantity: "100pcs",
  },
]

interface ProductManagementProps {
  navigation: NativeStackNavigationProp<any>,
}


const ProductManagement = ({ navigation }: ProductManagementProps) => {

  const handleItemPress = () => {
    navigation.navigate("ProductDetails");
  }

  return (
    <ScreenContainer>
      <Column space="4" height="full" paddingTop="4">
        <BarcodeField
          fieldType="search"
          placeholder="Search" />
        <Column flex={1} space={2}>
          <Text fontSize="sm" fontWeight="bold" color="muted.500">PRODUCTS</Text>
          <Box flex={1}>
            <ProductList onItemPress={handleItemPress} data={Products} />
          </Box>
        </Column>
        <Box width="full">
          <Button onPress={() => navigation.navigate("AddProduct")}>Add Product</Button>
        </Box>
      </Column>
    </ScreenContainer >
  )
}

export default ProductManagement;
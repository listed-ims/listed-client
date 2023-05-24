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
    id: 1,
    name: "Gatorade Blue",
    barcode: "123456789",
    variant: "500 ml",
    salePrice: 70.00,
    threshold: 10,
    unit: "pcs",
  },
  {
    id: 2,
    name: "Gatorade Red",
    barcode: "987654321",
    variant: "500 ml",
    salePrice: 70.00,
    threshold: 10,
    unit: "pcs",
  },
]

interface ProductManagementProps {
  navigation: NativeStackNavigationProp<any>,
}


const ProductManagement = ({ navigation }: ProductManagementProps) => {

  const handleItemPress = () => {
    navigation.navigate("Product Details");
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
          <Button onPress={() => navigation.navigate("Add Product")}>Add Product</Button>
        </Box>
      </Column>
    </ScreenContainer >
  )
}

export default ProductManagement;
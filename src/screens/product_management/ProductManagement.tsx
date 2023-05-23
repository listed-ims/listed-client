import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Column } from 'native-base'
import { Product } from '../../types/Product'
import ProductList from '../../components/ProductList'
import SearchBar from '../../components/SearchBar'

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
]

const ProductManagement = () => {
  return (
    <ScreenContainer>
      <Column space="2" height="full">
        <SearchBar onBarcodePress={() => console.log("hello")} onSearchPress={() => console.log("search")} />
        <ProductList data={Products} />
      </Column>
    </ScreenContainer >
  )
}

export default ProductManagement
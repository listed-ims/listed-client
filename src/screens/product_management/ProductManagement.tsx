import React from 'react'
import ScreenContainer from '../../layout/ScreenContainer'
import { Column } from 'native-base'
import ProductListItem from '../../components/ProductListItem'
import { Product } from '../../types/Product'
import ProductList from '../../components/ProductList'

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
        <ProductListItem quantity="100 bottles."
          variant="100 ml"
          name="Summit Water" />
        <ProductList data={Products} />
      </Column>
    </ScreenContainer>
  )
}

export default ProductManagement
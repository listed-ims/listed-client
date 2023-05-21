import { Column, Divider, FlatList } from 'native-base'
import React from 'react'
import ProductListItem from './ProductListItem'
import { Product } from '../types/Product'


interface ProductListProps {
  data: ArrayLike<Product>,
}

const ProductList = ({ data }: ProductListProps) => {
  return (
    <Column space="2" borderColor="muted.300"
      borderWidth="2"
      padding="4"
      borderRadius="lg"
      maxHeight="600px">
      <FlatList data={data}
        renderItem={({ item, index }) => (
          <>
            <ProductListItem
              name={item.name}
              variant={item.variant}
              quantity={item.quantity} />
            {
              index !== data.length - 1 ?
                <Divider thickness="1.5" /> :
                <></>
            }
          </>
        )}
      />
    </Column>
  )
}

export default ProductList
import { Column, Divider, FlatList } from 'native-base'
import React from 'react'
import ProductListItem from './ProductListItem'
import { Product } from '../types/Product'


interface ProductListProps {
  data: ArrayLike<Product>,
  onItemPress: () => void;
}

const ProductList = ({ data, onItemPress }: ProductListProps) => {

  const handleItemPress = () => {
    onItemPress();
  }

  return (
    <Column space="2" borderColor="muted.300"
      borderWidth="2"
      paddingX="2"
      paddingY="2"
      borderRadius="lg">
      <FlatList data={data}
        renderItem={({ item, index }) => (
          <>
            <ProductListItem
              name={item.name}
              variant={item.variant}
              // quantity={item.quantity}
              onPress={() => {
                handleItemPress();
              }}
            />
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
import { Column, Divider, FlatList } from 'native-base'
import React from 'react'
import ProductListItem from '../molecules/ProductListItem'
import { Product } from '../../types/product'


interface ProductListProps {
  data: ArrayLike<Product>,
  onItemPress: (item: Product) => void;
}

const ProductList = ({ data, onItemPress }: ProductListProps) => {

  const handleItemPress = (item: Product) => {
    onItemPress(item);
  }

  return (
    <Column space="2" borderColor="muted.200"
      borderWidth="1"
      paddingX="2"
      paddingY="2"
      borderRadius="lg">
      <FlatList data={data}
        renderItem={({ item, index }) => (
          <>
            <ProductListItem
              name={item.name}
              variant={item.variant}
              quantity={0}
              unit={item.unit}
              onPress={() => {
                handleItemPress(item);
              }}
            />
            {
              index !== data.length - 1 ?
                <Divider thickness="1" /> :
                <></>
            }
          </>
        )}
      />
    </Column>
  )
}

export default ProductList
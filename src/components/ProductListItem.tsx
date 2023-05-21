import { Column, IPressableProps, Icon, Text, Pressable, Row } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'


interface ProductListItemProps extends IPressableProps {
  name: string,
  variant: string,
  quantity: string,
}

const ProductListItem = ({ variant, quantity, name, ...props }: ProductListItemProps) => {
  return (
    <Pressable {...props} _pressed={{ background: "muted.200" }} >
      <Row paddingX="6" paddingBottom="1"
        alignItems="center"
        justifyContent="space-between">
        <Column>
          <Text fontSize="xl" fontWeight="semibold" color="darkText">{name}</Text>
          <Text fontSize="sm" fontWeight="semibold" color="muted.500">{variant}</Text>
          <Text fontSize="sm" fontWeight="semibold" color="muted.500">{quantity}</Text>
        </Column>
        <Icon color="darkText" size="xl"
          as={Ionicons}
          name="chevron-forward-outline" />
      </Row>
    </Pressable>
  )
}

export default ProductListItem
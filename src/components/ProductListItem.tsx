import { Column, IPressableProps, Icon, Text, Pressable, Row } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'


interface ProductListItemProps extends IPressableProps {
  name: string,
  variant: string,
  // quantity: string,
}

const ProductListItem = ({ variant, name, ...props }: ProductListItemProps) => {
  return (
    <Pressable {...props} _pressed={{ background: "muted.200" }} paddingY="1" >
      <Row paddingX="1" paddingBottom="1"
        alignItems="center"
        justifyContent="space-between">
        <Column>
          <Text fontSize="lg" fontWeight="semibold" color="darkText">{name}</Text>
          <Text fontSize="sm" fontWeight="semibold" color="muted.500">{variant}</Text>
          {/* <Text fontSize="sm" fontWeight="semibold" color="muted.500">{quantity}</Text> */}
        </Column>
        <Icon color="muted.500" size="lg"
          as={Ionicons}
          name="chevron-forward-outline" />
      </Row>
    </Pressable>
  )
}

export default ProductListItem
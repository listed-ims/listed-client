import React, { ReactNode, useState } from 'react'
import { Center, IPressableProps, Pressable, Text } from 'native-base'
import { LayoutChangeEvent } from 'react-native';
import { CollaboratorIcon, InventoryIcon, ProductIcon, TransactionIcon } from '@listed-components';
import { toTitleCase } from '@listed-utils';


interface MainButtonsProps extends IPressableProps {
  type: "inventory" | "products" | "collaborators" | "transactions",
}

const MainButtons = ({ type, ...props }: MainButtonsProps) => {
  const [width, setWidth] = useState(0);

  const icon: Record<MainButtonsProps["type"], ReactNode> = {
    inventory: <InventoryIcon />,
    products: <ProductIcon />,
    collaborators: <CollaboratorIcon />,
    transactions: <TransactionIcon />,
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width);
  }

  return (
    <Pressable {...props}
      borderRadius="lg"
      backgroundColor="offWhite.500"
      _pressed={{
        backgroundColor: "offWhite.800"
      }}>
      <Center width="full" height={width}
        onLayout={onLayout}>
        {icon[type]}
        <Text fontSize="2xs" fontWeight="medium"
          color="darkText">
          {toTitleCase(type)}
        </Text>
      </Center>
    </Pressable>
  )
}

export default MainButtons
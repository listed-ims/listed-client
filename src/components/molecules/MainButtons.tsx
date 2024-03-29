import React, { ReactNode, useState } from 'react'
import { Center, IPressableProps, Pressable, Text } from 'native-base'
import { LayoutChangeEvent } from 'react-native';
import { toTitleCase } from '@listed-utils';
import {
  CollaboratorIcon,
  AnalyticsIcon,
  ProductIcon,
  TransactionIcon
} from '@listed-components/atoms';


interface MainButtonsProps extends IPressableProps {
  type: "analytics" | "products" | "collaborators" | "transactions" | string
}

const MainButtons = ({ type, ...props }: MainButtonsProps) => {
  const [dimension, setDimension] = useState(0);

  const icon: Record<MainButtonsProps["type"], ReactNode> = {
    analytics: <AnalyticsIcon />,
    products: <ProductIcon />,
    collaborators: <CollaboratorIcon />,
    transactions: <TransactionIcon />,
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setDimension(width);
  }

  return (
    <Pressable {...props}
      borderRadius="lg"
      backgroundColor="offWhite.500"
      _pressed={{
        backgroundColor: "offWhite.800"
      }}
    >
      <Center
        width="full"
        height={dimension}
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
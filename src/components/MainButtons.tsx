import React from 'react'
import { Box, Center, IPressableProps, Image, Pressable, Text, Flex } from 'native-base'
import { ImageURISource } from 'react-native'


interface MainButtonsProps extends IPressableProps {
  type: "Inventory" | "Products" | "Collaborators" | "Analytics",
}

const MainButtons = ({ type, ...props }: MainButtonsProps) => {

  const iconSource: Record<MainButtonsProps["type"], ImageURISource> = {
    Inventory: require("../assets/images/inventory-icon.png"),
    Products: require("../assets/images/products-icon.png"),
    Collaborators: require("../assets/images/collaborators-icon.png"),
    Analytics: require("../assets/images/analytics-icon.png"),
  }

  return (
    <Flex height="20" width="20" alignItems="center">
      <Pressable {...props} background="muted.200"
        borderRadius="8px"
        height="16"
        width="16"
        _pressed={{
          background: "primary.300"
        }}>
        <Center width="full" height="full">
          <Image size="7"
            alt={`${type} icon`}
            source={iconSource[type]} />
        </Center>
      </Pressable>
      <Text fontSize="2xs" fontWeight="bold" alignSelf="center">{type}</Text>
    </Flex>
  )
}

export default MainButtons
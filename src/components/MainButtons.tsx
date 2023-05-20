import React from 'react'
import { Center, IPressableProps, Image, Pressable } from 'native-base'
import { ImageURISource } from 'react-native'


interface MainButtonsProps extends IPressableProps {
  type: "inventory" | "products" | "collaborators" | "analytics",
}

const MainButtons = ({ type, ...props }: MainButtonsProps) => {

  const iconSource: Record<MainButtonsProps["type"], ImageURISource> = {
    inventory: require("../assets/images/inventory-icon.png"),
    products: require("../assets/images/products-icon.png"),
    collaborators: require("../assets/images/collaborators-icon.png"),
    analytics: require("../assets/images/analytics-icon.png"),
  }

  return (
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
  )
}

export default MainButtons
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'native-base';


interface NavigationIconProps {
  type: "Home" | "Transactions" | "Notifications" | "Profile" | string
  selected?: boolean,
}

const NavigationIcon = ({ type, selected = false }: NavigationIconProps) => {

  const iconMapping: Record<NavigationIconProps["type"], string> = {
    Home: "home",
    Transactions: "clipboard",
    Notifications: "notifications",
    Profile: "person",
  }
  const iconName = iconMapping[type];

  return (
    <>
      < Icon
        as={Ionicons}
        name={`${iconName}${selected ? "" : "-outline"}`}
        color={`${selected ? "primary.700" : "black"}`}
        size={6}
      />
    </>
  )
}

export default NavigationIcon
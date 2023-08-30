import React, { ReactNode } from 'react'
import { Button as NBButton, IButtonProps } from 'native-base'


interface ButtonProps extends IButtonProps {
  children: ReactNode,
}

const Button = ({ children, ...props }: ButtonProps) => {

  return (
    <NBButton {...props} maxWidth="full"
      borderColor="primary.700"
      backgroundColor={`${props.variant === "outline" ? "white" : "primary.700"}`}
      _pressed={{
        background: `${props.variant === "outline" ? "offWhite.300" : "primary.600"}`
      }}
      _text={{
        fontSize: "sm", fontWeight: "medium",
        color: `${props.variant === "outline" ? "primary.700" : "lightText"}`
      }}>
      {children}
    </NBButton >
  )
}

export default Button
import React, { ReactNode } from 'react'
import { Button as NBButton, IButtonProps } from 'native-base'


interface ButtonProps extends IButtonProps {
  children: ReactNode,
}

const Button = ({ children, ...rest }: ButtonProps) => {

  return (
    <NBButton {...rest} maxWidth="full"
      borderColor="primary.700"
      _text={{
        fontSize: "sm", fontWeight: "medium",
        color: `${rest.variant === "outline" ? "primary.700" : "lightText"}`
      }}>
      {children}
    </NBButton >
  )
}

export default Button
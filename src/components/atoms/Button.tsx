import React, { ReactNode } from 'react'
import { Button as NBButton, IButtonProps } from 'native-base'
import { VariantType } from 'native-base/lib/typescript/components/types';


type ValidVariants = "ghost" | "outline" | "solid" | "subtle" | "unstyled" | "subtle" | "warnSubtle" | "warnUnstyled" | "warnOutline" | "white" | "whiteOutline";

interface ButtonProps extends IButtonProps {
  children: ReactNode,
  variant?: VariantType<"Button"> | ValidVariants
}

const Button = ({ children, ...props }: ButtonProps) => {

  const commonTextStyle = {
    fontSize: "sm", fontWeight: "medium",
  }

  const variantStyles: Record<ValidVariants, {}> = {
    outline: {
      backgroundColor: "white",
      borderColor: "primary.700",
      _pressed: {
        background: "offWhite.300"
      },
      _text: {
        ...commonTextStyle,
        color: "primary.700"
      }
    },
    solid: {
      backgroundColor: "primary.700",
      _pressed: {
        background: "primary.600"
      },
      _text: {
        ...commonTextStyle,
        color: "lightText"
      }
    },
    ghost: {
      _pressed: {
        background: "offWhite.300"
      },
      _text: {
        ...commonTextStyle,
        color: "primary.700"
      }
    },
    unstyled: {
      _text: {
        ...commonTextStyle,
        color: "primary.700"
      }
    },
    subtle: {
      backgroundColor: "offWhite.500",
      _pressed: {
        background: "offWhite.800"
      },
      _text: {
        ...commonTextStyle,
        color: "primary.700"
      }
    },
    warnSubtle: {
      backgroundColor: "error.50",
      _pressed: {
        background: "error.100"
      },
      _text: {
        ...commonTextStyle,
        color: "error.500"
      }
    },
    warnUnstyled: {
      _text: {
        ...commonTextStyle,
        color: "error.500"
      }
    },
    warnOutline: {
      backgroundColor: "white",
      borderWidth: "1",
      borderColor: "error.500",
      _pressed: {
        background: "error.100"
      },
      _text: {
        ...commonTextStyle,
        color: "error.500"
      }
    },
    white: {
      backgroundColor: "white",
      _pressed: {
        background: "offWhite.300"
      },
      _text: {
        ...commonTextStyle,
        color: "primary.700"
      }
    },
    whiteOutline: {
      backgroundColor: "primary.700",
      borderColor: "white",
      borderWidth: "1",
      _pressed: {
        background: "primary.600"
      },
      _text: {
        ...commonTextStyle,
        color: "white"
      }
    }
  }

  const selectedVariantStyles = variantStyles[props.variant as ValidVariants || "solid"];

  return (
    <NBButton {...props} {...selectedVariantStyles} maxWidth="full">
      {children}
    </NBButton >
  )
}

export default Button
import { IconButton as NBIconButton } from 'native-base'
import { InterfaceIconButtonProps } from 'native-base/lib/typescript/components/composites/IconButton/types'

interface IconButtonProps extends InterfaceIconButtonProps {
  variant?: "outline" | "ghost" | "solid" | "subtle" | "link" | "unstyled";
}

const IconButton = ({ variant = "solid", ...props }: IconButtonProps) => {

  const variantStyles: Record<typeof variant, {}> = {
    subtle: {
      backgroundColor: "offWhite.500",
      _pressed: {
        background: "offWhite.800"
      },
    },
    solid: {
      backgroundColor: "primary.700",
      _pressed: {
        background: "primary.600"
      },
    },
    outline: { variant: "outline" },
    ghost: { variant: "ghost" },
    link: { variant: "link" },
    unstyled: { variant: "unstyled" }
  }

  const selectedVariantStyles = variantStyles[variant || "solid"]

  return (
    <NBIconButton {...props} {...selectedVariantStyles} />
  )
}

export default IconButton
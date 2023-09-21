import React from 'react'
import { ITextAreaProps, TextArea as NBTextArea, useTheme } from 'native-base'

type Variants = "outline" | "filled";

const TextArea = (props: ITextAreaProps) => {
  const { colors } = useTheme();

  const variantStyles: Record<Variants, {}> = {
    outline: {
      backgroundColor: "white",
      borderColor: "muted.300"
    },
    filled: {
      backgroundColor: "offWhite.200",
      borderColor: "white"
    }
  }

  return (
    <NBTextArea
      {...props} {...variantStyles[props.variant as Variants || "filled"]}
      autoCompleteType={undefined}
      fontSize="md"
      _input={{ selectionColor: colors.coolGray[400] }}
      _focus={{ borderColor: "muted.300" }}
      _invalid={{
        backgroundColor: "error.50",
        _focus: {
          backgroundColor: "offWhite.200"
        }
      }}
      _disabled={{ backgroundColor: "muted.300" }}
    />
  )
}

export default TextArea



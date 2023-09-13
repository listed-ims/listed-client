import React from 'react'
import { ITextAreaProps, TextArea as NBTextArea, useTheme } from 'native-base'

const TextArea = (props: ITextAreaProps) => {
  const { colors } = useTheme();

  return (
    <NBTextArea
      {...props}
      autoCompleteType={undefined}
      fontSize="md"
      backgroundColor={"offWhite.200"}
      borderColor="white"
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



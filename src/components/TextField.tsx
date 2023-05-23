import { IInputProps, Input, useTheme } from 'native-base'
import React from 'react'


const TextField = ({ ...props }: IInputProps) => {
  const { colors } = useTheme();

  return (
    <Input {...props}
      variant="filled"
      size="lg"
      _input={{ background: "offWhite.200", selectionColor: colors.coolGray[400] }}
      _focus={{ borderColor: "muted.300" }}
      _invalid={{ background: "error.50", _focus: { backgroundColor: "error.50" } }}
      _disabled={{ backgroundColor: "muted.300" }}
    />
  )
}

export default TextField
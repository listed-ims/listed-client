import { IInputProps, Input, useTheme, Text } from 'native-base'
import React from 'react'


interface TextFieldProps extends IInputProps {
  dataLabel?: string,
}

const TextField = ({ dataLabel, ...props }: TextFieldProps) => {
  const { colors } = useTheme();

  return (
    <Input {...props}
      variant="filled"
      size="lg"
      backgroundColor="offWhite.200"
      _input={{ selectionColor: colors.coolGray[400] }}
      _focus={{ borderColor: "muted.300" }}
      _invalid={{ background: "error.50", _focus: { backgroundColor: "error.50" } }}
      _disabled={{ backgroundColor: "muted.300" }}
      InputRightElement={
        <Text
          fontSize="sm"
          fontWeight="medium"
          color="muted.500"
          marginX="8">
          {dataLabel}
        </Text>
      }
    />
  )
}

export default TextField
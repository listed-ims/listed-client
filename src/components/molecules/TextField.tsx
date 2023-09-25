import { IInputProps, Input, useTheme, Text } from 'native-base'
import React, { useState } from 'react'


interface TextFieldProps extends IInputProps {
  endDataLabel?: string | undefined,
  startDataLabel?: string | undefined,
  onChangeText?: (value: string) => void,
}

const TextField = ({ startDataLabel, endDataLabel, onChangeText, variant = "filled", value, defaultValue, ...props }: TextFieldProps) => {
  const { colors } = useTheme();

  const [hasInput, setHasInput] = useState(false);

  const handleInputChange = (value: string) => {
    setHasInput(value.length > 0);
    onChangeText!(value)
  };

  return (
    <Input {...props}
      onChangeText={handleInputChange}
      size="lg"
      value={value}
      variant={variant}
      backgroundColor="offWhite.200"
      borderColor="offWhite.200"
      _input={{ selectionColor: colors.coolGray[400] }}
      _focus={{ borderColor: "muted.300" }}
      _invalid={{
        backgroundColor: "error.50",
        _focus: { backgroundColor: "offWhite.200" }
      }}
      _disabled={{ backgroundColor: "muted.300" }}
      //TODO: will update implementation if input data labels are no longer needed.
      InputRightElement={
        endDataLabel !== undefined ?
          (
            <Text
              fontSize="md"
              fontWeight="regular"
              color="darkText"
              marginRight={variant === "underlined" ? "2" : "4"}>
              {endDataLabel}
            </Text>
          )
          : undefined
      }
      InputLeftElement={
        (hasInput || value || defaultValue) && startDataLabel !== undefined ?
          (
            <Text
              fontSize="md"
              fontWeight="regular"
              color="darkText"
              marginLeft={variant === "underlined" ? "0" : "4"}
              marginRight={variant === "underlined" ? "2" : "0"}>
              {startDataLabel}
            </Text>
          )
          : undefined
      }
    />
  )
}

export default TextField
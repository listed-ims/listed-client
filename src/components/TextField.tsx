import { IInputProps, Input, useTheme, Text } from 'native-base'
import React, { useState } from 'react'
import { ColorValue } from 'react-native';


interface TextFieldProps extends IInputProps {
  endDataLabel?: string | undefined,
  startDataLabel?: string | undefined,
  onChangeText?: (value: string) => void,
}

const TextField = ({ startDataLabel, endDataLabel, onChangeText, variant = "filled", ...props }: TextFieldProps) => {
  const { colors } = useTheme();
  let backgroundColor: ColorValue = "offWhite.200";

  if (variant === "underlined") {
    backgroundColor = "white"
  }

  const [hasInput, setHasInput] = useState(false);

  const handleInputChange = (value: string) => {
    setHasInput(value.length > 0);
    if (onChangeText) {
      onChangeText(value);
    }
  };

  return (
    <Input {...props}
      onChangeText={handleInputChange}
      size="lg"
      variant={variant}
      backgroundColor={backgroundColor}
      _input={{ selectionColor: colors.coolGray[400] }}
      _focus={{ borderColor: "muted.300" }}
      _invalid={{
        background: "error.50",
        _focus: { backgroundColor: "error.50" }
      }}
      _disabled={{ backgroundColor: "muted.300" }}
      InputRightElement={
        endDataLabel !== undefined ?
          (
            <Text
              fontSize="sm"
              fontWeight="regular"
              color="darkText"
              marginRight="8">
              {endDataLabel}
            </Text>
          )
          : undefined
      }
      InputLeftElement={
        hasInput && startDataLabel !== undefined ?
          (
            <Text
              fontSize="sm"
              fontWeight="regular"
              color="darkText"
              marginLeft="3"
              marginRight="1">
              {startDataLabel}
            </Text>
          )
          : undefined
      }
    />
  )
}

export default TextField
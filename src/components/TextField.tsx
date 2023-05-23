import { IInputProps, Input, useTheme, Text } from 'native-base'
import React from 'react'
import { ColorValue } from 'react-native';


interface TextFieldProps extends IInputProps {
  endDataLabel?: string | undefined,
  startDataLabel?: string | undefined,
}

const TextField = ({ startDataLabel, endDataLabel, variant = "filled", ...props }: TextFieldProps) => {
  const { colors } = useTheme();
  let backgroundColor: ColorValue = "offWhite.200";

  if (variant === "underlined") {
    backgroundColor = "white"
  }

  return (
    <Input {...props}
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
        <>
          {
            endDataLabel !== undefined ?
              <Text
                fontSize="md"
                fontWeight="medium"
                color="muted.500"
                marginRight="8">
                {endDataLabel}
              </Text>
              :
              <></>
          }
        </>
      }
      InputLeftElement={
        <>
          {
            startDataLabel !== undefined ?
              <Text
                fontSize="md"
                fontWeight="medium"
                color="muted.500"
                marginX="4">
                {startDataLabel}
              </Text>
              :
              <></>
          }
        </>
      }
    />
  )
}

export default TextField
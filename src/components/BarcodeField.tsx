import { IInputProps, Icon, IconButton, Input, Pressable, Row, useTheme } from 'native-base'
import React from 'react'
import { GestureResponderEvent, Keyboard, ReturnKeyTypeOptions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


interface BarcodeFieldProps extends IInputProps {
  fieldType: "search" | "input",
  onBarcodePress?: (event: GestureResponderEvent) => void,
  onSearchPress?: (event: GestureResponderEvent) => void,
}

const BarcodeField = ({ fieldType, onSearchPress, onBarcodePress, ...props }: BarcodeFieldProps) => {
  const { colors } = useTheme();

  let variant = "outline";
  let backgroundColor = "white";
  let focus: any = { backgroundColor: "muted.50" }
  let returnKeyType: ReturnKeyTypeOptions | undefined = "search";

  if (fieldType === "input") {
    variant = "filled";
    backgroundColor = "offWhite.200";
    focus = { borderColor: "muted.300" };
    returnKeyType = undefined;
  }

  return (
    <Row space="2">
      <Input {...props}
        selectionColor={colors.coolGray[400]}
        variant={variant}
        size="lg"
        flexGrow="1"
        returnKeyType={returnKeyType}
        backgroundColor={backgroundColor}
        _input={{ selectionColor: colors.coolGray[400] }}
        _focus={focus}
        onBlur={() => Keyboard.dismiss()}
        InputRightElement={
          fieldType === "search" ? (
            <Pressable marginX="2"
              borderRadius="full"
              display="flex"
              justifyContent="center"
              alignItems="center"
              size="8"
              _pressed={{ background: "muted.200" }}
              onPress={onSearchPress}
            >
              <Icon as={Ionicons} name="search-outline" size="6" />
            </Pressable>
          ) : undefined
        }
      />
      <IconButton variant="solid"
        size="xs"
        backgroundColor="primary.700"
        _pressed={{
          background: "primary.600"
        }}
        icon={
          <Icon as={Ionicons} name="barcode-outline" size="8" />
        }
        onPress={onBarcodePress}
      />
    </Row>
  )
}

export default BarcodeField
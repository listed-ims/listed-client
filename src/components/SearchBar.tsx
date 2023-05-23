import { IInputProps, Icon, IconButton, Input, Pressable, Row } from 'native-base'
import React from 'react'
import { GestureResponderEvent, Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons'


interface SearchBarProps extends IInputProps {
  onBarcodePress?: (event: GestureResponderEvent) => void,
  onSearchPress?: (event: GestureResponderEvent) => void,
}

const SearchBar = ({ onSearchPress, onBarcodePress, ...props }: SearchBarProps) => {
  return (
    <Row space="2">
      <Input {...props}
        variant="outline"
        placeholder="Search"
        size="lg"
        flexGrow="1"
        returnKeyType="search"
        _input={{ background: "transparent" }}
        _focus={{ backgroundColor: "muted.50" }}
        onBlur={() => Keyboard.dismiss}
        InputRightElement={
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

export default SearchBar
import { View } from 'native-base'
import { ReactNode } from 'react'
import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native'

interface KeyboardAwareScrollProps {
  children: ReactNode,
  elementOnTopOfKeyboard?: ReactNode,
}

const KeyboardAwareScroll = ({ children, elementOnTopOfKeyboard }: KeyboardAwareScrollProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flexGrow: 1 }}
    >
      <View flex="1">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
      {elementOnTopOfKeyboard}
    </KeyboardAvoidingView>
  )
}

export default KeyboardAwareScroll
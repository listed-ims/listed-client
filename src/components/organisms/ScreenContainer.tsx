import { StatusBar } from 'expo-status-bar'
import { Box } from 'native-base'
import React, { ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


interface ScreenContainerProps {
  children: ReactNode,
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor='white' />
      <Box bgColor="white" height="full"
        maxWidth="full"
        paddingX="4" paddingBottom="4">
        {children}
      </Box>
    </SafeAreaView>
  )
}

export default ScreenContainer
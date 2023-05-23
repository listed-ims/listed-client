import { Box, StatusBar } from 'native-base'
import React, { ReactNode } from 'react'


interface ScreenContainerProps {
  children: ReactNode,
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Box bgColor="white" height="full"
        maxWidth="full"
        paddingX="4" paddingBottom="4">
        {children}
      </Box>
    </>

  )
}

export default ScreenContainer
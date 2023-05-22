import { Flex } from 'native-base'
import { StatusBar } from 'expo-status-bar';
import React, { ReactNode } from 'react'


interface ScreenContainerProps {
  children: ReactNode,
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <>
      <StatusBar backgroundColor={"white"} />
      <Flex bgColor="white" height="full"
        maxWidth="full"
        paddingX="4" paddingBottom="4">
        {children}
      </Flex>
    </>

  )
}

export default ScreenContainer
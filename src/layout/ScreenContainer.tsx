import { Flex, ScrollView, StatusBar } from 'native-base'
import React, { ReactNode } from 'react'


interface ScreenContainerProps {
  children: ReactNode,
}

const ScreenContainer = ({ children }: ScreenContainerProps) => {
  return (
    <>
      <StatusBar backgroundColor={"white"} barStyle={"dark-content"} />
      <Flex bgColor="white" height="full"
        maxWidth="full"
        paddingX="4" paddingBottom="4">
        {children}
      </Flex>
    </>

  )
}

export default ScreenContainer
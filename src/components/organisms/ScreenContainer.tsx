import { StatusBar } from 'expo-status-bar'
import React, { ReactNode } from 'react'
import { Edges, SafeAreaView } from 'react-native-safe-area-context'


interface ScreenContainerProps {
  children: ReactNode,
  withHeader?: boolean
}

const ScreenContainer = ({ children, withHeader = false }: ScreenContainerProps) => {
  const edges: Edges = withHeader ? ['bottom', 'left', 'right'] : ['top', 'bottom', 'left', 'right'];
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "white",
      paddingHorizontal: 16,
    }}
      edges={edges}
    >
      <StatusBar backgroundColor="white" />
      {children}
    </SafeAreaView >
  )
}

export default ScreenContainer
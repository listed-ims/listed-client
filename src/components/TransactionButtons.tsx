import { Heading, IPressableProps, Icon, Pressable, Row } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import React, { ReactNode } from 'react'


interface TransactionButtonsProps extends IPressableProps {
  type: "outgoing" | "incoming",
  children: ReactNode,
}

const TransactionButtons = ({ children, type, ...props }: TransactionButtonsProps) => {
  return (
    <Pressable {...props} height="20" paddingX="4"
      display="flex"
      justifyContent="center"
      background="primary.700"
      borderRadius="lg"
      _pressed={{
        background: "primary.600"
      }}>
      <Row alignItems="center" justifyContent="center" space="4">
        <Heading color="lightText" size="sm">
          {children}
        </Heading>
        <Icon as={Ionicons}
          name={`${type === "outgoing" ? "log-out" : "log-in"}`}
          size="8" color="white" />
      </Row>
    </Pressable>
  )
}

export default TransactionButtons
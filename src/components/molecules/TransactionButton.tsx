import { IPressableProps, Pressable, Row, Text } from 'native-base'
import React from 'react'
import IncomingIcon from '../atoms/IncomingIcon'
import OutgoingIcon from '../atoms/OutgoingIcon'


interface TransactionButtonsProps extends IPressableProps {
  type: "outgoing" | "incoming",
}

const TransactionButton = ({ children, type, ...props }: TransactionButtonsProps) => {
  return (
    <Pressable {...props}
      borderRadius="sm"
      backgroundColor="muted.200"
      _pressed={{
        backgroundColor: "muted.300"
      }}
    >
      <Row padding="4" justifyContent="center">
        <Row space="2">
          {type === "incoming" && <IncomingIcon />}
          <Text fontSize="md" fontWeight="semibold" color="darkText"
          >{type === "incoming" ? "Incoming" : "Outgoing"}</Text>
          {type === "outgoing" && <OutgoingIcon />}
        </Row>
      </Row>
    </Pressable>
  )
}

export default TransactionButton
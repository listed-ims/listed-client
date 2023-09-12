import { IPressableProps, Pressable, Row, Text } from 'native-base'
import React from 'react'
import { toTitleCase } from '@listed-utils'
import { IncomingIcon, OutgoingIcon } from '@listed-components/atoms'


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
          >{toTitleCase(type)}</Text>
          {type === "outgoing" && <OutgoingIcon />}
        </Row>
      </Row>
    </Pressable>
  )
}

export default TransactionButton
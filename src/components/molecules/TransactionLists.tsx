import { OutIcon } from "@listed-components/atoms";
import { Box, Column, Flex, Row, Text } from "native-base";

interface TransactionListsProps{
transaction: string,
username: string,
date: string,
time: string
}
const TransactionLists = ( {transaction,username,date,time}: TransactionListsProps) => {
  const TransactionLists = ({
    transaction,
    username,
    date,
    time
  })

  return (
    <Row justifyContent="space-between" alignItems="flex-start" padding="2">
      <Column>
      <Text fontSize="sm" fontWeight="medium">{transaction}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600">{username}</Text>
      </Column>
      <Column>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{date}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{time}</Text>
      </Column>
    </Row>
  );
}
export default TransactionLists;


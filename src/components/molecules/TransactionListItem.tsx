import { OutgoingCategory } from "@listed-constants";
import { toTitleCase } from "@listed-utils";
import { Column, Row, Text } from "native-base";

interface TransactionListItemProps{
title: string | OutgoingCategory,
username: string,
date: string,
time: string
}
const TransactionListItem = ( {title,username,date,time}: TransactionListItemProps) => {
  
  return (
    <Row justifyContent="space-between" alignItems="flex-start" padding="2">
      <Column>
      <Text fontSize="sm" fontWeight="medium">{toTitleCase(String(title))}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600">{username}</Text>
      </Column>
      <Column>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{date}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{time}</Text>
      </Column>
    </Row>
  );
}
export default TransactionListItem;


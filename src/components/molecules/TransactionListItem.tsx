import { OutgoingCategory } from "@listed-constants";
import { toTitleCase } from "@listed-utils";
import { Column, Row, Text } from "native-base";

interface TransactionListItemProps{
title: string | OutgoingCategory,
name: string,
date: string,
time: string
}
const TransactionListItem = ( {title,name,date,time}: TransactionListItemProps) => {
  
  return (
    <Row justifyContent="space-between" alignItems="flex-start" padding="2">
      <Column>
      <Text fontSize="sm" fontWeight="medium">{toTitleCase(String(title))}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600">by: {name}</Text>
      </Column>
      <Column>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{date}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{time}</Text>
      </Column>
    </Row>
  );
}
export default TransactionListItem;


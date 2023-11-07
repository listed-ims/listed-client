import { OutgoingCategory } from "@listed-constants";
import { toTitleCase } from "@listed-utils";
import { Column, IPressableProps, Pressable, Row, Text } from "native-base";

interface TransactionListItemProps extends IPressableProps {
title: string | OutgoingCategory,
name: string,
date: string,
time: string
}
const TransactionListItem = ( {title,name,date,time, ...props}: TransactionListItemProps) => {
  
  return (
    <Pressable {...props} _pressed={{ background: "muted.200" }}>
    <Row justifyContent="space-between" alignItems="center" padding="2">
      <Column>
      <Text fontSize="sm" fontWeight="medium">{title}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600">by: {name}</Text>
      </Column>
      <Column alignItems= "flex-end">
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{date}</Text>
      <Text fontSize="xs" fontWeight="medium" color="muted.600" lineHeight="15px">{time}</Text>
      </Column>
    </Row>
    </Pressable>
  );
}
export default TransactionListItem;


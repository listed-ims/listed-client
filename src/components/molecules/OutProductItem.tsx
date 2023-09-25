import React from "react";
import {
  Column,
  Divider,
  Row,
  Text,
} from "native-base";
import { toCurrency } from "@listed-utils";
import { DeleteIcon, IconButton } from "@listed-components/atoms";
import { Quantity } from "@listed-components/organisms";

interface OutProductItemProps {
  name?: string;
  variant?: number;
  price?: number;
  totalPrice?: number;
}

const OutProductItem = ({
  name,
  variant,
  price,
  totalPrice
}: OutProductItemProps) => {
  return (
    <Column
    px="4"
    borderColor="muted.300"
    borderRadius="lg"
    borderWidth="1"
    >
      <Row 
      pt="4" 
      alignItems="center" 
      justifyContent="space-between" 
      >
        <Column 
        alignItems="flex-start" 
        justifyContent="space-between" 
        alignSelf="stretch"
        >
          <Text fontSize="sm" fontWeight="medium" color="darkText">
            {name}
          </Text>
          <Text fontSize="xs" fontWeight="medium" color="muted.500">
            {variant} ml
          </Text>
        </Column>
        <Column
        alignItems="flex-end" 
        space="1"
        >
          <IconButton
          variant="subtle"
          size="xs"
          icon={<DeleteIcon/>}
          />
          <Row space="1" >
            <Text fontSize="xs" fontWeight="medium">
                Price per item: 
            </Text>
            <Text fontSize="xs" fontWeight="medium" color="muted.500">
                {toCurrency(price as number).replace("Php", "₱")}
            </Text>
          </Row>
        </Column>
      </Row>
      <Divider my="2" />
      <Row 
      pb="4" 
      alignItems="center" 
      justifyContent="space-between"
      >
        <Text fontSize="sm" fontWeight="medium">
            Total: {toCurrency(totalPrice as number).replace("Php", "₱")}
        </Text>
        <Quantity
            quantity={1}
        />
      </Row>
    </Column>
  );
};

export default OutProductItem;

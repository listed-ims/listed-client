import {
  Column,
  Divider,
  Row,
  Text,
} from "native-base";
import { toCurrency } from "@listed-utils";
import { DeleteIcon, IconButton } from "@listed-components/atoms";
import { Quantity } from "@listed-components/molecules";

interface OutProductItemProps {
  name?: string;
  variant?: string;
  price: number;
  quantity: number;
  onDecrement: () => void;
  onIncrement: () => void;
  onDelete: () => void;
}

const OutProductItem = ({
  name,
  variant,
  price,
  quantity,
  onDecrement,
  onIncrement,
  onDelete
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
            {variant}
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
          onPress={onDelete}
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
            Total: {toCurrency(quantity*price).replace("Php", "₱")}
        </Text>
        <Quantity
          quantity={quantity}
          onDecrement={onDecrement}
          onIncrement={onIncrement}
        />
      </Row>
    </Column>
  );
};

export default OutProductItem;

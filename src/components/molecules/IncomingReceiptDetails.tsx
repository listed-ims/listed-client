import { toCurrency } from "@listed-utils";
import {
  Box,
  Column,
  Divider,
  Row,
  Text
} from "native-base";
import { FormControl, TextArea} from "@listed-components/molecules";

interface IncomingReceiptDetailsProps {
  referenceNumber?: number;
  name?: string;
  variant?: string;
  expirationDate?: string;
  purchasePrice?: number;
  totalQuantity?: number;
  totalPurchasePrice?: number;
  performedBy?: string;
  comment?: string;
  userRole?: string;
}

const IncomingReceiptDetails = ({
  referenceNumber,
  name,
  variant,
  expirationDate,
  purchasePrice,
  totalQuantity,
  totalPurchasePrice,
  performedBy,
  comment,
  userRole
}: IncomingReceiptDetailsProps) => {
  return (

      <Column paddingX="4" paddingTop="4">
      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Reference Number:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{referenceNumber}</Text>
      </Row>

      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Product:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{name}</Text>
      </Row>
      
      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Variant:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{variant}</Text>
      </Row>

      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Expiration Date:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{expirationDate}</Text>
      </Row>

      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Purhase Price / Item:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{toCurrency(purchasePrice as number)}</Text>
      </Row>

      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Total Quantity:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{totalQuantity}</Text>
      </Row>
      
      <Row paddingBottom="1">
          <Divider/>
      </Row>

      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Total Purchase Price:</Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">{totalPurchasePrice}</Text>
      </Row>

      <Row paddingBottom="1">
          <Divider/>
      </Row>
      
      <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">Performed by:</Text>
          <Box flex="1">
          <Text flex="1" fontSize="xs" fontWeight="bold">{performedBy}</Text>
          <Text flex="1" fontSize="xs" fontWeight="medium">({userRole})</Text>
          </Box>
      </Row>

      <FormControl label={
                
                  <Text fontSize="xs">
                    Comment
                  </Text> 
                 
              }
            >
      <TextArea isReadOnly variant="outline">{comment}</TextArea>
      </FormControl>
   

      </Column>
  );
};

export default IncomingReceiptDetails;

import { toCurrency } from "@listed-utils";
import { Box, Column, Divider, Row, Text } from "native-base";
import FormControl from "./FormControl";
import TextArea from "./TextArea";

interface OutgoingReceiptDetailsProps {
  // outgoingDetails: OutgoingResponse;
}

const OutgoingReceiptDetails = ({}:
   // outgoingDetails,
OutgoingReceiptDetailsProps) => {
  return (
    <Column paddingX="4" paddingTop="4">
      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Reference Number:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          100123-1
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Divider />
      </Row>

      <Column>
        <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">
            Gatorade 100 ml - 2pcs
          </Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">
            {toCurrency(40 as number)}
          </Text>
        </Row>
        <Row paddingBottom="1">
          <Text flex="1" fontSize="xs">
            Nature’s Spring 100 ml - 2pcs
          </Text>
          <Text flex="1" fontSize="xs" fontWeight="bold">
            {toCurrency(40 as number)}
          </Text>
        </Row>
      </Column>

      <Row paddingBottom="1">
        <Divider />
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Total Price:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {toCurrency(80 as number)}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Divider />
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Performed by:
        </Text>
        <Box flex="1">
          <Text flex="1" fontSize="xs" fontWeight="bold">
            Jeonghan
          </Text>
          <Text flex="1" fontSize="xs" fontWeight="medium">
            (owner)
          </Text>
        </Box>
      </Row>

      <FormControl label={<Text fontSize="xs">Comment</Text>}>
        <TextArea isReadOnly variant="outline">
          comment
        </TextArea>
      </FormControl>
    </Column>
  );
};

export default OutgoingReceiptDetails;

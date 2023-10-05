import { ownerOrCollaborator, toCurrency, toTitleCase } from "@listed-utils";
import { Box, Column, Divider, Row, Text } from "native-base";
import FormControl from "./FormControl";
import TextArea from "./TextArea";
import { OutgoingResponse, UserPermission } from "@listed-types";

interface OutgoingReceiptDetailsProps {
  outgoingDetails: OutgoingResponse;
  userPermissions: UserPermission[];
}

const OutgoingReceiptDetails = ({
  outgoingDetails,
  userPermissions,
}: OutgoingReceiptDetailsProps) => {

  const userRole = ownerOrCollaborator(userPermissions);

  return (
    <Column paddingX="4" paddingTop="4">
      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Reference Number:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {outgoingDetails?.referenceNumber}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Divider />
      </Row>

      <Column>
        {outgoingDetails?.products.map((product, index) => (
          <Row key={index} paddingBottom="1">
            <Text flex="1" fontSize="xs">
              {product.product.name} - {product.quantity} pcs
            </Text>
            <Text flex="1" fontSize="xs" fontWeight="bold">
              {toCurrency(product.price as number)}
            </Text>
          </Row>
        ))}
      </Column>

      <Row paddingBottom="1">
        <Divider />
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Total Price:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {toCurrency(outgoingDetails?.price as number)}
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
            {outgoingDetails?.user.name}
          </Text>
          <Text flex="1" fontSize="xs" fontWeight="medium">
            ({toTitleCase(userRole)})
          </Text>
        </Box>
      </Row>

      <FormControl label={<Text fontSize="xs">Comment</Text>}>
        <TextArea
          isReadOnly
          variant="outline"
          fontWeight={outgoingDetails?.comment ? "normal" : "thin"}
        >
          {outgoingDetails?.comment || "N/A"}
        </TextArea>
      </FormControl>
    </Column>
  );
};

export default OutgoingReceiptDetails;

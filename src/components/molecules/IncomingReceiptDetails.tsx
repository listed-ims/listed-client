import { dateToMonthDDYYYY, ownerOrCollaborator, toCurrency, toTitleCase } from "@listed-utils";
import { Box, Column, Divider, Row, Text } from "native-base";
import FormControl from "./FormControl";
import TextArea from "./TextArea";
import { IncomingResponse, ProductResponse, UserPermission } from "@listed-types";

interface IncomingReceiptDetailsProps {
  incomingDetails: IncomingResponse;
  userPermissions: UserPermission[];
}

const IncomingReceiptDetails = ({
  incomingDetails,
  userPermissions,
}: IncomingReceiptDetailsProps) => {

  const userRole = ownerOrCollaborator(userPermissions);
  
  return (
    <Column paddingX="4" paddingTop="4">
      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Reference Number:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {incomingDetails?.referenceNumber}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Product:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {incomingDetails?.product.name}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Variant:
        </Text>
        <Text
          flex="1"
          fontSize="xs"
          fontWeight={incomingDetails?.product.variant ? "bold" : "thin"}
        >
          {incomingDetails?.product.variant || "N/A"}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Expiration Date:
        </Text>
        <Text
          flex="1"
          fontSize="xs"
          fontWeight={incomingDetails?.expirationDate ? "bold" : "thin"}
        >
          {incomingDetails?.expirationDate ? (
            dateToMonthDDYYYY(
              new Date(incomingDetails?.expirationDate?.toString()!)
            )
          ) : (
            <Text fontSize="xs">N/A</Text>
          )}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Purhase Price / Item:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {toCurrency(incomingDetails?.purchasePrice as number)}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Quantity:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {incomingDetails?.initialQuantity}{" "}
          {incomingDetails?.product.unit.toLowerCase()}
        </Text>
      </Row>

      <Row paddingBottom="1">
        <Divider />
      </Row>

      <Row paddingBottom="1">
        <Text flex="1" fontSize="xs">
          Purchase Price:
        </Text>
        <Text flex="1" fontSize="xs" fontWeight="bold">
          {toCurrency(
            (incomingDetails?.purchasePrice *
              incomingDetails?.initialQuantity) as number
          )}
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
            {incomingDetails?.user.name}
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
          fontWeight={incomingDetails?.comment ? "normal" : "thin"}
        >
          {incomingDetails?.comment || "N/A"}
        </TextArea>
      </FormControl>
    </Column>
  );
};

export default IncomingReceiptDetails;

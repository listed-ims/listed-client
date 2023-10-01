import { AlertOutlineIcon } from "@listed-components/atoms";
import { StoreResponse } from "@listed-types";
import { Column, Row, Text, useTheme } from "native-base"
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

interface ExpirationsAlertCardProps extends InterfaceViewProps {
  type: "stocks" | "expiration",
  alertDetails: StoreResponse;
}

const ExpirationsAlertCard = ({ alertDetails, type, ...props }: ExpirationsAlertCardProps) => {
  const theme = useTheme();

  const alertTitleText = type === "stocks" ? "Stocks" : "Expirations";
  const alertDescription = type === "stocks" ? "Low Stock" : "Near Expiry";

  return (
    <Column {...props} space="1"
      padding="3"
      borderColor="muted.300"
      borderWidth="1"
      borderRadius="lg">
      <Row space="1">
        <AlertOutlineIcon color={theme.colors.warning[500]} />
        <Text fontSize="xs" color="warning.500">
          {alertTitleText}
        </Text>
      </Row>
      <Row alignItems="center"
        space="2"
        marginBottom="2"
        justifyContent="space-evenly">
        <Text fontSize="2xl" fontWeight="bold" color="darkText">{alertDetails?.totalNearExpiry}</Text>
        <Text fontSize="md" fontWeight="xs" color="darkText">
          {alertDescription + "\nProducts"}
        </Text>
      </Row>
    </Column>
  )
}

export default ExpirationsAlertCard
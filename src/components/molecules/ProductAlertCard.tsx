import { Column, Row, Text, View, useTheme } from "native-base"
import { AlertOutlineIcon } from "../atoms";
import { InterfaceViewProps } from "native-base/lib/typescript/components/basic/View/types";

interface ProductAlertCardProps extends InterfaceViewProps {
  type: "stocks" | "expiration",
}

const ProductAlertCard = ({ type, ...props }: ProductAlertCardProps) => {
  const theme = useTheme();
  return (
    <Column {...props} space="1" padding="3" borderColor="muted.300" borderWidth="1" borderRadius="lg">
      <Row space="1">
        <AlertOutlineIcon color={theme.colors.warning[500]} />
        <Text fontSize="xs" color="warning.500">Stocks</Text>
      </Row>
      <Row alignItems="center" paddingX="4" justifyContent="space-between" marginBottom="2">
        <Text fontSize="2xl" fontWeight="bold" color="darkText">24</Text>
        <View>
          <Text fontSize="md" fontWeight="xs" color="darkText">Low Stock</Text>
          <Text fontSize="md" fontWeight="xs" color="darkText">Products</Text>
        </View>
      </Row>
    </Column>
  )
}

export default ProductAlertCard
import {
  AddIcon,
  Button,
  ScanIcon,
} from "@listed-components/atoms";
import { Routes } from "@listed-constants";
import { router, useLocalSearchParams } from "expo-router";
import {
  Column,
  Text,
  VStack,
  useTheme,
} from "native-base";

const OutgoingNoProducts = () => {
  const { ids } = useLocalSearchParams();
  const { colors } = useTheme();

  return (
    <Column>
      <VStack space={1}>
        <Text fontSize="sm" fontWeight="medium">
          Items
        </Text>
        <Column py={4} space={4}>
          <Column space={2}>
            <Text textAlign="center" fontWeight="semibold" fontSize="lg">
              No products selected.
            </Text>
            <Text textAlign="center" fontSize="xs">
              Select products to add.
            </Text>
          </Column>
          <Column space={2}>
            <Button
              size="sm"
              variant="outline"
              borderRadius="full"
              startIcon={<AddIcon color={colors.primary[700]} />}
              onPress={() => {
                router.push({
                  pathname: Routes.SELECT_OUTGOING,
                  params: {
                    ids: ids ? ids : "",
                  },
                });
              }}
            >
              Add Product
            </Button>
            <Button
              size="sm"
              variant="outline"
              borderRadius="full"
              startIcon={<ScanIcon color={colors.primary[700]} />}
              onPress={() => router.push({
                pathname: Routes.BARCODE,
                params: {
                  nextRoute: Routes.NEW_OUTGOING,
                  ids: ids ? ids : "",
                },
              })}
            >
              Scan
            </Button>
          </Column>
        </Column>
      </VStack>
    </Column>
  );
};

export default OutgoingNoProducts;

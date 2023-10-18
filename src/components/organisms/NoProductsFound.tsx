import { AddIcon, Button, NoProductsIcon } from "@listed-components/atoms";
import { Routes } from "@listed-constants";
import { router } from "expo-router";
import { Text, Column, useTheme } from "native-base";

interface NoProductsFoundProps {
  filter?: "all" | "low stock" | "no stock";
}

const NoProductsFound = ({ filter = "all" }: NoProductsFoundProps) => {
  const { colors } = useTheme();

  return (
    <Column
      alignItems="center"
      justifyContent="center"
      mx={8}
      space={4}
      flex={1}
    >
      <NoProductsIcon />
      <Column space={1} alignSelf="stretch">
        <Text textAlign="center" fontSize="lg" fontWeight="semibold">
          No products
        </Text>
        {filter === "all" ? (
          <Text textAlign="center">You don't have any products added yet.</Text>
        ) : (
          <Text textAlign="center">{`You don't have any ${
            filter === "low stock" ? "LOW STOCK" : "NO STOCK"
          } products.`}</Text>
        )}
      </Column>
      {filter === "all" && (
        <Button
          size="sm"
          px="4"
          startIcon={<AddIcon color={colors.white} />}
          borderRadius="full"
          onPress={() => {
            router.push(Routes.NEW_PRODUCT);
          }}
        >
          Add Product
        </Button>
      )}
    </Column>
  );
};

export default NoProductsFound;

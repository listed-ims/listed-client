import { ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack } from "expo-router";
import { ProductListItem, HeaderSearchField } from "@listed-components/molecules";

const SelectProduct = () => {

  const data = [
    {
      id: 1,
      name: "Summit Water",
      variant: "100 ml",
      quantity: 100,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 2,
      name: "Coca Cola",
      variant: "100 ml",
      quantity: 200,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 3,
      name: "Chilsung Cider",
      variant: "100 ml",
      quantity: 80,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 4,
      name: "Sprite",
      variant: "100 ml",
      quantity: 400,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 5,
      name: "Soju",
      variant: "100 ml",
      quantity: 0,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 6,
      name: "Yakult",
      variant: "100 ml",
      quantity: 70,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 7,
      name: "Red Bull",
      variant: "100 ml",
      quantity: 800,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 8,
      name: "Triton",
      variant: "100 ml",
      quantity: 0,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 9,
      name: "Vitasoy",
      variant: "100 ml",
      quantity: 1000,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 10,
      name: "Orange Juice",
      variant: "200 ml",
      quantity: 150,
      threshold: 100,
      unit: "cartons",
    },
    {
      id: 11,
      name: "Milk",
      variant: "1 liter",
      quantity: 500,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 12,
      name: "Lemonade",
      variant: "250 ml",
      quantity: 75,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 13,
      name: "Iced Tea",
      variant: "500 ml",
      quantity: 300,
      threshold: 100,
      unit: "bottles",
    },
    {
      id: 14,
      name: "Sparkling Water",
      variant: "750 ml",
      quantity: 100,
      threshold: 100,
      unit: "bottles",
    }
  ]

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={{
        header: () => {
          return (<HeaderSearchField />)
        }
      }} />
      <FlatList
        ListHeaderComponent={
          <Box background="white" paddingTop="4" paddingBottom="4">
            <Text fontSize="lg" fontWeight="semibold">
              Select Product
            </Text>
          </Box>
        }
        ItemSeparatorComponent={() => <Divider />}
        data={data}
        renderItem={({ item }) => (
          <ProductListItem
            name={item.name}
            variant={item.variant}
            quantity={item.quantity}
            threshold={item.threshold}
            unit={item.unit}
          />
        )}
      />
    </ScreenContainer>
  );
};

export default SelectProduct;

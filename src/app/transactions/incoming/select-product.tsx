import { ScreenContainer } from "@listed-components/organisms";
import { Box, Column, Divider, FlatList, HStack, Text } from "native-base";
import { Stack } from "expo-router";
import { stackHeaderStyles } from "@listed-styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ProductListItem } from "@listed-components/molecules";
import { useState } from "react";

const SelectProduct = () => {
  const data = [
    {
      name: "Summit Water",
      variant: "100 ml",
      quantity: 100,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Coca Cola",
      variant: " 100 ml",
      quantity: 200,
      threshold: 100,
      unit: "bottles ",
    },
    {
      name: "Chilsung Cider",
      variant: "100 ml",
      quantity: 80,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Sprite",
      variant: "100 ml",
      quantity: 400,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Soju",
      variant: "100 ml",
      quantity: 0,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Summit Water",
      variant: "100 ml",
      quantity: 600,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Yakult",
      variant: "100 ml",
      quantity: 70,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Red Bull",
      variant: "100 ml",
      quantity: 800,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Triton",
      variant: "100 ml",
      quantity: 0,
      threshold: 100,
      unit: "bottles",
    },
    {
      name: "Vitasoy",
      variant: "100 ml",
      quantity: 1000,
      threshold: 100,
      unit: "bottles",
    },
  ];

  const [filter, setFilter] = useState<"all" | "low stock" | "no stock">("all");

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles()} />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Column>
          <HStack py="4">
            <Box background="white" paddingTop="4" paddingBottom="4">
              <Text fontSize="18px" fontWeight="semibold">
                Select Product
              </Text>
            </Box>
          </HStack>

          <Box>
            <FlatList
              ItemSeparatorComponent={() => <Divider />}
              data={data}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <ProductListItem
                  name={item.name}
                  variant={item.variant}
                  quantity={item.quantity}
                  threshold={item.threshold}
                  unit={item.unit}
                />
              )}
            ></FlatList>
          </Box>
        </Column>
      </KeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default SelectProduct;

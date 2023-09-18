import React, { useState } from "react";
import { Stack } from "expo-router";
import { stackHeaderStyles } from "@listed-styles";
import { ScreenContainer } from "@listed-components/organisms";
import {
  ProdcutListFilter,
  ProductListItem,
} from "@listed-components/molecules";
import {
  Column,
  HStack,
  VStack,
  Text,
  Box,
  FlatList,
  Divider,
} from "native-base";
import {
  AddIcon,
  Button,
  HeaderScanIcon,
  HeaderSearchIcon,
  StocksIcon,
} from "@listed-components/atoms";

const mock_data = [
  {
    id: 1,
    name: "Squeeze Bottle",
    variant: "Restoring Serum Foundation SPF 15 023",
    quantity: 89,
    threshold: 72,
    unit: "pcs",
  },
  {
    id: 2,
    name: "Lamb Rack - Ontario",
    variant: "Apidra SoloStar",
    quantity: 90,
    threshold: 55,
    unit: "pcs",
  },
  {
    id: 3,
    name: "Beer - Upper Canada Lager",
    variant: "Seborrheic",
    quantity: 70,
    threshold: 92,
    unit: "pcs",
  },
  {
    id: 4,
    name: "Chocolate - Chips Compound",
    variant: "Sinus Nighttime",
    quantity: 80,
    threshold: 20,
    unit: "pcs",
  },
  {
    id: 5,
    name: "Quail - Eggs, Fresh",
    variant: "Pin X",
    quantity: 3,
    threshold: 0,
    unit: "pcs",
  },
  {
    id: 6,
    name: "Juice - Prune",
    variant: "Nicotine",
    quantity: 64,
    threshold: 88,
    unit: "pcs",
  },
  {
    id: 7,
    name: "Appetizer - Escargot Puff",
    variant: "Coffea cruda",
    quantity: 98,
    threshold: 91,
    unit: "pcs",
  },
  {
    id: 8,
    name: "Broom - Angled",
    variant: "Haloperidol Decanoate",
    quantity: 0,
    threshold: 4,
    unit: "pcs",
  },
  {
    id: 9,
    name: "French Pastry - Mini Chocolate",
    variant: "Potassium Chloride",
    quantity: 47,
    threshold: 0,
    unit: "pcs",
  },
  {
    id: 10,
    name: "Sauce - White, Mix",
    variant: "Lipitor",
    quantity: 0,
    threshold: 89,
    unit: "pcs",
  },
  {
    id: 11,
    name: "Milk - 2%",
    variant: "Anefrin Nasal",
    quantity: 99,
    threshold: 60,
    unit: "pcs",
  },
  {
    id: 12,
    name: "Cape Capensis - Fillet",
    variant: "Sertraline Hydrochloride Tablets",
    quantity: 5,
    threshold: null,
    unit: "pcs",
  },
  {
    id: 13,
    name: "Corn Syrup",
    variant: "TREXIMET",
    quantity: 0,
    threshold: 18,
    unit: "pcs",
  },
  {
    id: 14,
    name: "Veal - Brisket, Provimi,bnls",
    variant: "Spectrum SPF 20 LC01 PURE BEIGE",
    quantity: 82,
    threshold: null,
    unit: "pcs",
  },
  {
    id: 15,
    name: "Napkin Colour",
    variant: "womens laxative",
    quantity: 35,
    threshold: 27,
    unit: "pcs",
  },
];

const Products = () => {
  const [products, setProducts] = useState(mock_data);
  const [filter, setFilter] = useState<"all" | "low stock" | "no stock">("all");

  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          ...stackHeaderStyles("Products"),
          headerRight: () => (
            <HStack space="4" alignItems="center">
              <HeaderSearchIcon />
              <HeaderScanIcon />
            </HStack>
          ),
        }}
      />
      <Column space="4" height="full" pt="4" py="6">
        <ProdcutListFilter
          filter={filter}
          handleSetFilter={(filter) => setFilter(filter)}
        />
        <HStack
          bg="muted.100"
          p="2"
          borderRadius="lg"
          alignSelf="flex-start"
          space="5"
        >
          <VStack justifyContent="space-between" space="1">
            <Text fontSize="2xs" fontWeight="medium" color="muted.600">
              Stocks On Hand
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              1000
            </Text>
          </VStack>
          <VStack justifyContent="flex-end">
            <StocksIcon />
          </VStack>
        </HStack>
        <Box flex={1}>
          <FlatList
            ItemSeparatorComponent={() => <Divider />}
            data={products}
            renderItem={({ item }) => (
              <ProductListItem
                name={item.name}
                variant={item.variant}
                quantity={item.quantity}
                threshold={item.threshold}
                unit={item.unit.toLowerCase()}
                onPress={() => { }}
              />
            )}
          />
        </Box>
        <Button
          alignSelf="flex-end"
          size="sm"
          px="4"
          startIcon={<AddIcon />}
          borderRadius="full"
          onPress={() => { }}
        >
          Add Product
        </Button>
      </Column>
    </ScreenContainer>
  );
};

export default Products;

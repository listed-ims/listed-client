import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { stackHeaderStyles } from "@listed-styles";
import { NoProductsFound, ScreenContainer } from "@listed-components/organisms";
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
  useTheme,
  Center,
} from "native-base";
import {
  AddIcon,
  Button,
  HeaderScanIcon,
  HeaderSearchIcon,
  StocksIcon,
} from "@listed-components/atoms";
import { ProductFilter, Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetProductList, useGetStoreDetails } from "src/hooks/queries";

const Products = () => {
  const [filter, setFilter] = useState<"all" | "low stock" | "no stock">("all");

  const { userDetails } = useAuth();

  const { colors } = useTheme();

  const {
    data: productList,
    isError: productListError,
    isFetching: productListFetching,
  } = useGetProductList(
    userDetails?.currentStoreId as number,
    undefined,
    undefined,
    filter === "all"
      ? undefined
      : filter === "low stock"
      ? ProductFilter.LOW_STOCK
      : ProductFilter.NO_STOCK,
    undefined,
    1,
    100
  );

  const {
    data: storeDetails,
    isError: storeError,
    isFetching: storeFetching,
  } = useGetStoreDetails(userDetails?.currentStoreId);

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
        <Box flex={1}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={<NoProductsFound />}
            ListHeaderComponent={() => (
              <HStack
                bg="muted.100"
                p="2"
                borderRadius="lg"
                alignSelf="flex-start"
                space="5"
                mb="4"
              >
                <VStack justifyContent="space-between" space="1">
                  <Text fontSize="2xs" fontWeight="medium" color="muted.600">
                    Stocks On Hand
                  </Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {storeDetails?.totalProducts}
                  </Text>
                </VStack>
                <VStack justifyContent="flex-end">
                  <StocksIcon />
                </VStack>
              </HStack>
            )}
            ItemSeparatorComponent={() => <Divider />}
            data={productList}
            renderItem={({ item }) => (
              <ProductListItem
                product={item}
                onPress={() => {
                  router.push(`${Routes.PRODUCTS}/${item.id}}`);
                }}
              />
            )}
          />
        </Box>
        {productList && productList.length > 0 ? (
          <Button
            alignSelf="flex-end"
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
        ) : undefined}
      </Column>
    </ScreenContainer>
  );
};

export default Products;

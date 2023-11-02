import React, { useCallback, useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import { stackHeaderStyles } from "@listed-styles";
import { NoProductsFound, ScreenContainer } from "@listed-components/organisms";
import {
  ProdcutListFilter,
  ProductListItem,
  ProductListLoadingSkeleton,
} from "@listed-components/molecules";
import {
  Column,
  HStack,
  Box,
  FlatList,
  Divider,
  useTheme,
  Pressable,
} from "native-base";
import {
  AddIcon,
  Button,
  HeaderScanIcon,
  HeaderSearchIcon,
} from "@listed-components/atoms";
import { GET_PRODUCT, ProductFilter, Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import { useGetProductList, useGetStoreDetails } from "src/hooks/queries";
import { ProductResponse } from "@listed-types";
import { useQueryClient } from "@tanstack/react-query";

const Products = () => {
  const [filter, setFilter] = useState<"all" | "low stock" | "no stock">("all");
  const { userDetails } = useAuth();
  const { colors } = useTheme();
  const queryClient = useQueryClient();
  const [noProducts, setNotProducts] = useState(true);

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

  const handleSelectItem = (item: ProductResponse) => {
    queryClient.setQueryData([GET_PRODUCT, item.id], item);
    router.push(`${Routes.PRODUCTS}/${item.id}}`);
  };

  useEffect(() => {
    if (filter === "all" && productList?.length! === 0)
      setNotProducts(true);
    else if (filter === "all" && productList?.length! > 0)
      setNotProducts(false);
  }, [filter]);
  }, [filter, productList]);

  const renderItem = useCallback((
    { item }: { item: ProductResponse }
  ) => (
    <ProductListItem
      product={item}
      onPress={() => handleSelectItem(item)}
    />
  ), [])

  const emptyList = productListFetching
  ? <ProductListLoadingSkeleton />
  : <NoProductsFound filter={noProducts ? "all" : filter}/>

  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          ...stackHeaderStyles("Products"),
          headerRight: () => (
            <HStack space="4" alignItems="center">
              <Pressable
                padding="1"
                borderRadius="full"
                _pressed={{ background: "muted.100" }}
                onPress={() =>
                  router.push({
                    pathname: Routes.SEARCH_PRODUCT,
                    params: {
                      nextRoute: Routes.PRODUCTS,
                    },
                  })
                }>
                <HeaderSearchIcon />
              </Pressable>
              <Pressable
                padding="1"
                borderRadius="full"
                _pressed={{ background: "muted.100" }}
                onPress={() =>
                  router.push({
                    pathname: Routes.BARCODE,
                    params: {
                      nextRoute: Routes.PRODUCTS,
                    },
                  })
                }
              >
                <HeaderScanIcon />
              </Pressable>
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
            ListEmptyComponent={emptyList}
            ItemSeparatorComponent={() => <Divider />}
            data={productList}
            renderItem={renderItem}
          />
        </Box>
        {productList?.length! > 0 || (filter !== "all" && !noProducts) ? (
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

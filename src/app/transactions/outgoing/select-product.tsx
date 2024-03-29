import React, { useState } from "react";
import { NoProductsFound, ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  HeaderSearchField,
  ProductListItem,
  ProductListLoadingSkeleton,
} from "@listed-components/molecules";
import { GET_PRODUCT, ProductFilter, Routes } from "@listed-constants";
import { useGetProductList } from "@listed-hooks";
import { useAuth } from "@listed-contexts";
import { Button } from "@listed-components/atoms";
import { useQueryClient } from "@tanstack/react-query";
import { ProductResponse } from "@listed-types";

const SelectProduct = () => {
  const { ids } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { userDetails } = useAuth();

  const {
    data: productList,
    isError: productListError,
    isFetching: productListFetching,
    hasNextPage: productListHasNextPage,
    fetchNextPage: productListFetchNextPage,
  } = useGetProductList(
    userDetails?.currentStoreId as number,
    undefined,
    undefined,
    ProductFilter.WITH_STOCK,
    undefined,
    50,
  );

  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

  const handleLongPress = (product: ProductResponse) => {
    setShowCheckboxes(true);
    handleCheckboxChange(product);
  };

  const handleCheckboxChange = (product: ProductResponse) => {
    const updatedSelectedProducts = [...selectedProducts];

    if (updatedSelectedProducts.includes(product.id)) {
      updatedSelectedProducts.splice(
        updatedSelectedProducts.indexOf(product.id),
        1
      );
    } else {
      queryClient.setQueryData([GET_PRODUCT, product.id], product);
      updatedSelectedProducts.push(product.id);
    }
    setSelectedProducts(updatedSelectedProducts);
  };

  const handleConfirm = () => {
    router.push({
      pathname: Routes.NEW_OUTGOING,
      params: {
        ids: !!ids
          ? `${ids},${selectedProducts.toString()}`
          : selectedProducts.toString(),
      },
    });
  };

  const handleSearch = () => {
    router.push({
      pathname: Routes.SEARCH_PRODUCT,
      params: {
        nextRoute: Routes.NEW_OUTGOING,
        ids: ids ? ids : "",
      },
    });
  };

  const data = productList?.pages
    .flatMap((page) => page)
    .filter(
      (product) => !ids?.toString().split(",").includes(product.id.toString())
    );

  const emptyList = productListFetching ? (
    <ProductListLoadingSkeleton />
  ) : (
    <NoProductsFound />
  );

  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          header: () => {
            return <HeaderSearchField onPress={handleSearch} />;
          },
        }}
      />
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={emptyList}
        ListHeaderComponent={
          <Box background="white">
            <Text fontSize="lg" fontWeight="semibold" py={4}>
              Select Product
            </Text>
            {productList && productList.pages[0].length > 0 ? (
              <Text fontSize="sm" fontWeight="medium" pb={4}>
                Selected Products: {selectedProducts.length}
              </Text>
            ) : undefined}
          </Box>
        }
        ItemSeparatorComponent={() => <Divider />}
        data={data}
        renderItem={({ item }) => (
          <ProductListItem
            product={item}
            showCheckbox={showCheckboxes}
            isChecked={selectedProducts.indexOf(item.id) != -1}
            onLongPress={() => handleLongPress(item)}
            onPress={() => {
              if (showCheckboxes) {
                handleCheckboxChange(item);
              } else {
                queryClient.setQueryData([GET_PRODUCT, item.id], item);
                router.push({
                  pathname: Routes.NEW_OUTGOING,
                  params: {
                    ids: !!ids
                      ? `${ids},${item.id.toString()}`
                      : item.id.toString(),
                  },
                });
              }
            }}
          />
        )}
        marginBottom="6"
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (!productListFetching && productListHasNextPage)
            productListFetchNextPage();
        }}
      />
      {showCheckboxes && (
        <Box background="white" pb="6">
          <Button onPress={handleConfirm}> SELECT PRODUCTS</Button>
        </Box>
      )}
    </ScreenContainer>
  );
};

export default SelectProduct;

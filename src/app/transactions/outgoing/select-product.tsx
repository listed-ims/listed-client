import React, { useState } from "react";
import { NoProductsFound, ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  HeaderSearchField,
  ProductListItem,
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
  } = useGetProductList(
    userDetails?.currentStoreId as number,
    undefined,
    undefined,
    ProductFilter.WITH_STOCK,
    undefined,
    1,
    100
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
      queryClient.setQueryData(
        [GET_PRODUCT, product.id],
        product
      );
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
  }

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
        ListEmptyComponent={<NoProductsFound />}
        ListHeaderComponent={
          <Box background="white">
            <Text fontSize="lg" fontWeight="semibold" py={4}>
              Select Product
            </Text>
            {productList && productList.length > 0 ? (
              <Text fontSize="sm" fontWeight="medium" pb={4}>
                Selected Products: {selectedProducts.length}
              </Text>
            ) : undefined}
          </Box>
        }
        ItemSeparatorComponent={() => <Divider />}
        data={productList?.filter(
          (product) =>
            !ids?.toString().split(",").includes(product.id.toString())
        )}
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
        marginBottom={4}
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

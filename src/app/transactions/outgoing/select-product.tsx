import React, { useState } from "react";
import { ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  HeaderSearchField,
  ProductListItem,
} from "@listed-components/molecules";
import { ProductFilter, Routes } from "@listed-constants";
import { useGetProductList } from "@listed-hooks";
import { useAuth } from "@listed-contexts";
import { Button } from "@listed-components/atoms";

const SelectProduct = () => {
  const { ids } = useLocalSearchParams();

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

  const handleLongPress = (productId: number) => {
    setShowCheckboxes(true);
    handleCheckboxChange(productId);
  };

  const handleCheckboxChange = (productId: number) => {
    const updatedSelectedProducts = [...selectedProducts];

    if (updatedSelectedProducts.includes(productId)) {
      updatedSelectedProducts.splice(
        updatedSelectedProducts.indexOf(productId),
        1
      );
    } else {
      updatedSelectedProducts.push(productId);
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

  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          header: () => {
            return <HeaderSearchField />;
          },
        }}
      />
      <FlatList
        ListHeaderComponent={
          <Box background="white" py="4">
            <Text fontSize="sm" fontWeight="medium">
              Selected Products: {selectedProducts.length}
            </Text>
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
            onLongPress={() => handleLongPress(item.id)}
            onPress={() => {
              if (showCheckboxes) {
                handleCheckboxChange(item.id);
              } else {
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

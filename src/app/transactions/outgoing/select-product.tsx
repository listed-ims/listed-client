import React, { useState } from "react";
import { ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack, router } from "expo-router";
import { HeaderSearchField, ProductListItem } from "@listed-components/molecules";
import { ProductFilter, Routes } from "@listed-constants";
import { useGetProductList } from "@listed-hooks";
import { useAuth } from "@listed-contexts";
import { Button } from "@listed-components/atoms";

const SelectProduct = () => {
  const [filter, setFilter] = useState<"all" | "low stock" | "no stock">("all");

  const { userDetails } = useAuth();

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
    console.log("Selected Products:", selectedProducts);
  };

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={{
        header: () => {
          return (<HeaderSearchField />)
        }
      }} />
      <FlatList
        ListHeaderComponent={
          <Box background="white" py="4">
            <Text fontSize="sm" fontWeight="medium">
              Selected Products: {selectedProducts.length}
            </Text>
          </Box>
        }
        ItemSeparatorComponent={() => <Divider />}
        data={productList}
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
                router.push(Routes.NEW_OUTGOING);
              }
            }}
          />   
        )}
      />
      {showCheckboxes && (
        <Box background="white" pt="4" pb="6">
          <Button onPress={handleConfirm}> SELECT PRODUCTS</Button>
        </Box>
      )}
    </ScreenContainer>
  );
};

export default SelectProduct;

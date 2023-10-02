import React, { useState } from "react";
import { ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack, router } from "expo-router";
import {
  ProductListItem,
  HeaderSearchField,
} from "@listed-components/molecules";
import { useGetProductList } from "src/hooks/queries";
import { ProductFilter, Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";

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

  return (
    <ScreenContainer withHeader>
      <Stack.Screen
        options={{
          header: () => {
            return <HeaderSearchField />;
          },
        }}
      />
      <FlatList marginBottom="6"
        ListHeaderComponent={
          <Box background="white" py="4">
            <Text fontSize="lg" fontWeight="semibold">
              Select Product
            </Text>
          </Box>
        }
        ItemSeparatorComponent={() => <Divider />}
        data={productList}
        renderItem={({ item }) => (
          <ProductListItem
            product={item}
            onPress={() => {
              router.push({
                pathname: Routes.NEW_INCOMING,
                params: {
                  productId: item.id,
                  product: `${item.name}${
                    item.variant ? ` - ${item.variant}` : ""
                  }`,
                },
              });
            }}
          />
        )}
      />
    </ScreenContainer>
  );
};

export default SelectProduct;

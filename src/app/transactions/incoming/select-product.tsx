import React from "react";
import { NoProductsFound, ScreenContainer } from "@listed-components/organisms";
import { Box, Divider, FlatList, Text } from "native-base";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  ProductListItem,
  HeaderSearchField,
} from "@listed-components/molecules";
import { useGetProductList } from "src/hooks/queries";
import { Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";

const SelectProduct = () => {
  const { route } = useLocalSearchParams<{route: Routes}>();

  const { userDetails } = useAuth();

  const {
    data: productList,
    isError: productListError,
    isFetching: productListFetching,
  } = useGetProductList(
    userDetails?.currentStoreId as number,
    undefined,
    undefined,
    undefined,
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
      <FlatList
        marginBottom="6"
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<NoProductsFound />}
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
                pathname: route === Routes.NEW_INCOMING ? Routes.NEW_INCOMING : Routes.TRANSACTIONS,
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

import React, { useState } from 'react'
import { ScreenContainer } from '@listed-components/organisms'
import { Column, Divider, FlatList, Input, Pressable, Row, Text } from 'native-base'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { BackIcon, SearchNotFound } from '@listed-components/atoms'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useDebounce, useGetProductList } from '@listed-hooks'
import { useAuth } from '@listed-contexts'
import { ProductListItem } from '@listed-components/molecules'
import { ProductResponse } from '@listed-types'
import { Routes } from '@listed-constants'

const SearchProducts = () => {
  const insets = useSafeAreaInsets();
  const { userDetails } = useAuth();
  const { nextRoute, ids, productId } = useLocalSearchParams<{
    nextRoute: Routes,
    ids: string[],
    productId: string
  }>();
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const {
    data: productList,
    isError: productListError,
    isFetching: productListFetching,
  } = useGetProductList(
    userDetails?.currentStoreId!,
    undefined,
    debouncedSearchQuery,
    undefined,
    undefined,
    1,
    100
  );

  const handleSelectItem = (item: ProductResponse) => {

    switch (nextRoute) {
      case Routes.NEW_INCOMING:
        router.push({
          pathname: Routes.NEW_INCOMING,
          params: {
            productId: item?.id,
            product: `${item?.name}${item?.variant
              ? ` - ${item?.variant}`
              : ""
              }`,
          },
        });
        break;
      case Routes.NEW_OUTGOING:
        router.push({
          pathname: Routes.NEW_OUTGOING,
          params: {
            ids: !!ids
              ? `${ids},${item?.id}`
              : item?.id,
          },
        });
        break;
      case Routes.PRODUCTS:
        router.replace(`${Routes.PRODUCTS}/${item?.id}`);
        break;
      case Routes.TRANSACTIONS:
        router.push({
          pathname: Routes.TRANSACTIONS,
          params: {
            productId: item?.id,
            product: `${item?.name}${item?.variant
              ? ` - ${item?.variant}`
              : ""
              }`,
          },
        })
      default:
        break;
    }
  }

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={{
        header() {
          return (
            <Row
              paddingTop={insets.top / 4}
              space="4"
              justifyContent="center"
              alignItems="center"
              paddingX="4"
            >
              <Pressable
                padding="2"
                borderRadius="full"
                _pressed={{ background: "muted.200" }}
                onPress={() => router.back()}
              >
                <BackIcon />
              </Pressable>
              <Input
                placeholder="Search products" variant="filled" size="lg"
                autoFocus={true}
                flex="1"
                _focus={{
                  borderColor: "none",
                  backgroundColor: "muted.100"
                }}
                onChangeText={(text) => setSearchQuery(text)}
              />
            </Row>
          )
        },
        animation: "fade",
      }} />
      {
        searchQuery.length > 0
          ? (
            productListFetching
              ? <Column alignItems="center" justifyContent="center" height="full">
                <Text>Loading...</Text>
              </Column> :
              <FlatList
                paddingY="4"
                contentContainerStyle={{ flexGrow: 1 }}
                ListEmptyComponent={() => (
                  <Column alignItems="center" justifyContent="center" height="full" space="4">
                    <SearchNotFound />
                    <Column alignItems="center" justifyContent="center" space="1">
                      <Text fontWeight="semibold" fontSize="lg">No product found</Text>
                      <Text textAlign="center">Try using another keyword.</Text>
                    </Column>
                  </Column>
                )
                }
                ItemSeparatorComponent={() => <Divider />}
                data={productList}
                renderItem={({ item }) => (
                  <ProductListItem
                    product={item}
                    onPress={() => (
                      handleSelectItem(item)
                    )}
                  />
                )}
              />
          )
          : <Column alignItems="center" justifyContent="center" height="full" space="1">
            <Text fontWeight="semibold" fontSize="lg">Looking for products?</Text>
            <Text textAlign="center">Search for a product using any keywords that matches with the product details.</Text>
          </Column>
      }
    </ScreenContainer >
  )
}

export default SearchProducts
import React from 'react'
import { ScreenContainer } from '@listed-components/organisms'
import { Column, Heading, Text } from 'native-base'
import { Button, CubeIcon } from '@listed-components/atoms'
import { Stack, router } from 'expo-router'
import { Routes } from '@listed-constants'
import ProductDetailsCard from '@listed-components/molecules/ProductDetailsCard'
import { stackHeaderStyles } from '@listed-styles'
import { ScrollView } from 'react-native'


const ProductDetails = () => {

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Product Details")} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <Column space="1" alignItems="center" marginBottom="2">
          <CubeIcon />
          <Heading size="md"> Nature's Spring</Heading>
          <Text color="darkText" fontSize="xs" fontWeight="md"> 100 ml </Text>
        </Column>
        <ProductDetailsCard
          barcode={123456789}
          saleprice={10}
          lowWarningpoint={20}
          stocksOnHand={100}
          totalIn={200}
          totalOut={50}
        />
        <Column marginTop="8" space="4" >
          <Button
            onPress={() => {
              router.push(Routes.EDIT_PRODUCT)
            }}>
            EDIT
          </Button>
          <Button variant="warnOutline">DELETE</Button>
        </Column>
      </ScrollView>
    </ScreenContainer>
  )
}

export default ProductDetails
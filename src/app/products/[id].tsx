import React, { useState } from 'react'
import { DeleteProductModal, ScreenContainer } from '@listed-components/organisms'
import { Column, Heading, Text } from 'native-base'
import { Button, CubeIcon } from '@listed-components/atoms'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { GET_PRODUCTS, ProductUnit, Routes } from '@listed-constants'
import { stackHeaderStyles } from '@listed-styles'
import { ScrollView } from 'react-native'
import {  useDeleteProductMutation, useGetProductDetails } from '@listed-hooks'
import { useQueryClient } from '@tanstack/react-query'
import ProductDetail from '@listed-components/molecules/ProductDetail'



const ProductDetails = ({}) => {
  const { id } = useLocalSearchParams();
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const queryClient = useQueryClient();

  const{
    data: productDetails,
    isError: productDetailsError,
    isFetching: productDetailsFetching,
  } = useGetProductDetails(parseInt(id as string));
  
  const{
    mutate: deleteProduct,
    isError: deleteProductError,
    isLoading: deleteProductLoading,
  }= useDeleteProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS] });
      setShowDeleteProductModal(false);
       router.push(Routes.PRODUCTS)
    },
    onError: (error) => {
      console.log("Error in deleting product.");
      console.error({ ...error });
    },
  })
      

  const handleOnDelete = () => {
    deleteProduct(productDetails?.id!)
  };

  
  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Product Details")} />
      <Column space="4" height="full" paddingTop="6">
        <ScrollView showsVerticalScrollIndicator={false}>
          <Column space="1" alignItems="center" marginBottom="2">
            <CubeIcon />
            <Heading size="md">{productDetails?.name} </Heading>
            <Text color="darkText" fontSize="xs" fontWeight="md" >{productDetails?.variant} </Text>
          </Column>
  
          <ProductDetail
            barcode={productDetails?.barcode ? productDetails.barcode : "N/A"}
            salePrice={productDetails?.salePrice}
            threshold={productDetails?.threshold }
            unit= {productDetails?.unit}
            quantity={productDetails?.quantity}
            totalIn={productDetails?.totalIn}
            totalOut={productDetails?.totalOut}
          />
          
          <Column marginTop="8" marginBottom="6" space="4" >
            <Button
              onPress={() => {
                router.push(`${Routes.EDIT_PRODUCT}?productId=${productDetails?.id}`)
              }}>
              EDIT
            </Button>
            <Button variant="warnOutline" onPress={()=> setShowDeleteProductModal(true)}>DELETE</Button>
            <DeleteProductModal
              isOpen = {showDeleteProductModal}
              onCancel={() => setShowDeleteProductModal(false)}
              onDelete = {handleOnDelete}
           />
          </Column>
        </ScrollView>
      </Column>
    </ScreenContainer>
  )
}

export default ProductDetails
import React, { useEffect, useState } from 'react'
import { DeleteProductModal, ScreenContainer } from '@listed-components/organisms'
import { Column, Heading, Text, useToast } from 'native-base'
import { Button, CubeIcon } from '@listed-components/atoms'
import { Stack, router, useLocalSearchParams } from 'expo-router'
import { GET_PRODUCT, GET_PRODUCTS, Routes } from '@listed-constants'
import { stackHeaderStyles } from '@listed-styles'
import { ScrollView } from 'react-native'
import { useDeleteProductMutation, useGetProductDetails } from '@listed-hooks'
import { useQueryClient } from '@tanstack/react-query'
import { ProductDetail, Toast } from '@listed-components/molecules'
import { UserPermission } from '@listed-types'
import { hasPermission } from '@listed-utils'
import { useAuth } from '@listed-contexts'


const ProductDetails = () => {
  const { userMembership } = useAuth();
  const { id } = useLocalSearchParams();
  const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
  const queryClient = useQueryClient();
  const toast = useToast();
  
  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.VIEW_PRODUCT_DETAILS
    ))
      router.replace(Routes.UNAUTHORIZED)
  }, [userMembership])

  const {
    data: productDetails,
    isError: productDetailsError,
    isFetching: productDetailsFetching,
    error: productDetailsErrorDetails,
  } = useGetProductDetails(parseInt(id as string));

  const {
    mutate: deleteProduct,
    isError: deleteProductError,
    isLoading: deleteProductLoading,
  } = useDeleteProductMutation({
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
    if(productDetails && productDetails?.quantity  !== undefined && productDetails.quantity > 0){
      toast.show({ 
        render: () => {
          return <Toast message='Product with stocks cannot be deleted.' hasStock= {true} />
        }
      });
    }else{
      setShowDeleteProductModal(true);
    }
  };

  useEffect(() => {
    if (productDetailsErrorDetails?.response?.status === 404) {
      router.replace(Routes.PRODUCT_NOT_FOUND);
    }
  }, [productDetailsErrorDetails])

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Product Details")} />
      {
        productDetailsFetching
          ? <Text>Loading... </Text>
          : <Column space="4" height="full" paddingTop="6">
            <ScrollView showsVerticalScrollIndicator={false}>
              <Column space="1" alignItems="center" marginBottom="2">
                <CubeIcon />
                <Heading size="md">{productDetails?.name} </Heading>
                <Text color="darkText" fontSize="xs" fontWeight="md" >{productDetails?.variant} </Text>
              </Column>

              <ProductDetail
                barcode={productDetails?.barcode}
                salePrice={productDetails?.salePrice}
                threshold={productDetails?.threshold}
                unit={productDetails?.unit}
                quantity={productDetails?.quantity}
                totalIn={productDetails?.totalIn}
                totalOut={productDetails?.totalOut}
              />

              <Column marginTop="8" marginBottom="6" space="4" >
                <Button
                  onPress={() => {
                    queryClient.setQueryData([GET_PRODUCT, productDetails?.id], productDetails)
                    router.push(`${Routes.EDIT_PRODUCT}?productId=${productDetails?.id}`)
                  }}>
                  EDIT
                </Button>
                <Button variant="warnOutline" onPress={handleOnDelete}>DELETE</Button>
                <DeleteProductModal
                  isOpen={showDeleteProductModal}
                  onCancel={() => setShowDeleteProductModal(false)}
                  onDelete={() => {
                    deleteProduct(productDetails?.id!);
                    setShowDeleteProductModal(false);
                  }}
                />
              </Column>
            </ScrollView>
          </Column>
      }
    </ScreenContainer>
  )
}

export default ProductDetails
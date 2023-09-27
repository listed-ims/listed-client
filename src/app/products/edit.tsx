import { FormControl, TextField, Toast } from '@listed-components/molecules'
import ScreenContainer from '@listed-components/organisms/ScreenContainer'
import { Box, Column, Row, Text, useToast} from 'native-base'
import React, {} from 'react'
import { Stack, router, useLocalSearchParams, useNavigation } from 'expo-router'
import { Button, ScanIcon } from "@listed-components/atoms";
import { stackHeaderStyles } from '@listed-styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useFormValidation, useGetProductDetails, useUpdateProductMutation, } from '@listed-hooks'
import { useQueryClient } from '@tanstack/react-query'
import { ValidationRules, UpdateRequest, } from '@listed-types'
import { GET_PRODUCT, GET_PRODUCTS, Routes } from '@listed-constants'

const EditProduct = () => {
  const { productId } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const toast = useToast();


  const handleCancel = () => {
    navigation.goBack();
  }

  const{
    data: productDetails,
    isError: productDetailsError,
    isFetching: productDetailsFetching,
  } = useGetProductDetails(parseInt(productId as string));

  const initialFormData = {
    name: productDetails?.name,
    barcode: productDetails?.barcode,
    variant: productDetails?.variant,
    "sale price": String(productDetails?.salePrice),
    threshold: String(productDetails?.threshold),
  };

  const validationRules: ValidationRules = {
    product: { required: true },
    "sale price": {
      required: true,
      custom: (value: string) => {
        return parseFloat(value) >= 0.0;
      },
      customErrorMessage: "Sale price should be a minimum of 0.00",
    },
    threshold: {
      custom: (value: string) => {
        return value.length === 0 || parseFloat(value) >= 0.0;
      },
      customErrorMessage: "Low warning point should be a minimum of 0",
    },
  };

  const { formData, errors, validate, handleInputChange } = useFormValidation(
    initialFormData,
    validationRules
  );

  const {
    mutate: updateProduct,
    isError: updateProductError,
    isLoading: updateProductLoading,
  } = useUpdateProductMutation({
    onSuccess: (data) => {
      queryClient.setQueryData([GET_PRODUCT, data.id], data);
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS]});
      router.push(Routes.PRODUCTS);
      toast.show({ 
        render:() =>{
          return <Toast message='Product details updated.'/>
        }
      })
      
    },
    onError: (error) => {
      console.log("Error in Updating product.");
      console.error({...error});
    },
  });
  
  const handleSave = () => {
    updateProduct({productId: productDetails?.id,
      productRequest: {
        name: formData.name,
        barcode: formData.barcode,
        variant: formData.variant,
        salePrice: formData["sale price"],
        threshold: formData.threshold,
        unit: productDetails?.unit
      },
    } as UpdateRequest);
  };

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Edit Product")} />
      <KeyboardAwareScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <Column>
          <Row paddingY="6">
            <Text fontSize="18px" fontWeight="600">Edit Product Details</Text>
          </Row>
          <FormControl label="Product" errorMessage={errors.name}>
            <TextField flex="1" placeholder="Enter product name" value ={formData.name} onChangeText={(value) => handleInputChange(value, "name")} />

          </FormControl>
          <FormControl label={
            <>
              <Text fontWeight="medium" fontSize="sm">Barcode</Text>
              <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
            </>
          }
          >
            <Row space="2">
              <TextField flex="1" placeholder='Scan barcode' value={formData.barcode} onChangeText={(value) => handleInputChange(value, "barcode")} />
              <Button fontSize="sm" startIcon={<ScanIcon />}>Scan</Button>
            </Row>
          </FormControl>
          <FormControl label={
            <>
              <Text fontWeight="medium" fontSize="sm">Variant</Text>
              <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
            </>
          }
          >
            <TextField placeholder='Enter variant' value ={formData.variant} onChangeText={(value) => handleInputChange(value, "variant")} />
          </FormControl>

          <FormControl label="Sale Price per Item" errorMessage={errors.salePrice} isInvalid={!!errors.salePrice}>

            <TextField flex="1" placeholder='Enter sale price' value ={formData["sale price"]}
              onChangeText={(value) => handleInputChange(value, "sale price")} startDataLabel={'Php'} />
          </FormControl>

          <FormControl label={
            <>
              <Text fontWeight="medium" fontSize="sm">Low Warning Point</Text>
              <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
            </>
          }
            errorMessage={errors.threshold}
            isInvalid={!!errors.threshold}
          >
            <TextField placeholder="Enter low warning point" value= {formData.threshold} onChangeText={(value) => handleInputChange(value, "threshold")} endDataLabel={productDetails?.unit} />
          </FormControl>
        </Column>
      </KeyboardAwareScrollView>
      <Box background=" white" paddingTop="4" paddingBottom="6">
        <Row space="4" >
          <Button flex="1" onPress={handleSave} >Save</Button>
          <Button flex="1" variant="outline" onPress={handleCancel}>Cancel</Button>
        </Row>
      </Box>
     
    </ScreenContainer> 
  )
}
export default EditProduct
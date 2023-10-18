import { FormControl, TextField, Toast } from '@listed-components/molecules'
import ScreenContainer from '@listed-components/organisms/ScreenContainer'
import { Box, Column, Row, Text, useTheme, useToast } from 'native-base'
import React, { useEffect } from 'react'
import { Stack, router, useLocalSearchParams} from 'expo-router'
import { Button, ScanIcon } from "@listed-components/atoms";
import { stackHeaderStyles } from '@listed-styles'
import { useDebounce, useFormValidation, useGetProductDetails, useUpdateProductMutation, useValidateBarcode, } from '@listed-hooks'
import { useQueryClient } from '@tanstack/react-query'
import { ValidationRules, UpdateRequest, UserPermission, } from '@listed-types'
import { GET_ANALYTICS_SUMMARY, GET_PRODUCT, GET_PRODUCTS, Routes } from '@listed-constants'
import { useAuth } from '@listed-contexts'
import { KeyboardAwareScroll, renderUnauthorizedModal } from '@listed-components/organisms'
import { hasPermission } from '@listed-utils'

const EditProduct = () => {
  const { productId, barcode } = useLocalSearchParams<{ productId: string, barcode: string }>();
  const queryClient = useQueryClient();
  const { userDetails, userMembership } = useAuth();
  const toast = useToast();
  const { colors } = useTheme();

  const handleCancel = () => {
    router.back();
  }

  const {
    data: productDetails,
    isError: productDetailsError,
    isFetching: productDetailsFetching,
  } = useGetProductDetails(parseInt(productId as string));

  const initialFormData = {
    "product name": productDetails?.name,
    barcode: productDetails?.barcode,
    variant: productDetails?.variant,
    "sale price": String(productDetails?.salePrice),
    threshold: productDetails?.threshold,
  };

  const validationRules: ValidationRules = {
    "product name": { required: true },
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

  useEffect(() => {
    if (barcode) {
      handleInputChange(barcode, "barcode");
    }
  }, [barcode])

  const {
    mutate: updateProduct,
    isError: updateProductError,
    isLoading: updateProductLoading,
  } = useUpdateProductMutation({
    onSuccess: (data) => {
      queryClient.setQueryData([GET_PRODUCT, data.id], data);
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS] });
      queryClient.invalidateQueries({queryKey: [GET_ANALYTICS_SUMMARY]})
      router.back();
      toast.show({
        render: () => {
          return <Toast message='Product details updated.' />
        }
      })

    },
    onError: (error) => {
      console.log("Error in Updating product.");
      console.error({ ...error });
    },
  });

  const debouncedBarcode = useDebounce(formData.barcode, 300);

  const {
    data: barcodeValidation,
    isError: barcodeValidationError,
    isFetching: barcodeValidationFetching,
  } = useValidateBarcode(
    userDetails?.currentStoreId as number,
    debouncedBarcode
  );

  const handleSave = () => {
    if(JSON.stringify(initialFormData) === JSON.stringify(formData)) router.back();
    else if (validate() && (formData.barcode === initialFormData.barcode || barcodeValidation?.valid !== false)) {
      updateProduct({
        productId: productDetails?.id,
        productRequest: {
          name: formData["product name"],
          barcode: formData.barcode,
          variant: formData.variant,
          salePrice: formData["sale price"],
          threshold: formData.threshold,
          unit: productDetails?.unit
        },
      } as UpdateRequest);
    }
  };

  const handleAuthorization = () => {
    return renderUnauthorizedModal(
      !hasPermission(
        userMembership?.permissions!,
        UserPermission.UPDATE_PRODUCT
      )
    )
  }

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Edit Product")} />
      {handleAuthorization()}
      <KeyboardAwareScroll
        elementOnTopOfKeyboard={
          <Box background=" white" paddingTop="4" paddingBottom="6">
            <Row space="4" >
              <Button flex="1" onPress={handleSave}>SAVE</Button>
              <Button flex="1" variant="outline" onPress={handleCancel}>CANCEL</Button>
            </Row>
          </Box>}
      >
        <Column>
          <Row paddingY="6">
            <Text fontSize="18px" fontWeight="600">Edit Product Details</Text>
          </Row>
          <FormControl label="Product"
            errorMessage={errors["product name"]}
            isInvalid={!!errors["product name"]}>
            <TextField flex="1"
              placeholder="Enter product name"
              value={formData["product name"]}
              onChangeText={(value) => handleInputChange(value, "product name")} />

          </FormControl>
          <FormControl label={
            <>
              <Text fontWeight="medium" fontSize="sm">Barcode</Text>
              <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
            </>
          }
            errorMessage={initialFormData.barcode !== formData.barcode && barcodeValidation?.valid === false
              ? "Barcode must be unique."
              : ""}
            isInvalid={initialFormData.barcode !== formData.barcode && barcodeValidation?.valid === false}
          >
            <Row space="2">
              <TextField flex="1"
                placeholder='Scan barcode'
                value={formData.barcode}
                onChangeText={(value) => handleInputChange(value, "barcode")} />
              <Button
                onPress={() => router.push({
                  pathname: Routes.BARCODE,
                  params: {
                    nextRoute: Routes.EDIT_PRODUCT,
                    productId: productDetails?.id,
                  }
                })}
                fontSize="sm"
                startIcon={<ScanIcon color={colors.white} />}>
                Scan
              </Button>
            </Row>
          </FormControl>
          <FormControl label={
            <>
              <Text fontWeight="medium" fontSize="sm">Variant</Text>
              <Text fontWeight="medium" fontSize="sm" color="text.500">{" "}(optional)</Text>
            </>
          }
          >
            <TextField placeholder='Enter variant'
              value={formData.variant}
              onChangeText={(value) => handleInputChange(value, "variant")} />
          </FormControl>

          <FormControl label="Sale Price per Item"
            errorMessage={errors["sale price"]}
            isInvalid={!!errors["sale price"]}>

            <TextField flex="1"
              placeholder='Enter sale price'
              keyboardType="numeric"
              value={formData["sale price"]}
              onChangeText={(value) => handleInputChange(value, "sale price")}
              startDataLabel={'Php'} />
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
            <TextField placeholder="Enter low warning point"
              keyboardType="numeric"
              value={formData.threshold ? String(formData.threshold) : ""}
              onChangeText={(value) => handleInputChange(value, "threshold")}
              endDataLabel={productDetails?.unit} />
          </FormControl>
        </Column>
      </KeyboardAwareScroll>


    </ScreenContainer>
  )
}
export default EditProduct
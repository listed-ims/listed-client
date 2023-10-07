import { Button, ScanIcon, SelectButton } from "@listed-components/atoms";
import { FormControl, TextField } from "@listed-components/molecules";
import {
  KeyboardAwareScroll,
  ScreenContainer,
  renderUnauthorizedModal,
} from "@listed-components/organisms";
import { GET_PRODUCTS, ProductUnit, Routes } from "@listed-constants";
import { useAuth } from "@listed-contexts";
import {
  useAddProductMutation,
  useDebounce,
  useFormValidation,
  useValidateBarcode,
} from "@listed-hooks";
import { stackHeaderStyles } from "@listed-styles";
import { AddProductRequest, UserPermission, ValidationRules } from "@listed-types";
import { hasPermission } from "@listed-utils";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, router } from "expo-router";
import { VStack, Text, HStack, Box, Column, useTheme } from "native-base";
import React from "react";

const NewProduct = () => {
  const queryClient = useQueryClient();
  const { userDetails, userMembership } = useAuth();

  const initialFormData = {
    "product name": "",
    barcode: "",
    variant: "",
    "sale price": "",
    threshold: "",
    unit: ProductUnit.PCS,
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

  const handleAddProduct = () => {
    if (validate() && barcodeValidation?.valid !== false) {
      addProduct({
        storeId: userDetails?.currentStoreId,
        productRequest: {
          name: formData["product name"],
          barcode: formData.barcode,
          variant: formData.variant,
          salePrice: formData["sale price"],
          threshold: formData.threshold,
          unit: formData.unit,
        },
      } as AddProductRequest);
    }
  };

  const debouncedBarcode = useDebounce(formData.barcode, 300);

  const {
    data: barcodeValidation,
    isError: barcodeValidationError,
    isFetching: barcodeValidationFetching,
  } = useValidateBarcode(
    userDetails?.currentStoreId as number,
    debouncedBarcode
  );

  const {
    mutate: addProduct,
    isError: addProductError,
    isLoading: addProductLoading,
  } = useAddProductMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PRODUCTS] });
      router.push(Routes.PRODUCTS);
    },
    onError: (error) => {
      console.log("Product not added.");
      console.error({ ...error });
    },
  });

  const { colors } = useTheme();

  const handleAuthorization = () => {
    return renderUnauthorizedModal(
      !hasPermission(
        userMembership?.permissions!,
        UserPermission.ADD_PRODUCT
      )
    )
  }

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("New Product")} />
      {handleAuthorization()}
      <KeyboardAwareScroll
        elementOnTopOfKeyboard={
          <Box pt="4" pb="6" background="white">
            <Button size="lg" onPress={handleAddProduct}>
              ADD PRODUCT
            </Button>
          </Box>
        }
      >
        <Column flex="1">
          <VStack py="4">
            <Text fontSize="lg" fontWeight="semibold">
              Enter Product Details
            </Text>
          </VStack>
          <VStack>
            <FormControl
              label="Product"
              errorMessage={errors["product name"]}
              isInvalid={!!errors["product name"]}
            >
              <TextField
                onChangeText={(value) => handleInputChange(value, "product name")}
                placeholder="Enter product name"
              />
            </FormControl>
            <FormControl
              label={
                <>
                  <Text fontWeight="medium" fontSize="sm">
                    Barcode
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="text.500">
                    {" "}
                    (optional)
                  </Text>
                </>
              }
              errorMessage={
                barcodeValidation?.valid === false
                  ? "Barcode must be unique."
                  : ""
              }
              isInvalid={barcodeValidation?.valid === false}
            >
              <HStack space="2">
                <TextField
                  flex="1"
                  onChangeText={(value) => {
                    handleInputChange(value, "barcode");
                  }}
                  placeholder="Scan barcode"
                />
                <Button
                  onPress={() => router.push(Routes.BARCODE)}
                  startIcon={<ScanIcon color={colors.white} />}>
                  Scan
                </Button>
              </HStack>
            </FormControl>
            <FormControl
              label={
                <>
                  <Text fontWeight="medium" fontSize="sm">
                    Variant
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="text.500">
                    {" "}
                    (optional)
                  </Text>
                </>
              }
              errorMessage={errors.variant}
              isInvalid={!!errors.variant}
            >
              <TextField
                onChangeText={(value) => handleInputChange(value, "variant")}
                placeholder="Enter variant"
              />
            </FormControl>
            <FormControl
              label="Product Unit"
              errorMessage={errors.unit}
              isInvalid={!!errors.unit}
            >
              <HStack space="2">
                <SelectButton
                  label="pieces"
                  selected={formData.unit === ProductUnit.PCS}
                  onPress={() => handleInputChange(ProductUnit.PCS, "unit")}
                />
                <SelectButton
                  label="kilograms"
                  selected={formData.unit === ProductUnit.KG}
                  onPress={() => handleInputChange(ProductUnit.KG, "unit")}
                />
              </HStack>
            </FormControl>
            <FormControl
              label="Sale Price"
              errorMessage={errors["sale price"]}
              isInvalid={!!errors["sale price"]}
            >
              <TextField
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(value, "sale price")}
                placeholder="Enter sale price"
              />
            </FormControl>
            <FormControl
              label={
                <>
                  <Text fontWeight="medium" fontSize="sm">
                    Low Warning Point
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="text.500">
                    {" "}
                    (optional)
                  </Text>
                </>
              }
              errorMessage={errors.threshold}
              isInvalid={!!errors.threshold}
            >
              <TextField
                keyboardType="numeric"
                onChangeText={(value) => handleInputChange(value, "threshold")}
                placeholder="Enter low warning point"
              />
            </FormControl>
          </VStack>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  );
};

export default NewProduct;

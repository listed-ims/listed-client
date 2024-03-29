import React, { useEffect, useState } from "react";
import {
  Text,
  HStack,
  Column,
  View,
  Box,
  useTheme,
  Pressable,
  Row
} from "native-base";
import {
  Button,
  CloseIcon,
  IconButton,
  ScanIcon,
  SearchIcon
} from "@listed-components/atoms";
import { FormControl, TextArea, TextField } from "@listed-components/molecules";
import { KeyboardAwareScroll, ScreenContainer } from "@listed-components/organisms";
import { Stack, router, useLocalSearchParams } from "expo-router";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { GET_ANALYTICS_SUMMARY, GET_INCOMING, ProductUnit, Routes } from "@listed-constants";
import { stackHeaderStyles } from "@listed-styles";
import { dateToMMDDYY, hasPermission, localeStringToDate } from "@listed-utils";
import { IncomingRequest, UserPermission, ValidationRules } from "@listed-types";
import { useCreateIncomingMutation, useFormValidation, useGetProductDetails } from "@listed-hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@listed-contexts";


const NewIncoming = () => {
  const { colors } = useTheme();
  const [expirationDisplay, setExpirationDisplay] = useState("");
  const [expirationDate, setExpirationDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { productId, product } = useLocalSearchParams();
  const { userMembership } = useAuth();
  const queryClient = useQueryClient();
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);

  const {
    data: productDetails,
    isError: productDetailsError,
    isFetching: productDetailsFetching,
    error: productDetailsErrorDetails,
  } = useGetProductDetails(parseInt(productId as string));

  useEffect(() => {
    if (!hasPermission(
      userMembership!,
      UserPermission.ADD_INCOMING
    )) {
      router.replace(Routes.UNAUTHORIZED)
    }
  }, [userMembership])

  const initialFormData = {
    product: "",
    "expiration date": "",
    quantity: "",
    "purchase price": "",
    comment: "",
  }

  const validationRules: ValidationRules = {
    product: { required: true },
    "expiration date": { required: false },
    quantity: {
      required: true,
      custom(value) {
        if (productDetails?.unit === ProductUnit.KG) {
          return true;
        } else {  
          return Number.isInteger(parseFloat(value));
        }
      },
      customErrorMessage: `Decimal values are not allowed for product unit ${productDetails?.unit}.`
    },
    "purchase price": { 
      required: true,
      custom(value) {
        if (value && parseInt(value) >= productDetails?.salePrice!) {
          return false; 
        }
        return true; 
      },
      customErrorMessage: "Sale price must be greater than purchase price."
     },
    comment: { required: false, }
  }

  const { formData, errors, validate, handleInputChange, resetForm } = useFormValidation(
    initialFormData,
    validationRules
  );

  useEffect(() => {
    if (productId) {
      handleInputChange(productId, "product");
    }
  }, [productId]);

  const onDateChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined
  ) => {
    if (date === undefined) return;
    const selectedDate = localeStringToDate(
      date.toLocaleString('en-US', {
        timeZone: 'Asia/Singapore',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZoneName: 'short',
      }))
    setShowDatePicker(false);
    if (event.type === "dismissed") return;
    setExpirationDate(selectedDate!);
    handleInputChange(selectedDate, "expiration date");
    if (selectedDate instanceof Date) {
      setExpirationDisplay(dateToMMDDYY(selectedDate));
    }
  };

  const handleCreateIncoming = () => {
    if (validate()) {
      createIncoming([
        {
          expirationDate: expirationDisplay ? new Date(formData["expiration date"]) : null,
          initialQuantity: formData.quantity,
          purchasePrice: formData["purchase price"],
          comment: formData.comment,
        } as IncomingRequest,
        parseInt(formData.product)
      ]);
    }
  }

  const {
    mutate: createIncoming,
    isError: createIncomingError,
    isLoading: createIncomingLoading } = useCreateIncomingMutation({
      onSuccess(data) {
        resetForm();
        setExpirationDisplay("");
        queryClient.setQueryData([GET_INCOMING, data.id], data);
        queryClient.invalidateQueries({ queryKey: [GET_ANALYTICS_SUMMARY] })
        router.push(`${Routes.INCOMING_RECEIPT}?transactionId=${data.id}`);
      }
    });

  
    
  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Incoming")} />
      <KeyboardAwareScroll elementOnTopOfKeyboard={
        <Box background="white" paddingTop="4" paddingBottom="6">
          <Button 
            size="lg"
            isLoading={createIncomingLoading}
            isLoadingText="SUBMITTING TRANSACTION"
            spinnerPlacement="end"
            onPress={handleCreateIncoming}
          >SUBMIT TRANSACTION</Button>
        </Box>
      }>
        <Column>
          <HStack py="4">
            <Text fontSize="lg" fontWeight="semibold">
              Enter Transaction Details
            </Text>
          </HStack>
          <FormControl
            label="Product"
            errorMessage={errors.product}
            isInvalid={!!errors.product}
          >
            <HStack space="2">
              <Pressable style={{ flex: 1 }}
                onPress={() => {
                  router.push({
                    pathname: Routes.SELECT_PRODUCT,
                    params: {
                      route: Routes.NEW_INCOMING,
                    },
                  })
                }}>
                <TextField
                  pointerEvents="none"
                  isReadOnly
                  flex="1"
                  placeholder="Select a product"
                  value={product?.toString()}
                  rightElement={
                    <View marginX="3">
                      <SearchIcon />
                    </View>
                  }
                />
              </Pressable>
              <Button
                onPress={() => router.push({
                  pathname: Routes.BARCODE,
                  params: {
                    nextRoute: Routes.NEW_INCOMING,
                  },
                })}
                fontSize="sm" startIcon={<ScanIcon color={colors.white} />}>
                Scan
              </Button>
            </HStack>
          </FormControl>
          <FormControl
            errorMessage={errors["expiration date"]}
            isInvalid={!!errors["expiration date"]}
            label={
              <>
                <Text fontWeight="medium" fontSize="sm">
                  Expiration Date
                </Text>
                <Text fontWeight="medium" fontSize="sm" color="text.500">
                  {" "}
                  (optional)
                </Text>
              </>
            }
          >
            <Pressable onPress={() => {
              setExpirationDate(tomorrow)
              setShowDatePicker(true)
            }}
              style={{ flex: 1 }}>
              <TextField
                pointerEvents="box-none"
                isReadOnly
                flex="1"
                placeholder="Select expiration date"
                value={expirationDisplay}
                rightElement={expirationDisplay !== "" ?
                  <IconButton variant="subtle" marginRight="2"
                    icon={<CloseIcon />}
                    onPress={() => {
                      setExpirationDisplay("")
                    }
                    }
                  /> : undefined}
              />
            </Pressable>
            {showDatePicker && (
              <RNDateTimePicker
                accentColor={colors.primary[700]}
                minimumDate={tomorrow}
                value={expirationDate}
                mode="date"
                onChange={onDateChange}
              />
            )}
          </FormControl>
          <FormControl
            label="Quantity"
            errorMessage={errors.quantity}
            isInvalid={!!errors.quantity}>
            <TextField
              onChangeText={(value) => handleInputChange(value, "quantity")}
              value={formData.quantity}
              keyboardType="numeric"
              placeholder="Enter product quantity" />
          </FormControl>

          <FormControl
            label="Purchase Price / Unit"
            errorMessage={errors["purchase price"]}
            isInvalid={!!errors["purchase price"]}>
            <TextField
              onChangeText={(value) => handleInputChange(value, "purchase price")}
              value={formData["purchase price"]}
              keyboardType="numeric"
              placeholder="Enter purchase price per unit" />
          </FormControl>
          <HStack>
            <FormControl
              helperText={
                <Row flex="1" justifyContent="flex-end">
                  <Text fontSize="xs" fontWeight="normal" color="text.500">
                    {formData.comment.length}/100
                  </Text>
                </Row>}
              label={
                <>
                  <Text fontWeight="medium" fontSize="sm">
                    Comment
                  </Text>
                  <Text fontWeight="medium" fontSize="sm" color="text.500">
                    {" "}
                    (optional)
                  </Text>
                </>
              }>
              <TextArea
                maxLength={100}
                onChangeText={(value) => handleInputChange(value, "comment")}
                value={formData.comment}
                placeholder="Enter comment here" />
            </FormControl>
          </HStack>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer >
  );
};

export default NewIncoming;
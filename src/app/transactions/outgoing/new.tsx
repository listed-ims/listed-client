import {
  AddIcon,
  Button,
  ScanIcon,
  SelectButton,
} from "@listed-components/atoms";
import { FormControl, TextArea } from "@listed-components/molecules";
import {
  KeyboardAwareScroll,
  ScreenContainer,
  OutProductItem,
  OutgoingNoProducts,
} from "@listed-components/organisms";
import { Stack, router, useLocalSearchParams } from "expo-router";
import {
  Text,
  HStack,
  Column,
  Box,
  ScrollView,
  VStack,
  Row,
  useTheme,
} from "native-base";
import { stackHeaderStyles } from "@listed-styles";
import { OutgoingCategory, Routes } from "@listed-constants";
import { useQueries } from "@tanstack/react-query";
import { getProductService } from "@listed-services";
import {
  OutProductRequest,
  OutProductResponse,
  ValidationRules,
} from "@listed-types";
import { useCreateOutgoingMutation, useFormValidation } from "@listed-hooks";
import { useEffect } from "react";
import { toCurrency } from "@listed-utils";

const NewOutgoing = () => {
  const { ids } = useLocalSearchParams();
  const { colors } = useTheme();

  const products = useQueries({
    queries: (ids?.toString().split(",") || []).map((id) => {
      return {
        queryKey: ["OUT_PRODUCTS", id],
        queryFn: () => getProductService(parseInt(id)),
        enabled: !!id,
      };
    }),
  });

  const initialFormData = {
    category: OutgoingCategory.SALES,
    products: [],
    comment: "",
  };

  const validationRules: ValidationRules = {
    category: { required: true },
    products: {
      custom: (value: OutProductResponse[]) => {
        return value.length > 0;
      },
      customErrorMessage: "Select at least 1 product.",
    },
    comment: { required: false },
  };

  const { formData, errors, validate, handleInputChange, resetForm } =
    useFormValidation(initialFormData, validationRules);

  useEffect(() => {
    products
      .filter((item) => item.isSuccess)
      .map((item) => {
        if (
          !formData.products.find(
            (product: OutProductRequest) => product.product.id === item.data?.id
          )
        )
          handleInputChange(
            [...formData.products, { product: item.data, quantity: 1 }],
            "products"
          );
      });
  }, [ids, products]);

  const handleOnDecrement = (id: number) => {
    const productIndex = formData.products.findIndex(
      (product: OutProductRequest) => product.product.id === id
    );
    if (productIndex !== -1) {
      const updatedProducts = [...formData.products];
      if (updatedProducts[productIndex].quantity > 1) {
        updatedProducts[productIndex].quantity--;
        handleInputChange(updatedProducts, "products");
      } else handleOnDelete(id);
    }
  };

  const handleOnIncrement = (id: number) => {
    const productIndex = formData.products.findIndex(
      (product: OutProductRequest) => product.product.id === id
    );
    if (productIndex !== -1) {
      const updatedProducts = [...formData.products];
      if (
        updatedProducts[productIndex].quantity <
        updatedProducts[productIndex].product.quantity
      )
        updatedProducts[productIndex].quantity++;
      handleInputChange(updatedProducts, "products");
    }
  };

  const handleOnDelete = (id: number) => {
    const updatedProducts = formData.products.filter(
      (product: OutProductRequest) => product.product.id != id
    );
    handleInputChange(updatedProducts, "products");
    router.setParams({
      ids:
        ids
          ?.toString()
          .split(",")
          .filter((item) => item != id.toString())
          .toString() || "",
    });
  };

  const totalPrice = formData.products.reduce(
    (total: number, item: OutProductResponse) => {
      const productPrice = item.product.salePrice || 0;
      return total + productPrice * item.quantity;
    },
    0
  );

  const handleCreateOutgoing = () => {
    if (validate()) {
      createOutgoing({
        products: formData.products,
        category: formData.category,
        comment: formData.comment,
      });
    }
  };

  const {
    mutate: createOutgoing,
    isError: createOutgoingError,
    isLoading: createOutgoingLoading,
  } = useCreateOutgoingMutation({
    onSuccess: (data) => {
      router.setParams({ ids: "" });
      resetForm();
      router.push(`${Routes.OUTGOING_RECEIPT}?transactionId=${data.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("Outgoing")} />
      <KeyboardAwareScroll
        elementOnTopOfKeyboard={
          formData.products.length !== 0 ? (
            <Box background="white" paddingTop="4" paddingBottom="6">
              <Row space="4" pb="4">
                <Button
                  flex="1"
                  size="sm"
                  variant="outline"
                  borderRadius="full"
                  startIcon={<ScanIcon color={colors.primary[700]} />}
                >
                  Scan
                </Button>
                <Button
                  flex="1"
                  size="sm"
                  variant="outline"
                  borderRadius="full"
                  startIcon={<AddIcon color={colors.primary[700]} />}
                  onPress={() => {
                    router.push({
                      pathname: Routes.SELECT_OUTGOING,
                      params: {
                        ids: ids ? ids : "",
                      },
                    });
                  }}
                >
                  Add Product
                </Button>
              </Row>
              <Button size="lg" onPress={handleCreateOutgoing}>
                <Row space={4}>
                  <Text color="white" fontWeight="500">
                    CHECKOUT
                  </Text>
                  <Text color="white" fontWeight="bold">
                    {toCurrency(totalPrice)}
                  </Text>
                </Row>
              </Button>
            </Box>
          ) : undefined
        }
      >
        <Column space="4" py="4">
          <VStack space={1}>
            <Text fontSize="sm" fontWeight="medium">
              Outgoing Category
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack space="2">
                <SelectButton
                  label="SALES"
                  selected={formData.category === OutgoingCategory.SALES}
                  onPress={() =>
                    handleInputChange(OutgoingCategory.SALES, "category")
                  }
                />
                <SelectButton
                  label="DEFECTS"
                  selected={formData.category === OutgoingCategory.DEFECTS}
                  onPress={() =>
                    handleInputChange(OutgoingCategory.DEFECTS, "category")
                  }
                />
                <SelectButton
                  label="EXPIRED"
                  selected={formData.category === OutgoingCategory.EXPIRED}
                  onPress={() =>
                    handleInputChange(OutgoingCategory.EXPIRED, "category")
                  }
                />
                <SelectButton
                  label="LOST"
                  selected={formData.category === OutgoingCategory.LOST}
                  onPress={() =>
                    handleInputChange(OutgoingCategory.LOST, "category")
                  }
                />
                <SelectButton
                  label="CONSUMED"
                  selected={formData.category === OutgoingCategory.CONSUMED}
                  onPress={() =>
                    handleInputChange(OutgoingCategory.CONSUMED, "category")
                  }
                />
              </HStack>
            </ScrollView>
          </VStack>
          {formData.products.length !== 0 ? (
            <>
              <Column space={1}>
                <Text fontSize="sm" fontWeight="medium">
                  Items
                </Text>
                <Column space={2}>
                  {formData.products.map((item: OutProductRequest) => (
                    <OutProductItem
                      name={item.product.name}
                      variant={item.product.variant}
                      price={item.product.salePrice as number}
                      quantity={item.quantity}
                      key={item.product.id}
                      onDecrement={() => handleOnDecrement(item.product.id)}
                      onIncrement={() => handleOnIncrement(item.product.id)}
                      onDelete={() => handleOnDelete(item.product.id)}
                    />
                  ))}
                </Column>
              </Column>
              <HStack>
                <FormControl
                  helperText={
                    <Row flex="1" justifyContent="flex-end">
                      <Text fontSize="xs" fontWeight="normal" color="text.500">
                        {formData.comment.length}/100
                      </Text>
                    </Row>
                  }
                  label={
                    <>
                      <Text fontWeight="medium" fontSize="sm">
                        Comment
                      </Text>
                    </>
                  }
                >
                  <TextArea
                    maxLength={100}
                    onChangeText={(value) =>
                      handleInputChange(value, "comment")
                    }
                    value={formData.comment}
                    placeholder="Input comment here"
                  />
                </FormControl>
              </HStack>
            </>
          ) : (
            <OutgoingNoProducts />
          )}
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  );
};

export default NewOutgoing;

import { Button, ScanIcon, SelectButton } from "@listed-components/atoms";
import { FormControl, TextField } from "@listed-components/molecules";
import {
  KeyboardAwareScroll,
  ScreenContainer,
} from "@listed-components/organisms";
import { stackHeaderStyles } from "@listed-styles";
import { Stack } from "expo-router";
import { VStack, Text, HStack, Box, Column } from "native-base";
import React from "react";

const NewProduct = () => {
  return (
    <ScreenContainer withHeader>
      <Stack.Screen options={stackHeaderStyles("New Product")} />
      <KeyboardAwareScroll
        elementOnTopOfKeyboard={
          <Box pt="4" pb="6" background="white">
            <Button size="lg">ADD PRODUCT</Button>
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
            <FormControl label="Product">
              <TextField placeholder="Enter product name" />
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
            >
              <HStack space="2">
                <TextField flex="1" placeholder="Scan barcode" />
                <Button startIcon={<ScanIcon />}>Scan</Button>
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
            >
              <TextField placeholder="Enter variant" />
            </FormControl>
            <FormControl label="Product Unit">
              <HStack space="2">
                <SelectButton label="pieces" selected={true} />
                <SelectButton label="kilograms" selected={false} />
              </HStack>
            </FormControl>
            <FormControl label="Sale Price">
              <TextField placeholder="Enter sale price" />
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
            >
              <TextField placeholder="Enter low warning point" />
            </FormControl>
          </VStack>
        </Column>
      </KeyboardAwareScroll>
    </ScreenContainer>
  );
};

export default NewProduct;

import React, { useState } from "react";
import ScreenContainer from "../../layout/ScreenContainer";
import { Column, Row, ScrollView } from "native-base";
import FormControl from "../../components/FormControl";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import { Keyboard } from "react-native";
import BarcodeField from "../../components/BarcodeField";
import { ProductDetailsNavigationProp, ProductDetailsRouteProp } from "../../types/navigation/NavigationScreenProps";

interface ProductDetailsProps {
  navigation: ProductDetailsNavigationProp;
  route: ProductDetailsRouteProp;
}

const ProductDetails = ({ route, navigation }: ProductDetailsProps) => {
  const [errors, setErrors] = useState({
    name: "",
    barcode: "",
    variant: "",
    salePrice: "",
    threshold: "",
  });
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({
    name: route.params.name,
    barcode: route.params.barcode,
    variant: route.params.variant,
    salePrice: String(route.params.salePrice),
    threshold: route.params.threshold,
  });

  // const [formData, setFormData] = useState(route.params);

  const validate = () => {
    Keyboard.dismiss();
    if (formData.name === "") {
      handleErrors("Please enter product name.", "name");
      return false;
    } else if (formData.salePrice === "") {
      handleErrors("Please enter sale price.", "salePrice");
      return false;
    } else if (
      isNaN(Number(formData.salePrice)) ||
      Number(formData.salePrice) < 0
    ) {
      handleErrors("Please enter a valid sale price.", "salePrice");
      return false;
    } else if (
      isNaN(Number(formData.threshold)) ||
      Number(formData.threshold) < 0
    ) {
      handleErrors("Please enter a valid threshold.", "threshold");
      return false;
    } else {
      return true;
    }
  };

  const handleErrors = (error: string, data: string) => {
    setErrors({ ...errors, [data]: error });
  };

  const handleOnchange = (value: string, data: string) => {
    setFormData({ ...formData, [data]: value });
  };

  const handleEdit = () => {
    navigation.setOptions({ title: "Edit Product" });
    setEditable(true);
  };

  const handleDelete = () => {
    // delete product
    console.log("Deleted");
  };

  const handleSave = () => {
    if (validate()) {
      // update product
      console.log("Submitted");
      navigation.setOptions({ title: "Product Details" });
      setEditable(false);
    }
  };

  return (
    <ScreenContainer>
      <Column space="4" height="full" paddingTop="4">
        <ScrollView flex="1">
          <Column
            space="2"
            borderColor="muted.200"
            borderWidth="1"
            paddingX="4"
            paddingY="4"
            borderRadius="lg"
          >
            {editable ? (
              <>
                <FormControl
                  label="Product"
                  isRequired
                  errorMessage={errors.name}
                  isInvalid={errors.name !== ""}
                >
                  <TextField
                    // defaultValue="Gatorade Blue"
                    value={formData.name}
                    onFocus={() => handleErrors("", "name")}
                    onChangeText={(value) => handleOnchange(value, "name")}
                  />
                </FormControl>
                <FormControl
                  label="Barcode"
                  errorMessage={errors.barcode}
                  isInvalid={errors.barcode !== ""}
                >
                  <BarcodeField
                    // defaultValue="123456789"
                    value={formData.barcode}
                    fieldType="input"
                    placeholder="Scan barcode"
                    onFocus={() => handleErrors("", "barcode")}
                    onChangeText={(value) => handleOnchange(value, "barcode")}
                  />
                </FormControl>
                <FormControl
                  label="Size Variant"
                  errorMessage={errors.variant}
                  isInvalid={errors.variant !== ""}
                >
                  <TextField
                    // defaultValue="500 ml"
                    value={formData.variant}
                    onFocus={() => handleErrors("", "variant")}
                    onChangeText={(value) => handleOnchange(value, "variant")}
                  />
                </FormControl>
                <FormControl
                  label="Sale Price"
                  isRequired
                  errorMessage={errors.salePrice}
                  isInvalid={errors.salePrice !== ""}
                >
                  <TextField
                    // defaultValue="70.00"
                    value={formData.salePrice}
                    keyboardType="numeric"
                    startDataLabel="Php"
                    onFocus={() => handleErrors("", "salePrice")}
                    onChangeText={(value) => handleOnchange(value, "salePrice")}
                  />
                </FormControl>
                <FormControl
                  label="Low Warning Point"
                  errorMessage={errors.threshold}
                  isInvalid={errors.threshold !== ""}
                >
                  <TextField
                    // defaultValue="10"
                    value={String(formData.threshold)}
                    keyboardType="numeric"
                    endDataLabel="pcs"
                    onFocus={() => handleErrors("", "threshold")}
                    onChangeText={(value) => handleOnchange(value, "threshold")}
                  />
                </FormControl>
                <FormControl label="Total Quantity" isDisabled isReadOnly>
                  <TextField value="100" endDataLabel="pcs" />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl label="Product">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={formData.name}
                  // value="Gatorade Blue"  
                  />
                </FormControl>
                <FormControl label="Barcode">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    // value="123456789"
                    value={formData.barcode}
                  />
                </FormControl>
                <FormControl label="Size Variant">
                  <TextField variant="underlined" isReadOnly
                    // value="500 ml"
                    value={formData.variant}
                  />
                </FormControl>
                <FormControl label="Sale Price">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={formData.salePrice}
                    // value="70.00"
                    startDataLabel="Php"
                  />
                </FormControl>
                <FormControl label="Low Warning Point">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={String(formData.threshold)}
                    // value="10"
                    endDataLabel="pcs"
                  />
                </FormControl>
                <FormControl label="Total Quantity">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value="100"
                    endDataLabel="pcs"
                  />
                </FormControl>
              </>
            )}
          </Column>
        </ScrollView>
        <Row
          width="full"
          space="2"
          backgroundColor="white"
          paddingBottom="4"
          marginBottom="-4"
        >
          <Button flex="1" variant="outline" onPress={handleDelete}>
            Delete
          </Button>
          {editable ? (
            <Button flex="1" onPress={handleSave}>
              Save
            </Button>
          ) : (
            <Button flex="1" onPress={handleEdit}>
              Edit
            </Button>
          )}
        </Row>
      </Column>
    </ScreenContainer>
  );
};

export default ProductDetails;

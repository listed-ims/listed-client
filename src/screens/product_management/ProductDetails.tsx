import React, { useEffect, useState } from "react";
import ScreenContainer from "../../layout/ScreenContainer";
import { Column, Row, ScrollView } from "native-base";
import FormControl from "../../components/FormControl";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import BarcodeField from "../../components/BarcodeField";
import { ProductDetailsNavigationProp, ProductDetailsRouteProp } from "../../types/navigation/navigationScreenProps";
import { getToken } from "../../services/tokenStorage";
import { updateProductService, validateBarcodeService, deleteProductService } from "../../services/productServices";

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
  const [formData, setFormData] = useState({
    name: route.params.name,
    barcode: route.params.barcode,
    variant: route.params.variant,
    salePrice: String(route.params.salePrice),
    threshold: route.params.threshold,
  });
  const [initialBarcode] = useState(route.params.barcode);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    navigation.setOptions({ title: "Poduct Details" });
  }, [])

  const validate = () => {
    if (formData.name === "") {
      handleErrors("Please enter product name.", "name");
      return false;
    } else if (errors.barcode !== "") {
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

  const handleBarcodeValidation = (barcode: string = "") => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        validateBarcodeService(token, barcode)
          .then((response) => {
            if (response.data) {
              handleErrors("", "barcode");
            } else {
              handleErrors("Barcode cannot be duplicated", "barcode");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };

    if (initialBarcode === barcode) {
      handleErrors("", "barcode");
    } else {
      fetchData();
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
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        deleteProductService(token, route.params.id)
          .then((response) => {
            console.log("Deleted");
            navigation.goBack();
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchData();
  };

  const handleSave = () => {
    if (validate()) {
      const fetchData = async () => {
        const token = await getToken();
        if (token) {
          updateProductService(token, route.params.id,
            {
              id: -1,
              name: formData.name,
              barcode: formData.barcode,
              variant: formData.variant,
              salePrice: Number(formData.salePrice),
              threshold: Number(formData.threshold),
              unit: route.params.unit,
            },
          )
            .then(() => {
              console.log("Submitted");
              navigation.setOptions({ title: "Product Details" });
              setEditable(false);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      };

      fetchData();
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
                    value={formData.name}
                    onEndEditing={() => handleErrors("", "name")}
                    onChangeText={(value) => handleOnchange(value, "name")}
                  />
                </FormControl>
                <FormControl
                  label="Barcode"
                  errorMessage={errors.barcode}
                  isInvalid={errors.barcode !== ""}
                >
                  <BarcodeField
                    value={formData.barcode}
                    fieldType="input"
                    placeholder="Scan barcode"
                    onEndEditing={() => handleBarcodeValidation(formData.barcode)}
                    onChangeText={(value) => handleOnchange(value, "barcode")}
                  />
                </FormControl>
                <FormControl
                  label="Size Variant"
                  errorMessage={errors.variant}
                  isInvalid={errors.variant !== ""}
                >
                  <TextField
                    value={formData.variant}
                    onEndEditing={() => handleErrors("", "variant")}
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
                    value={formData.salePrice}
                    keyboardType="numeric"
                    startDataLabel="Php"
                    onEndEditing={() => handleErrors("", "salePrice")}
                    onChangeText={(value) => handleOnchange(value, "salePrice")}
                  />
                </FormControl>
                <FormControl
                  label="Low Warning Point"
                  errorMessage={errors.threshold}
                  isInvalid={errors.threshold !== ""}
                >
                  <TextField
                    value={String(formData.threshold)}
                    keyboardType="numeric"
                    endDataLabel="pcs"
                    onEndEditing={() => handleErrors("", "threshold")}
                    onChangeText={(value) => handleOnchange(value, "threshold")}
                  />
                </FormControl>
                <FormControl label="Total Quantity" isDisabled isReadOnly>
                  <TextField value="0" endDataLabel="pcs" />
                </FormControl>
              </>
            ) : (
              <>
                <FormControl label="Product">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={formData.name}
                  />
                </FormControl>
                <FormControl label="Barcode">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={formData.barcode}
                  />
                </FormControl>
                <FormControl label="Size Variant">
                  <TextField variant="underlined" isReadOnly
                    value={formData.variant}
                  />
                </FormControl>
                <FormControl label="Sale Price">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={formData.salePrice}
                    startDataLabel="Php"
                  />
                </FormControl>
                <FormControl label="Low Warning Point">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value={String(formData.threshold)}
                    endDataLabel="pcs"
                  />
                </FormControl>
                <FormControl label="Total Quantity">
                  <TextField
                    variant="underlined"
                    isReadOnly
                    value="0"
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

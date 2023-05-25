import React, { useEffect, useState } from "react";
import ScreenContainer from "../../layout/ScreenContainer";
import { Box, Column, Text } from "native-base";
import { Product } from "../../types/Product";
import ProductList from "../../components/ProductList";
import BarcodeField from "../../components/BarcodeField";
import Button from "../../components/Button";
import { getToken } from "../../services/TokenStorage";
import { getProductsService } from "../../services/ProductServices";
import { ProductManagementNavigationProp } from "../../types/navigation/NavigationScreenProps";

interface ProductManagementProps {
  navigation: ProductManagementNavigationProp;
}

const ProductManagement = ({ navigation }: ProductManagementProps) => {
  const [products, setProducts] = useState(Array<Product>);

  const handleItemPress = (item: Product) => {
    navigation.navigate("ProductDetails", item);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        getProductsService(token)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchData();
  }, []);

  const handleOnChange = (keyword: string) => {
    const fetchData = async () => {
      const token = await getToken();
      if (token) {
        getProductsService(token, 1, 10, "", keyword)
          .then((response) => {
            setProducts(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    };

    fetchData();
  };

  return (
    <ScreenContainer>
      <Column space="4" height="full" paddingTop="4">
        <BarcodeField
          fieldType="search"
          placeholder="Search"
          onChangeText={(value) => handleOnChange(value)}
        />
        <Column flex={1} space={2}>
          <Text fontSize="sm" fontWeight="bold" color="muted.500">
            PRODUCTS
          </Text>
          <Box flex={1}>
            <ProductList
              onItemPress={(item) => {
                handleItemPress(item);
              }}
              data={products}
            />
          </Box>
        </Column>
        <Box width="full">
          <Button onPress={() => navigation.navigate("AddProduct")}>
            Add Product
          </Button>
        </Box>
      </Column>
    </ScreenContainer>
  );
};

export default ProductManagement;

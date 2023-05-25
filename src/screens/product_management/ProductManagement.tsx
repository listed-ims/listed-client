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

const Products: Product[] = [
  {
    id: 1,
    name: "Gatorade Blue",
    barcode: "123456789",
    variant: "500 ml",
    salePrice: 70.0,
    threshold: 10,
    unit: "pcs",
  },
  {
    id: 2,
    name: "Gatorade Red",
    barcode: "987654321",
    variant: "500 ml",
    salePrice: 70.0,
    threshold: 10,
    unit: "pcs",
  },
];

type ProductManagementProps = {
  navigation: ProductManagementNavigationProp;
}

const ProductManagement = ({ navigation }: ProductManagementProps) => {
  const handleItemPress = (item: Product) => {
    navigation.navigate("ProductDetails", item);
  };

  const [products, setProducts] = useState(Array<Product>);

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
          })
      }
    }

    fetchData();
  }, [])


  return (
    <ScreenContainer>
      <Column space="4" height="full" paddingTop="4">
        <BarcodeField fieldType="search" placeholder="Search" />
        <Column flex={1} space={2}>
          <Text fontSize="sm" fontWeight="bold" color="muted.500">
            PRODUCTS
          </Text>
          <Box flex={1}>
            <ProductList onItemPress={(item) => { handleItemPress(item) }} data={products} />
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

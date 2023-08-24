import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ProductsNavigationParams } from "./paramsList";
import { RouteProp } from "@react-navigation/native";

export type ProductManagementNavigationProp = NativeStackNavigationProp<
  ProductsNavigationParams,
  "Products"
>;

export type ProductDetailsNavigationProp = NativeStackNavigationProp<
  ProductsNavigationParams,
  "ProductDetails"
>;

export type ProductDetailsRouteProp = RouteProp<
  ProductsNavigationParams,
  "ProductDetails"
>;

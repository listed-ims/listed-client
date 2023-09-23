import { ProductFilter } from "@listed-constants";
import { axiosInstance } from "./axios";
import { ProductRequest, ProductResponse } from "@listed-types";

export const getProductsService = async (
  storeId: number,
  barcode?: string,
  keyword?: string,
  filter?: ProductFilter,
  sort?: string,
  pageNumber?: number,
  pageSize?: number,
) => {
  try {
    const response = await axiosInstance.get("products", {
      params: {
        storeId: storeId,
        barcode: barcode,
        keyword: keyword,
        filter: filter,
        sort: sort,
        pageNumber: pageNumber,
        pageSize,
      }
    });
    return response.data as ProductResponse[];
  } catch (error) {
    throw error;
  }
};

export const getProductService = async (productId: number) =>{
  try {
    const response = await axiosInstance.get(`products/${productId}`);
    return response.data as ProductResponse;
  } catch (error) {
    throw error;
  }
}

export const updateProductService = async (productRequest: ProductRequest) =>{
  try {
    const response = await axiosInstance.put(`products`,productRequest);
    return response.data as ProductResponse;
  } catch (error) {
    throw error;
  }
}
export const deleteProductService = async (productId: number) =>{
  try {
    const response = await axiosInstance.delete(`products/${productId}`);
    return response.data as ProductResponse;
  } catch (error) {
    throw error;
  }
}